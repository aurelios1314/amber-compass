# BaZi Verification Status Standard

本文件定义八字验证状态的最低可信标准。后续八字验证文档和 Task Card 必须引用本文件。

## 状态定义

### Externally Confirmed
外部确认。

判定条件：
- 至少两个独立外部来源与 Amber Compass 输出完全一致。
- 外部来源输入设置已对齐，包括公历输入、真太阳时关闭、经度修正关闭、子时规则对齐。
- 年柱、月柱、日柱、时柱等目标字段均已记录。

### Single Source Matched
单源匹配。

判定条件：
- 只有一个外部来源与 Amber Compass 输出一致。
- 或第二个来源尚未核对。
- 不得写成 Externally Confirmed。

### Pending
待核对。

判定条件：
- 尚未完成外部来源核对。
- 或外部结果字段未记录完整。

### Rule Difference
规则差异。

判定条件：
- 差异来自已确认的规则不同，例如子时规则、真太阳时、经度修正、起运年龄标注方式。
- 不得直接判定为程序错误。

### Conflict
冲突。

判定条件：
- 在输入设置已对齐的情况下，Amber Compass 与外部来源输出不一致。
- 或不同文档对同一案例记录互相矛盾。
- 必须保留为待处理问题，直到查明原因。

## 禁止表述

以下表述不得作为验证状态使用：
- 基本验证
- 大致一致
- 基本正确
- 初步确认
- 已验证

## 文档更新规则

- 只有 Externally Confirmed 可以表示外部确认。
- Single Source Matched 不能升级为 Externally Confirmed，除非补齐第二个独立来源。
- Pending 不能写成已确认。
- Rule Difference 必须说明具体规则差异。
- Conflict 必须记录冲突字段和冲突来源。

## 后续任务引用规则

后续八字验证任务必须在任务说明中引用：

`docs/1-current-status/bazi-verification-status-standard.md`

所有验证状态必须使用本文件定义的状态名称。

