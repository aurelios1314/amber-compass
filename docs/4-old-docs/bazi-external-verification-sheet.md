# 四柱八字外部校验比对表 (BaZi External Verification Worksheet)

本表用于记录 Amber Compass 与第三方独立排盘工具的比对结果。

状态口径必须以 `docs/1-current-status/bazi-verification-status-standard.md` 为准。

---

## 1. 外部参照源

| Source | 名称 | 状态 | 说明 |
| :--- | :--- | :--- | :--- |
| Source A | 易百查 | 可人工核对 | 已用于部分四柱案例。 |
| Source B | 易运盘 | 可人工核对 | 支持早晚子时切换，需手动确认设置。 |
| Source C | 元亨利贞 / 问真八字等 | 备选 | 仅在 Source A / B 不足时使用。 |

---

## 2. 比对表

| Case ID | 出生时间 | Amber Compass | Source A | Source B | Status | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| CASE_001 | 1990-05-15 14:30 男 | `庚午 辛巳 庚辰 癸未` | Pending | Pending | Pending | 大运方向、起运时间、前八柱序列均未完成外部记录。 |
| CASE_002 | 1990-02-04 08:00 男 | `己巳 丁丑 庚子 庚辰` | `己巳 丁丑 庚子 庚辰` | Pending | Single Source Matched | Source A matched，Source B 未记录。 |
| CASE_003 | 1990-02-04 12:00 男 | `庚午 戊寅 庚子 壬午` | `庚午 戊寅 庚子 壬午` | Pending | Single Source Matched | Source A matched，Source B 未记录。 |
| CASE_004 | 1990-05-15 23:30 男 | `庚午 辛巳 辛巳 戊子` | `庚午 辛巳 辛巳 戊子` | `庚午 辛巳 辛巳 戊子` | Externally Confirmed | 双源匹配，适用于晚子时案例。 |
| CASE_005 | 1990-05-15 10:50 125E | Pending | Pending | Pending | Pending | 经度修正案例未记录完整。 |
| CASE_006 | 1990-05-15 14:30 女 | `庚午 辛巳 庚辰 癸未` | Pending | Pending | Pending | 当前 Da Yun Direction = Backward。原 Forward 来自验证脚本错误，已由 Task 008 修复；Source B、大运方向外部核对、起运时间、前八柱序列仍未完成。 |
| CASE_007 | 2024-02-04 10:00 | Pending | Pending | Pending | Pending | 字段未记录完整。 |
| CASE_008 | 2024-02-10 12:00 | Pending | Pending | Pending | Pending | 字段未记录完整。 |
| CASE_009 | 1990-05-15 00:30 男 | `庚午 辛巳 庚辰 丙子` | `庚午 辛巳 庚辰 丙子` | `庚午 辛巳 庚辰 丙子` | Externally Confirmed | 双源匹配，适用于早子时案例。 |
| CASE_010 | 1990-05-15 23:00 | Pending | Pending | Pending | Pending | 字段未记录完整。 |
| CASE_011 | 2024-05-01 12:00 73E | Pending | Pending | Pending | Pending | 经度修正案例未记录完整。 |
| CASE_012 | 2024-01-01 12:00 | Pending | Pending | Pending | Pending | 字段未记录完整。 |

---

## 3. Rule Difference 分类

| 类型 | Status | 规则原因 |
| :--- | :--- | :--- |
| 子时规则 | Rule Difference | 外部来源可能使用不分早晚子时或其他 Sect 规则。 |
| 真太阳时 / 经度修正 | Rule Difference | Amber Compass 当前仅支持 LMT，不等于完整 TST。 |
| 大运起运年龄 | Rule Difference | 外部工具可能使用实岁、虚岁、进一法、舍去法或具体日期标注。 |

---

## 4. 术语等价性

以下术语等价，不视为计算冲突：

- 日主
- 日元
- 元男
- 元女
- Day Master

---

## 5. 未解决问题

- CASE_001 / CASE_006 大运方向、起运时间、前八柱序列仍为 Pending。
- CASE_002 / CASE_003 Source B 仍为 Pending。
- 经度修正相关案例仍为 Pending。
