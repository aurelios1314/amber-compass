# Task 004：按验证状态标准清理旧八字验证文档

## 背景

Task 003 已建立统一的八字验证状态标准：

- Externally Confirmed
- Single Source Matched
- Pending
- Rule Difference
- Conflict

但当前旧验证文档仍存在：

- 模糊表述
- 状态口径不一致
- 单源误写成已确认
- 历史残留状态
- 部分冲突未明确标记

需要统一清理。

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

统一旧八字验证文档中的验证状态。

确保：

1. 所有状态都符合：
   docs/1-current-status/bazi-verification-status-standard.md

2. 不再出现模糊验证表述

3. 所有冲突和规则差异明确标记

---

## 允许读取

允许读取：

- docs/1-current-status/bazi-verification-status-standard.md

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md
- docs/4-old-docs/bazi-priority-comparison-export.md
- docs/4-old-docs/bazi-external-source-research.md

---

## 允许修改

允许修改：

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-external-verification-sheet.md

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md
- docs/0-long-term-rules/02_DECISIONS.md

---

## 不要修改

禁止：

- src/
- scripts/
- package.json
- 任何业务代码
- 任何 UI 代码

---

## 清理重点

重点检查：

### 一、模糊表述

例如：

- 已验证
- 基本正确
- 大致一致
- 双源确认（但实际未完成）

必须替换为标准状态。

---

### 二、单源误标

如果只有一个外部来源：

必须改为：

- Single Source Matched

不能写：

- Externally Confirmed

---

### 三、规则差异

对于：

- 子时规则
- 真太阳时
- 起运年龄
- 经度修正

导致的差异：

必须标记：

- Rule Difference

不能直接视为程序错误。

---

### 四、真实冲突

如果：

输入条件已对齐，
但输出仍冲突：

必须标记：

- Conflict

并记录冲突字段。

---

## 输出要求

输出：

# Verification Cleanup Summary

包含：

## 修改了哪些文档

## 修正了哪些状态

## 新发现的 Conflict

## 新发现的 Rule Difference

## 仍未解决的问题

---

## 验收标准

任务完成后：

- 旧验证文档状态统一
- 模糊表述消失
- 所有状态符合标准文档
- 后续验证任务可稳定继续
- 不修改业务代码

---

## 执行要求

1. 先输出计划
2. 不要直接执行
3. 等待确认后再修改
4. 完成后更新：
   - PROJECT_STATUS
   - TASK_QUEUE

5. 如形成结构性判断：
   - 更新 DECISIONS