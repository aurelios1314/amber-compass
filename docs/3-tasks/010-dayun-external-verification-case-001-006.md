# Task 010：补齐 CASE_001 / CASE_006 大运外部核对

## 背景

Phase 2 当前最高优先级问题：

CASE_001 与 CASE_006 的大运相关外部验证仍未闭环。

目前：

- CASE_006 已从 Conflict 调整为 Pending
- 大运方向脚本错误已修复
- 当前输出已稳定

但以下字段仍缺少完整外部核对：

- Da Yun Direction
- Da Yun Start
- First 8 Da Yun Cycles

因此仍不能升级为：

- Single Source Matched
- Externally Confirmed

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

补齐：

CASE_001
CASE_006

的大运外部核对记录。

重点记录：

1. Da Yun Direction
2. Da Yun Start
3. First 8 Da Yun Cycles
4. Source A
5. Source B

并按验证状态标准重新判断状态。

---

## 允许读取

允许读取：

- docs/1-current-status/bazi-verification-status-standard.md

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

- src/core/bazi/baziValidationCases.ts

- scripts/verify-bazi-validation.mjs

---

## 允许运行

允许：

- npm.cmd run verify:bazi

用于输出当前 CASE_001 / CASE_006 大运数据。

---

## 允许修改

允许修改：

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

如形成结构性规则：

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

### 一、CASE_001 当前输出

记录：

- Da Yun Direction
- Da Yun Start
- First 8 Da Yun Cycles

---

### 二、CASE_006 当前输出

记录：

- Da Yun Direction
- Da Yun Start
- First 8 Da Yun Cycles

---

### 三、外部来源核对

记录：

- Source A
- Source B

明确：

- 哪些字段已核对
- 哪些字段仍 Pending

---

### 四、状态重新归类

根据标准：

- Pending
- Single Source Matched
- Externally Confirmed

重新判断。

---

## 输出要求

输出：

# Dayun External Verification Summary

包含：

## CASE_001

### 当前输出

### Source A

### Source B

### 建议状态

---

## CASE_006

### 当前输出

### Source A

### Source B

### 建议状态

---

## 验收标准

任务完成后：

- CASE_001 / CASE_006 大运外部核对记录补齐
- 验证状态重新明确
- 不再依赖旧冲突记录
- 不修改业务逻辑

---

## 执行要求

1. 先输出分析计划
2. 不直接修改文档
3. 等待确认后继续