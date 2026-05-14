# Task 008：修复大运方向验证脚本输出错误

## 背景
Task 007 已确认：

CASE_006 的业务规则、gender 映射、第三方库顺逆规则都没有发现错误。

真正问题在于：

`scripts/verify-bazi-validation.mjs` 没有使用 `chart.daYunDirection`，而是用 `chart.daYunList[0]?.startYear > adjustedInfo.year` 推断大运方向。

该推断不等价于大运顺逆方向，导致 CASE_006 被错误显示为 Forward。

## 当前阶段
Phase 2：八字模块可信度基础建设

## 任务目标
修复验证脚本的大运方向输出逻辑。

确保验证脚本直接使用：

```js
chart.daYunDirection