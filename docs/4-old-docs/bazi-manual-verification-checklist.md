# 八字人工核对清单 (BaZi Manual Verification Checklist)

本清单用于人工记录 Amber Compass 与外部来源的比对结果。

状态口径必须以 `docs/1-current-status/bazi-verification-status-standard.md` 为准。

---

## 1. 核对基本原则

一个案例只有满足以下条件，才可标记为 `Externally Confirmed`：

- 至少两个独立外部来源与 Amber Compass 输出完全一致。
- 外部来源输入设置已对齐。
- 年柱、月柱、日柱、时柱等目标字段均已准确记录。

如果只有一个外部来源匹配，必须标记为 `Single Source Matched`。

如果字段未记录完整，必须标记为 `Pending`。

如果差异来自规则不同，必须标记为 `Rule Difference`，并说明具体规则原因。

如果不同文档或来源对同一字段记录矛盾，必须标记为 `Conflict`，并记录冲突字段。

---

## 2. 外部源设置要求

外部来源应尽量使用 Amber Compass 兼容设置：

- 历法：公历/阳历输入。
- 真太阳时：关闭。
- 经度修正：关闭。
- 子时处理：早晚子时切分。

---

## 3. 重点案例核对块

### CASE_002: 立春前案例

- Status: Single Source Matched
- Purpose: 1990年2月4日 08:00，立春在10:14
- Input: 1990-02-04 08:00 | 男 | LMT OFF
- Amber Compass Pillars: `己巳 丁丑 庚子 庚辰`
- Status Reason: Source A matched，Source B pending。

#### Source A: 易百查

- Match Status: Single Source Matched
- Result Field: `己巳 丁丑 庚子 庚辰`
- Notes: Source A 与 Amber Compass 一致。

#### Source B: 易运盘

- Match Status: Pending
- Result Field:
- Notes: 尚未记录完整外部结果。

---

### CASE_003: 立春后案例

- Status: Single Source Matched
- Purpose: 1990年2月4日 12:00，立春在10:14
- Input: 1990-02-04 12:00 | 男 | LMT OFF
- Amber Compass Pillars: `庚午 戊寅 庚子 壬午`
- Status Reason: Source A matched，Source B pending。

#### Source A: 易百查

- Match Status: Single Source Matched
- Result Field: `庚午 戊寅 庚子 壬午`
- Notes: Source A 与 Amber Compass 一致。

#### Source B: 易运盘

- Match Status: Pending
- Result Field:
- Notes: 尚未记录完整外部结果。

---

### CASE_004: 晚子时案例

- Status: Externally Confirmed
- Purpose: 1990年5月15日 23:30，测试晚子时逻辑
- Input: 1990-05-15 23:30 | 男 | LMT OFF
- Amber Compass Pillars: `庚午 辛巳 辛巳 戊子`
- Status Reason: Source A 与 Source B 均 matched。

#### Source A: 易百查

- Match Status: Externally Confirmed
- Result Field: `庚午 辛巳 辛巳 戊子`
- Notes: 与 Amber Compass 一致。

#### Source B: 易运盘

- Match Status: Externally Confirmed
- Result Field: `庚午 辛巳 辛巳 戊子`
- Notes: 与 Amber Compass 一致。

---

### CASE_009: 早子时案例

- Status: Externally Confirmed
- Purpose: 1990年5月15日 00:30，测试早子时逻辑
- Input: 1990-05-15 00:30 | 男 | LMT OFF
- Amber Compass Pillars: `庚午 辛巳 庚辰 丙子`
- Status Reason: Source A 与 Source B 均 matched。

#### Source A: 易百查

- Match Status: Externally Confirmed
- Result Field: `庚午 辛巳 庚辰 丙子`
- Notes: 与 Amber Compass 一致。

#### Source B: 易运盘

- Match Status: Externally Confirmed
- Result Field: `庚午 辛巳 庚辰 丙子`
- Notes: 与 Amber Compass 一致。

---

### CASE_001: 大运校验，男命

- Status: Pending
- Purpose: 验证顺行大运、起运时刻及周期序列
- Input: 1990-05-15 14:30 | 男 | LMT OFF
- Amber Compass Pillars: `庚午 辛巳 庚辰 癸未`
- Amber Compass Da Yun Direction: Forward
- Amber Compass Da Yun Start: 1997-06-25 起运
- Amber Compass First 8 Da Yun Cycles: `壬午(8岁) -> 癸未(18岁) -> 甲申(28岁) -> 乙酉(38岁) -> 丙戌(48岁) -> 丁亥(58岁) -> 戊子(68岁) -> 己丑(78岁)`
- Status Reason: 外部大运方向、起运时间、前八柱序列均未记录。

#### Source A: 易百查

- Da Yun Direction: Pending
- Da Yun Start: Pending
- First 8 Da Yun Cycles: Pending

#### Source B: 易运盘

- Da Yun Direction: Pending
- Da Yun Start: Pending
- First 8 Da Yun Cycles: Pending

---

### CASE_006: 大运校验，女命

- Status: Pending
- Purpose: 验证逆行大运、起运时刻及周期序列
- Input: 1990-05-15 14:30 | 女 | LMT OFF
- Amber Compass Pillars: `庚午 辛巳 庚辰 癸未`
- Amber Compass Da Yun Direction: Backward
- Amber Compass Da Yun Start: 1993-07-15 起运
- Amber Compass First 8 Da Yun Cycles: `庚辰(4岁) -> 己卯(14岁) -> 戊寅(24岁) -> 丁丑(34岁) -> 丙子(44岁) -> 乙亥(54岁) -> 甲戌(64岁) -> 癸酉(74岁)`
- Current Da Yun Direction: Backward
- Previous Conflict Source: 旧导出曾记录 Da Yun Direction 为 Forward。
- Resolution: Task 008 已确认原 Forward 来自验证脚本错误，当前验证脚本直接输出 `chart.daYunDirection`。
- Status Reason: 原 Conflict 已解除；Source B、大运方向外部核对、起运时间、前八柱序列仍未完整记录。

#### Source A: 易百查

- Da Yun Direction: Pending
- Da Yun Start: Pending
- First 8 Da Yun Cycles: Pending

#### Source B: 易运盘

- Da Yun Direction: Pending
- Da Yun Start: Pending
- First 8 Da Yun Cycles: Pending

---

## 4. Rule Difference 记录

### 大运起运年龄

- Status: Rule Difference
- Rule Reason: 不同排盘工具可能采用实岁、虚岁、进一法、舍去法或具体日期标注。
- Handling: 先核对大运干支序列，再核对起运时刻或年龄。

### 子时规则

- Status: Rule Difference
- Rule Reason: 外部工具可能使用不分早晚子时或其他 Sect 规则。
- Handling: 必须记录外部来源是否采用早晚子时切分。

### 真太阳时 / 经度修正

- Status: Rule Difference
- Rule Reason: Amber Compass 当前仅支持 LMT，经度修正不等于完整 TST。
- Handling: 外部来源如强制 TST 或经度修正，差异不得直接视为程序错误。
