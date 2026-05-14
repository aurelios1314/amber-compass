# Task 001：建立 Amber Compass AI 辅助开发工作流

## 背景
Amber Compass 已经进入长期迭代阶段，仅依赖聊天记录推进开发，容易导致上下文丢失、阶段混乱、任务边界不清和 Codex 执行不稳定。

## 当前阶段
AI 开发工作流搭建阶段

## 任务目标
完成 Amber Compass 的 AI 开发中枢文件搭建，让后续任务可以基于标准文件、标准流程和 Task Card 交给 Codex 执行。

## 修改范围
允许修改：
- docs/0-long-term-rules/00_PROJECT_BRIEF.md
- docs/0-long-term-rules/01_AI_WORKFLOW_RULES.md
- docs/0-long-term-rules/02_DECISIONS.md
- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md
- docs/2-current-tasks/01_DAILY_STARTUP.md
- docs/2-current-tasks/02_DAILY_SHUTDOWN.md
- docs/3-tasks/000-TASK_TEMPLATE.md
- docs/3-tasks/001-ai-workflow-setup.md

## 不要修改
- src/
- scripts/
- package.json
- 任何业务代码
- 任何 UI 代码

## 产品 / 设计要求
- 保持文档结构清晰
- 不增加复杂管理体系
- 以实际辅助 Codex 稳定执行为目标
- 避免形式主义

## 验收标准
- 核心管理文件已创建
- 每个文件职责清晰
- 后续可以通过 Task Card 启动 Codex 任务
- 不影响现有业务代码

## 执行要求
1. 先读取项目管理文件
2. 判断当前阶段
3. 输出计划
4. 不直接修改业务代码
5. 完成后更新 PROJECT_STATUS.md 和 TASK_QUEUE.md
