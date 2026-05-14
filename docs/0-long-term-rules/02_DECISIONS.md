# Amber Compass Decisions

---

## 2026-05-11

### 决定
八字验证状态以 `docs/1-current-status/bazi-verification-status-standard.md` 为准。

### 原因
八字验证材料曾出现单源匹配、待核对和外部确认混用的问题，会削弱排盘可信度。

### 影响
后续八字验证文档和 Task Card 只能使用该标准定义的状态：
- Externally Confirmed
- Single Source Matched
- Pending
- Rule Difference
- Conflict

不得使用“基本验证”“大致一致”“基本正确”等模糊表述。

---

## 2026-05-11

### 决定
AI 工作流文档以 docs 下的新分层目录结构为准，不再创建或维护旧平铺路径。

### 原因
旧平铺路径与新目录结构同时存在会导致 Codex 读取上下文时发生分裂，增加误改和漏改风险。

### 影响
后续 AI 开发入口、每日流程、任务队列和 Task Card 都应引用：
- docs/0-long-term-rules/
- docs/1-current-status/
- docs/2-current-tasks/
- docs/3-tasks/

默认不读取 docs/4-old-docs/，除非当前任务明确需要。

---

## 2026-05-11

### 决定
建立 5 个核心 AI 开发管理文件。

### 原因
项目已经进入长期迭代阶段，仅依赖聊天记录容易丢失上下文、阶段和决策。

### 影响
后续开发将基于：
- PROJECT_BRIEF
- PROJECT_STATUS
- TASK_QUEUE
- AI_WORKFLOW_RULES
- DECISIONS

进行管理。

---

## 2026-05-11

### 决定
项目继续采用固定工作区布局基线。

### 原因
当前布局已经形成统一结构：
- 顶部栏
- 左主区域
- 右侧栏
- 最右导航

继续频繁推翻会导致 UI 不稳定与开发成本上升。

### 影响
后续 UI 优化必须基于现有基线进行微调，而不是重新推翻结构。

---

## 2026-05-11

### 决定
Amber Compass 的整体风格采用现代、极简、专业、克制方向。

### 原因
传统命理网站普遍存在信息杂乱、玄学感过重的问题。
Amber Compass 需要建立更现代、更可信、更长期可持续的产品气质。

### 影响
后续 UI、文案、交互都必须保持：
- 克制
- 清晰
- 专业
- 不夸张
