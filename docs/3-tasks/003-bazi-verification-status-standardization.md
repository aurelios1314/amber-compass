# Task 003：统一八字验证状态口径

## 背景
Task 002 发现八字模块当前最高优先级问题是：验证状态口径不一致。

部分文档把单源或未闭环验证描述成“双源确认”或“已验证”，这会影响八字模块可信度。

## 当前阶段
Phase 2：八字模块可信度基础建设

## 任务目标
建立统一的八字验证状态标准。

明确：
- 什么叫 Externally Confirmed
- 什么叫 Single Source Matched
- 什么叫 Pending
- 什么叫 Rule Difference
- 什么叫 Conflict

## 修改范围
允许修改：
- docs/3-tasks/003-bazi-verification-status-standardization.md
- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md
- docs/0-long-term-rules/02_DECISIONS.md

允许新建：
- docs/1-current-status/bazi-verification-status-standard.md

允许读取：
- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

## 不要修改
- src/
- scripts/
- package.json
- 任何业务代码
- 任何 UI 代码

## 输出要求
新建一份验证状态标准文档，包含：

1. 验证状态定义
2. 每种状态的判定条件
3. 禁止使用的模糊表述
4. 文档更新规则
5. 后续验证任务如何引用该标准

## 验收标准
- 有清晰的验证状态标准
- 不再把单源匹配误写为已确认
- 后续八字验证任务可以直接引用该文档
- 不修改业务代码

## 执行要求
1. 先输出计划，不要直接修改
2. 等待确认后执行
3. 完成后更新 PROJECT_STATUS 和 TASK_QUEUE
4. 如产生结构性决策，更新 DECISIONS