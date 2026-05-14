# Task 006：核查八字 gender 参数映射

## 背景

Task 005 已确认：

- CASE_006 当前实际 daYunDirection 为 Forward
- 人工清单与描述期望为 Backward
- CASE_006 仍保持 Conflict

当前最小疑点是：

项目内部 `gender: 0/1` 的含义，是否与 `lunar-javascript` 的 `bazi.getYun(gender)` 参数语义一致。

如果 gender 参数映射错误，可能导致大运顺逆方向错误。

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

核查 gender 参数映射是否正确。

明确：

1. 项目内部 `gender: 0` 和 `gender: 1` 分别代表什么
2. UI 表单传入的 gender 值是什么
3. `lunar-javascript` 的 `getYun(gender)` 期望参数语义是什么
4. 当前传参是否存在反向映射问题
5. CASE_006 的 Forward 是否由 gender 映射导致

---

## 允许读取

允许读取：

- src/core/bazi/BaziTypes.ts
- src/core/bazi/BaziAdapter.ts
- src/core/bazi/baziValidationCases.ts
- src/ui/components/modules/bazi/BaziInputForm.tsx
- package.json

如需要确认第三方库类型或源码：

必须先说明原因并等待确认。

---

## 允许运行

允许运行：

- npm.cmd run verify:bazi

如需运行其他命令：

必须先说明原因并等待确认。

---

## 允许修改

暂时不允许修改业务代码。

仅允许在最终确认后更新：

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

如形成结构性判断，可更新：

- docs/0-long-term-rules/02_DECISIONS.md

---

## 不要修改

禁止修改：

- src/
- scripts/
- package.json
- 任何 UI 代码
- 任何业务代码

本任务第一轮只做读取、运行、分析。

---

## 输出要求

输出：

# Gender Param Mapping Analysis

包含：

## 项目内部 gender 定义

## UI 表单 gender 传值

## BaziAdapter 传参方式

## lunar-javascript getYun(gender) 期望语义

## CASE_006 受影响判断

## 是否存在映射问题

## 建议下一步

建议下一步只能是：

- 保持 Conflict，继续外部核对
- 新建修复 Task
- 新建第三方库参数确认 Task

---

## 验收标准

任务完成后：

- gender 参数链路清楚
- 不靠猜测判断
- 不直接修改代码
- 明确是否需要后续修复任务

---

## 执行要求

1. 先输出分析计划
2. 不直接修改代码
3. 只在允许范围内读取和运行
4. 如果需要读取第三方库源码，必须先说明原因
5. 等待确认后再继续