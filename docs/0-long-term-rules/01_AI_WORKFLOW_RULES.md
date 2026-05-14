# Amber Compass AI Workflow Rules

## 基本原则
- 每次开发前，必须先读取 docs/0-long-term-rules/00_PROJECT_BRIEF.md、docs/0-long-term-rules/01_AI_WORKFLOW_RULES.md、docs/1-current-status/01_PROJECT_STATUS.md、docs/1-current-status/02_TASK_QUEUE.md。
- 不允许直接大规模重构。
- 不允许擅自新增功能。
- 不允许破坏现有固定布局基线。
- 优先保持结构清晰、界面克制、逻辑可信。

## 执行流程
每次任务必须按以下顺序执行：

1. 判断当前项目阶段
2. 明确本次任务目标
3. 明确涉及文件
4. 输出修改计划
5. 等待确认后再执行
6. 执行后说明修改内容
7. 更新 docs/1-current-status/01_PROJECT_STATUS.md
8. 如产生重要决策，更新 docs/0-long-term-rules/02_DECISIONS.md

## Codex 执行要求
- 每次只处理一个 Task Card
- 不要同时修改多个无关模块
- 如果发现需求不清晰，先提问或输出风险，不要擅自决定
- 如果涉及 UI，必须保持 AMBER COMPASS 的现代、极简、专业、克制风格
- 如果涉及八字计算，必须优先保证准确性与可验证性
- 如果涉及主界面，不要把技术解释堆在主界面，应优先放入设置或信息区

## 验收要求
每次完成后必须说明：

1. 完成了什么
2. 修改了哪些文件
3. 有没有破坏布局基线
4. 有没有新增风险
5. 下一步建议是什么
