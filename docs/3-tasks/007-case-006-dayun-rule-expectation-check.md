# Task 007：核查 CASE_006 大运顺逆规则预期

## 背景

Task 005 和 Task 006 已确认：

- CASE_006 当前程序实际输出：
  Forward

- gender 参数映射正确：
  1 = Male
  0 = Female

- lunar-javascript 的 gender 参数语义与项目一致

因此：

CASE_006 当前冲突，
已经不再是 gender 映射问题。

当前核心问题变为：

CASE_006 文档中的：

“阳年女性逆行”

这个规则预期本身是否写错。

---

## 当前阶段

Phase 2：八字模块可信度基础建设

---

## 任务目标

核查：

当前项目中：

“阳年女性逆行”

这一规则预期是否正确。

明确：

1. 当前项目采用的大运顺逆规则是什么
2. lunar-javascript 实际采用什么规则
3. CASE_006：
   庚午年女性
   为什么输出 Forward
4. 当前文档里的：
   “阳年女性逆行”
   是否属于错误预期

---

## 允许读取

允许读取：

- src/core/bazi/BaziAdapter.ts
- src/core/bazi/baziValidationCases.ts

- node_modules/lunar-javascript 中：
  - getYun
  - Yun
  - forward
  - 顺逆规则相关最小源码

- docs/4-old-docs/bazi-validation.md
- docs/4-old-docs/bazi-manual-verification-checklist.md

---

## 允许运行

允许：

- npm.cmd run verify:bazi

如需其他命令：

必须先说明原因。

---

## 不要修改

禁止修改：

- src/
- scripts/
- package.json
- UI 代码
- 业务代码

本任务只做：

- 阅读
- 运行
- 分析
- 规则确认

---

## 分析重点

重点确认：

### 一、庚午年的阴阳属性

确认：

庚午年：

- 属阳年？
- 属阴年？

---

### 二、大运顺逆规则

确认当前规则：

是否是：

- 阳男阴女顺
- 阴男阳女逆

还是其它规则。

---

### 三、CASE_006 当前输出合理性

解释：

为什么当前输出是：

Forward

---

### 四、当前文档预期是否错误

重点确认：

“阳年女性逆行”

这句话：

- 是否写错
- 是否来自旧错误
- 是否来自流派混淆
- 是否来自人工误记

---

## 输出要求

输出：

# CASE_006 Rule Expectation Analysis

包含：

## 庚午年阴阳属性

## 当前顺逆规则

## CASE_006 为什么输出 Forward

## 文档预期是否正确

## 是否需要修正文档

## 是否需要修改代码

---

## 验收标准

任务完成后：

- CASE_006 的规则来源清晰
- 不再依赖猜测
- 明确冲突来自：
  - 文档错误
  - 规则错误
  - 程序错误
  - 或流派差异

---

## 执行要求

1. 先输出分析计划
2. 不直接修改代码
3. 不直接修改文档
4. 等待确认后继续