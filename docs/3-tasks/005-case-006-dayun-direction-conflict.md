# Task 005：核查 CASE_006 大运方向冲突

## 背景

Task 004 清理旧八字验证文档后，当前最明确的未解决 Conflict 是：

CASE_006 的 Da Yun Direction（大运方向）冲突。

当前记录：

- 人工清单：
  Backward

- 旧导出：
  Forward

该冲突已经被正式标记为：

Conflict

但尚未确认：

- 哪个来源正确
- 是否属于规则差异
- 是否属于旧导出错误
- 是否属于记录错误

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

核查 CASE_006 的大运方向冲突来源。

明确：

1. 当前 Amber Compass 实际输出是什么
2. 人工清单为什么记录为 Backward
3. 旧导出为什么记录为 Forward
4. 是否属于：
   - Rule Difference
   - 导出错误
   - 文档错误
   - 程序错误

---

## 允许读取

允许读取：

- docs/1-current-status/bazi-verification-status-standard.md

- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-priority-comparison-export.md
- docs/4-old-docs/bazi-validation.md

- CASE_006 相关说明

如确实需要：

允许读取 CASE_006 对应代码逻辑，
但必须先说明原因。

---

## 允许修改

允许修改：

- docs/4-old-docs/bazi-manual-verification-checklist.md
- docs/4-old-docs/bazi-validation.md

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

如形成结构性判断：

- docs/0-long-term-rules/02_DECISIONS.md

---

## 不要修改

禁止：

- src/
- scripts/
- package.json
- 任何 UI 代码

除非明确确认属于程序错误，
否则不要修改业务逻辑。

---

## 分析重点

重点检查：

### 一、CASE_006 输入条件

包括：

- 性别
- 出生时间
- 节气
- 阴阳
- 顺逆规则

---

### 二、大运方向规则

确认：

当前 Amber Compass 使用的规则是什么。

例如：

- 阳男阴女顺
- 阴男阳女逆

以及是否存在：

- 流派差异
- 配置差异

---

### 三、旧导出可信度

确认：

旧导出中的 Forward：

- 是否可能是历史残留
- 是否可能是旧算法
- 是否可能是乱码污染
- 是否可能是人工记录错误

---

## 输出要求

输出：

# CASE_006 Conflict Analysis

包含：

## 当前 Amber Compass 输出

## 人工清单记录

## 旧导出记录

## 是否属于 Rule Difference

## 是否属于程序错误

## 最终建议状态

只能是：

- Conflict
- Rule Difference
- Externally Confirmed
- Pending

不能使用模糊状态。

---

## 验收标准

任务完成后：

- CASE_006 冲突来源明确
- 不再依赖猜测
- 有明确下一步处理方向
- 不修改业务代码（除非确认程序错误）

---

## 执行要求

1. 先输出计划
2. 不要直接执行
3. 等待确认后再修改
4. 如果需要读取代码：
   必须先说明理由
5. 完成后更新：
   - PROJECT_STATUS
   - TASK_QUEUE