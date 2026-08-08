# Emma's English 英语打卡 Web App

## 项目结构

```
emma-english-app/
├── index.html          # 主页面
├── styles/
│   └── main.css        # 样式（猫咪兔子卡通主题）
├── js/
│   ├── data.js         # PET (B1) 词汇数据 + 8篇短文 + 48道题
│   ├── app.js          # 核心逻辑（4步打卡流程）
│   └── sync.js         # Supabase 云端同步
├── assets/
│   └── bg.png          # 背景图
└── README.md
```

## 功能说明

### 4步打卡流程
1. **热身激励** — 首页展示能量值、连续打卡、勋章墙
2. **核心朗读** — 短文阅读 + 🎤 语音朗读评测（Web Speech API）
3. **词汇闯关** — 每篇6道选择题（PET B1级别），可重试
4. **错题巩固** — 错词本 + 3个例句 + 💡 错题提示引导回原文

### 特色功能
- 🐱🐰 小猫Mimi + 兔子BunBun卡通主题
- 🔑 家庭码同步（默认1115）
- ☁️ Supabase 云端跨设备同步
- 🔥 连续打卡天数 + 🏅 勋章系统
- ⚡ 能量值积分
- 📝 错词本追踪（每个错词3个造句）
- 🔄 重新挑战（重做原题）+ 今日重置（换新题）

## 本地运行

用任意静态HTTP服务器即可运行：

```bash
# Python
python -m http.server 8080

# 或 Node.js
npx serve .
```

然后访问 http://localhost:8080

## 云端同步配置

默认已配置 Supabase：
- Project URL: `https://gftjoexdcawirpqxupkjl.supabase.co`
- Publishable Key: 在 sync.js 中

如需换成你自己的，修改 `js/sync.js` 中的 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`。

需要在 Supabase Dashboard 执行建表 SQL：

```sql
CREATE TABLE ket_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  family_code TEXT NOT NULL UNIQUE,
  streak_days INTEGER DEFAULT 0,
  energy_points INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  badges JSONB DEFAULT '[]'::jsonb,
  wrong_words JSONB DEFAULT '[]'::jsonb,
  today_progress JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE ket_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_select" ON ket_progress FOR SELECT USING (true);
CREATE POLICY "public_insert" ON ket_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "public_update" ON ket_progress FOR UPDATE USING (true) WITH CHECK (true);
```

## 浏览器兼容性

| 功能 | Chrome | Safari (iOS/iPadOS) | 华为自带浏览器 |
|------|--------|---------------------|---------------|
| 文本朗读 | ✅ | ✅ | ❌ |
| 语音识别评测 | ✅ | ✅ (iOS 14.5+) | ❌ |
| 答题功能 | ✅ | ✅ | ✅ |
