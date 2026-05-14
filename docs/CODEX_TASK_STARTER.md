# Amber Compass Codex Task Starter

## 作用

本文件是 Amber Compass 的 AI 开发入口文件。

作用：

1. 告诉 Codex 当前项目的 docs 结构
2. 告诉 Codex 应该读取哪些上下文
3. 规范 Codex 的执行流程
4. 防止项目上下文混乱
5. 建立长期稳定的 AI 开发工作流

---

# Docs 结构说明

## docs/0-long-term-rules/

长期规则层。

这些文件相对稳定，不会频繁修改。

### 00_PROJECT_BRIEF.md
项目总纲。

包含：
- 产品定位
- 核心目标
- 用户
- 核心体验
- 设计风格
- 当前优先级
- 不做什么

作用：
防止项目方向漂移。

---

### 01_AI_WORKFLOW_RULES.md
AI 工作规则。

包含：
- Codex 执行规则
- 修改规则
- 验收规则
- 风险控制

作用：
约束 AI 行为，防止失控修改。

---

### 02_DECISIONS.md
关键决策记录。

记录：
- 产品决策
- UI 决策
- 架构决策
- 为什么这样做

作用：
防止后续遗忘和反复推翻。

---

# docs/1-current-status/

当前状态层。

动态更新。

---

### 01_PROJECT_STATUS.md
当前项目状态。

包含：
- 当前阶段
- 当前目标
- 已完成
- 正在做
- 下一步
- 当前风险

作用：
帮助 AI 和开发者快速恢复上下文。

---

### 02_TASK_QUEUE.md
任务队列。

包含：
- 当前任务
- 待评估任务
- 已完成任务

作用：
避免同时推进多个方向。

---

# docs/2-current-tasks/

当前流程层。

用于每日开发节奏。

---

### 01_DAILY_STARTUP.md
每日开发启动流程。

作用：
帮助恢复开发节奏。

---

### 02_DAILY_SHUTDOWN.md
每日开发结束流程。

作用：
帮助记录当前状态，避免第二天断片。

---

# docs/3-tasks/

任务层。

---

### 000-TASK_TEMPLATE.md
Task Card 模板。

所有任务必须基于该模板创建。

---

### xxx-task-name.md
具体任务文件。

每次只允许执行一个 Task Card。

---

# docs/4-old-docs/

旧文档归档层。

默认不要读取。

除非当前任务明确要求。

---

# Codex 执行流程

请先读取：

- docs/0-long-term-rules/00_PROJECT_BRIEF.md
- docs/0-long-term-rules/01_AI_WORKFLOW_RULES.md
- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md
- 当前 Task Card

然后：

1. 判断当前项目阶段
2. 总结当前任务目标
3. 明确涉及文件
4. 输出 step-by-step 修改计划
5. 说明风险
6. 不要直接执行
7. 等待确认后再修改

---

# 执行限制

- 不允许擅自新增功能
- 不允许大规模重构
- 不允许破坏现有布局基线
- 不允许同时修改多个无关模块
- 不允许默认读取 docs/4-old-docs/

---

# 执行完成后

必须：

- 更新 docs/1-current-status/01_PROJECT_STATUS.md
- 更新 docs/1-current-status/02_TASK_QUEUE.md

如果产生重要决策：

- 更新 docs/0-long-term-rules/02_DECISIONS.md

---

# 当前工作流目标

Amber Compass 当前目标：

建立稳定、长期、可持续的 AI 辅助开发工作流。

重点：

- 稳定
- 可控
- 可恢复
- 可追踪
- 不依赖聊天记忆