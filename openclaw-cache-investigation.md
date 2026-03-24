# OpenClaw 缓存机制调查结果

**调查时间**: 2026-03-20

## 缓存位置

主要目录: `C:\Users\cy199\.openclaw\`

| 目录 | 用途 | 更新频率 |
|------|------|----------|
| `memory/` | 长期记忆数据库 (SQLite) | 按需更新 |
| `agents/<name>/sessions/` | 会话历史 (JSONL 文件) | 每次对话 |
| `agents/<name>/agent/` | Agent 配置 | 配置变更时 |

## 关键缓存文件

### 记忆数据库
- `memory/main.sqlite` (69KB)
- `memory/news.sqlite` (69KB)

### 会话历史
- `agents/main/sessions/*.jsonl` - main agent 的会话
- `agents/news/sessions/*.jsonl` - news agent 的会话
- 文件命名格式: `<uuid>.jsonl`

## 清理机制

- `.reset.<timestamp>.jsonl` - 会话重置后的备份
- `.deleted.<timestamp>.jsonl` - 标记删除的会话
- **按需清理**，非定时清理
- 重启 Gateway 可能触发清理

## Agent 切换问题

### 现象
在 news agent 配置下运行，但 Runtime 显示 `agent=main`

### 原因
1. 会话在配置变更前创建
2. 会话绑定到创建时的 agent，不会动态切换
3. 重启后新会话才使用新配置

### 结论
这是**会话持久性设计**，不是缓存文件问题 — 每个会话记住它属于哪个 agent。
