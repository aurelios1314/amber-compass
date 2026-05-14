# Amber Compass 四柱八字验证状态报告 (BaZi Validation Status)

本文档记录 Amber Compass 八字排盘验证状态。

状态口径必须以 `docs/1-current-status/bazi-verification-status-standard.md` 为准。

---

## 1. 当前状态总览

| 验证项 | 当前状态 | 依据 | 说明 |
| :--- | :--- | :--- | :--- |
| 出生时间输入 | Pending | 内部链路可运行，外部字段未完整记录 | 依赖本地时间输入与 `lunar-javascript`。 |
| LMT 经度修正 | Pending | 外部核对不足 | 当前仅做经度修正，不包含 EOT。 |
| 年柱切换 | Single Source Matched | CASE_002 / CASE_003 Source A matched，Source B pending | 不能写作 Externally Confirmed。 |
| 月柱切换 | Single Source Matched | CASE_002 / CASE_003 Source A matched，Source B pending | 不能写作 Externally Confirmed。 |
| 日柱 / 时柱：早晚子时 | Externally Confirmed | CASE_004 / CASE_009 Source A 与 Source B matched | 仅适用于已记录双源匹配的子时案例。 |
| 大运方向 | Pending | CASE_001 / CASE_006 外部大运字段 pending | 需要继续核对。 |
| 大运起运时间 | Pending | CASE_001 / CASE_006 外部起运字段 pending | 起运年龄/日期存在规则差异风险。 |
| 大运干支序列 | Pending | CASE_001 / CASE_006 外部序列字段 pending | 需优先核对序列，再核对起运年龄。 |
| 藏干 / 十神 | Pending | 尚未形成外部双源记录 | 当前只能视为内部一致。 |

---

## 2. 案例状态

| Case ID | 主题 | 当前状态 | 状态原因 |
| :--- | :--- | :--- | :--- |
| CASE_001 | 男命大运校验 | Pending | 外部大运方向、起运时间、前八柱序列均未记录。 |
| CASE_002 | 立春前案例 | Single Source Matched | Source A matched，Source B pending。 |
| CASE_003 | 立春后案例 | Single Source Matched | Source A matched，Source B pending。 |
| CASE_004 | 晚子时案例 | Externally Confirmed | Source A 与 Source B 均 matched。 |
| CASE_006 | 女命大运校验 | Pending | 当前验证脚本输出 Da Yun Direction = Backward；原 Conflict 来自验证脚本错误，已由 Task 008 修复。Source B、大运方向外部核对、起运时间、前八柱序列仍未完成。 |
| CASE_009 | 早子时案例 | Externally Confirmed | Source A 与 Source B 均 matched。 |

---

## 3. Rule Difference

### LMT vs TST

状态：Rule Difference

规则原因：
- Amber Compass 当前仅支持 LMT 经度修正。
- 当前不包含 EOT 均时差，因此不能等同于完整真太阳时 TST。
- 临近时辰边界时，LMT 与 TST 可能导致时柱不同。

### 子时规则

状态：Rule Difference

规则原因：
- Amber Compass 当前采用早晚子时切分逻辑。
- 外部来源如果使用不分早晚子时或其他 Sect 规则，差异应记录为 Rule Difference。

### 大运起运年龄

状态：Rule Difference

规则原因：
- 不同外部工具可能采用实岁、虚岁、进一法、舍去法或具体日期标注。
- 如果大运干支序列一致，但起运年龄/日期标注不同，应优先记录为 Rule Difference，而不是程序错误。

---

## 4. 已解除 Conflict

### CASE_006 Da Yun Direction

原冲突字段：Da Yun Direction

处理结果：
- Task 008 已修复验证脚本的大运方向输出逻辑。
- 当前验证脚本直接输出 `chart.daYunDirection`。
- CASE_006 当前输出为 Backward。
- 原 Forward 记录来自验证脚本错误，不再作为当前冲突依据。

当前状态：
- Pending。
- Source B、大运方向外部核对、起运时间、前八柱序列仍未完成。

---

## 5. 历史事故

### CASE_002 日柱误报

状态：Conflict 已处理为历史事故。

说明：
- 曾出现 `庚午` 日柱误报。
- 当前人工清单记录 CASE_002 为 `己巳 丁丑 庚子 庚辰`。
- 该事故不再作为当前确认依据，后续仍需按标准状态继续核对 Source B。

---

## 6. 结论

当前不得使用标准以外的验证表述。

后续八字验证任务应优先处理：

1. CASE_001 / CASE_006 大运方向、起运时间、前八柱序列 Pending。
2. CASE_002 / CASE_003 Source B Pending。
