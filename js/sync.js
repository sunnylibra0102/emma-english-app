/**
 * Supabase Sync Module
 * Handles cloud data synchronization for cross-device support
 */

// ===== Configuration =====
const SUPABASE_CONFIG = {
  url: 'https://gftjoexdcawirpqxupkjl.supabase.co',
  anonKey: 'sb_publishable_c9Zg-RsfvzVZjiBOY-Jzvg_8-5cN4ja',
  tableName: 'ket_progress',
  familyCode: '1115' // Fixed family code
};

// ===== Family Code =====
const FAMILY_CODE = '1115';
const FAMILY_CODE_STORAGE_KEY = 'emma_family_code_verified';

// ===== Sync State =====
let isSyncEnabled = false;
let lastSyncTime = 0;
let supabaseClient = null;
const SYNC_DEBOUNCE_MS = 1000;

// ===== Family Code Verification =====
function verifyFamilyCode(code) {
  return code === FAMILY_CODE;
}

function markFamilyCodeVerified() {
  localStorage.setItem(FAMILY_CODE_STORAGE_KEY, 'true');
}

function isFamilyCodeVerified() {
  return localStorage.getItem(FAMILY_CODE_STORAGE_KEY) === 'true';
}

function clearFamilyCodeVerification() {
  localStorage.removeItem(FAMILY_CODE_STORAGE_KEY);
}

// ===== Supabase Client Initialization =====
function initSupabaseClient() {
  if (typeof supabase === 'undefined') {
    console.warn('[Sync] Supabase SDK not loaded');
    return null;
  }
  
  if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
    console.warn('[Sync] Supabase not configured');
    return null;
  }

  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('[Sync] Supabase client initialized');
    return supabaseClient;
  } catch (error) {
    console.error('[Sync] Failed to initialize Supabase client:', error);
    return null;
  }
}

// ===== Cloud Data Operations =====
async function loadFromCloud() {
  if (!supabaseClient) {
    initSupabaseClient();
  }
  
  if (!supabaseClient) {
    console.warn('[Sync] Cannot load from cloud: Supabase not available');
    return null;
  }

  try {
    const { data, error } = await supabaseClient
      .from(SUPABASE_CONFIG.tableName)
      .select('*')
      .eq('family_code', SUPABASE_CONFIG.familyCode)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No data found for this family code
        console.log('[Sync] No cloud data found for family code');
        return null;
      }
      throw error;
    }

    console.log('[Sync] Loaded data from cloud');
    return data;
  } catch (error) {
    console.error('[Sync] Failed to load from cloud:', error);
    return null;
  }
}

async function saveToCloud(localData) {
  if (!supabaseClient) {
    initSupabaseClient();
  }
  
  if (!supabaseClient) {
    console.warn('[Sync] Cannot save to cloud: Supabase not available');
    return false;
  }

  try {
    const record = {
      family_code: SUPABASE_CONFIG.familyCode,
      streak_days: localData.streak_days || 0,
      energy_points: localData.energy_points || 0,
      total_sessions: localData.total_days || 0,
      badges: localData.badges || [],
      wrong_words: localData.wrong_words || [],
      today_progress: {
        last_checkin: localData.last_checkin,
        current_passage_id: localData.current_passage_id,
        completed_passage_ids: localData.completed_passage_ids || [],
        perfect_count: localData.perfect_count || 0
      },
      updated_at: new Date().toISOString()
    };

    // Try to update existing record
    const { data, error } = await supabaseClient
      .from(SUPABASE_CONFIG.tableName)
      .upsert(record, { 
        onConflict: 'family_code',
        returning: 'minimal' 
      });

    if (error) throw error;

    console.log('[Sync] Saved data to cloud');
    return true;
  } catch (error) {
    console.error('[Sync] Failed to save to cloud:', error);
    return false;
  }
}

// ===== Data Merging =====
function mergeData(localData, cloudData) {
  if (!cloudData) return localData;

  const merged = { ...localData };

  // streak_days: take the longer one
  merged.streak_days = Math.max(localData.streak_days || 0, cloudData.streak_days || 0);

  // energy_points: take the higher one
  merged.energy_points = Math.max(localData.energy_points || 0, cloudData.energy_points || 0);

  // total_days: take the more one
  merged.total_days = Math.max(localData.total_days || 0, cloudData.total_sessions || 0);

  // badges: merge (union)
  const localBadges = localData.badges || [];
  const cloudBadges = cloudData.badges || [];
  merged.badges = [...new Set([...localBadges, ...cloudBadges])];

  // wrong_words: merge (take max count for each word)
  const localWords = localData.wrong_words || [];
  const cloudWords = cloudData.wrong_words || [];
  const wordMap = new Map();
  
  [...localWords, ...cloudWords].forEach(word => {
    const existing = wordMap.get(word.word);
    if (!existing || word.count > existing.count) {
      wordMap.set(word.word, word);
    }
  });
  merged.wrong_words = Array.from(wordMap.values());

  // last_checkin: take the more recent one
  const localDate = localData.last_checkin ? new Date(localData.last_checkin) : null;
  const cloudDate = cloudData.today_progress?.last_checkin ? new Date(cloudData.today_progress.last_checkin) : null;
  if (cloudDate && (!localDate || cloudDate > localDate)) {
    merged.last_checkin = cloudData.today_progress.last_checkin;
  }

  // completed_passage_ids: merge (union)
  const localCompleted = localData.completed_passage_ids || [];
  const cloudCompleted = cloudData.today_progress?.completed_passage_ids || [];
  merged.completed_passage_ids = [...new Set([...localCompleted, ...cloudCompleted])];

  // perfect_count: take the more one
  merged.perfect_count = Math.max(localData.perfect_count || 0, cloudData.today_progress?.perfect_count || 0);

  return merged;
}

// ===== Sync Trigger =====
let syncTimeout = null;

function triggerSync() {
  if (!isSyncEnabled) return;
  
  const now = Date.now();
  if (now - lastSyncTime < SYNC_DEBOUNCE_MS) {
    // Debounce: clear existing timeout and set new one
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      doSync();
    }, SYNC_DEBOUNCE_MS);
    return;
  }
  
  doSync();
}

async function doSync() {
  if (!isSyncEnabled) return;
  
  lastSyncTime = Date.now();
  const localData = getState();
  await saveToCloud(localData);
}

// ===== Initialize Sync =====
async function initSync() {
  if (!isFamilyCodeVerified()) {
    console.log('[Sync] Family code not verified, skipping sync');
    return;
  }

  // Initialize Supabase client
  initSupabaseClient();
  
  if (!supabaseClient) {
    console.warn('[Sync] Supabase not available, running in local-only mode');
    return;
  }

  isSyncEnabled = true;
  console.log('[Sync] Sync enabled');

  // Load from cloud and merge with local data
  const cloudData = await loadFromCloud();
  if (cloudData) {
    const localData = getState();
    const mergedData = mergeData(localData, cloudData);
    
    // Update local state with merged data
    Object.assign(localData, mergedData);
    saveState();
    console.log('[Sync] Data merged from cloud');
  }
}

// ===== Expose to global scope =====
window.verifyFamilyCode = verifyFamilyCode;
window.markFamilyCodeVerified = markFamilyCodeVerified;
window.isFamilyCodeVerified = isFamilyCodeVerified;
window.initSync = initSync;
window.triggerSync = triggerSync;
window.loadFromCloud = loadFromCloud;
window.saveToCloud = saveToCloud;
