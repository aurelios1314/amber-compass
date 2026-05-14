# Task 009：重新判定 CASE_006 验证状态

## 背景

Task 008 已确认：

CASE_006 的 Forward 输出，
来自验证脚本错误。

业务逻辑、gender 映射、顺逆规则均未发现错误。

验证脚本已修复：

- verify-bazi-validation.mjs
现在直接使用：

chart.daYunDirection

修复后：

CASE_006 当前输出为：

Backward

因此：

CASE_006 原先的 Conflict，
需要重新判定。

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

重新判断：

CASE_006 当前是否还应保持：

- Conflict

或应调整为：

- Pending
- Single Source Matched
- Externally Confirmed

---

## 允许读取

允许读取：

- docs/1-current-status/bazi-verification-status-standard.md

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

- docs/3-tasks/007-case-006-dayun-rule-expectation-check.md
- docs/3-tasks/008-fix-dayun-direction-verification-script.md

- scripts/verify-bazi-validation.mjs

---

## 允许运行

允许：

- npm.cmd run verify:bazi

用于确认 CASE_006 当前输出。

---

## 允许修改

允许修改：

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

如形成结构性判断：

- docs/0-long-term-rules/02_DECISIONS.md

---

## 不要修改

禁止修改：

- src/
- package.json
- UI 代码
- 业务逻辑代码

---

## 分析重点

重点确认：

### 一、CASE_006 当前输出

确认：

Da Yun Direction 当前是否稳定为：

Backward

---

### 二、旧 Conflict 是否已经解除

确认：

Forward 是否已经被证明：

- 来自验证脚本错误
- 而非业务逻辑错误

---

### 三、当前外部验证状态

确认：

CASE_006：

- 是否已有双源确认
- 是否仍有 Source B Pending
- 是否仍有未核对字段

---

## 输出要求

输出：

# CASE_006 Status Reclassification

包含：

## 当前输出状态

## 原 Conflict 是否解除

## 当前外部验证状态

## 建议的新状态

只能是：

- Pending
- Single Source Matched
- Externally Confirmed

不得继续使用：

- Conflict

除非发现新的真实冲突。

---

## 验收标准

任务完成后：

- CASE_006 状态重新归类
- 不再保留错误 Conflict
- 验证状态符合标准文档
- 不修改业务逻辑

---

## 执行要求

1. 先输出分析计划
2. 不直接修改文档
3. 等待确认后继续