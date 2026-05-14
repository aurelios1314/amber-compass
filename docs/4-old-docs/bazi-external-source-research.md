# 八字外部参考源调研报告 (BaZi External Source Research)

本报告对主流八字排盘工具进行了自动化潜力评估，并为重点校验用例提供了半自动化的比对链接。

## 1. 外部源评估 (Source Candidates)

| 来源名称 | URL | 自动化潜力 | 规则特点 | 推荐等级 |
| :--- | :--- | :--- | :--- | :--- |
| **易百查** | [yibaicha.com](http://www.yibaicha.com/bazi/) | **Blocked** (WAF) | 立春起岁，支持真太阳时 | **Source A** (已选) |
| **易运盘** | [yiyunpan.com](http://www.yiyunpan.com/bazi.asp) | **Manual** | 支持“分/不分早晚子时”切换 | **Source B** (首选) |
| **元亨利贞** | [pp.china95.net](http://pp.china95.net/) | **Manual** | 传统排盘逻辑，老牌参考 | **Source C** (备选) |
| **指迷算命** | [zhimishuanming.com](https://www.zhimishuanming.com/bazi/) | **Unusable** | ERR_CONNECTION_CLOSED | **Unusable** |
| **问真八字** | [wzsw.com](https://www.wzsw.com/) | **Blocked** (APP/JS) | 行业公认标准，但接口加密严苛 | **Source C** |

## 2. 自动化可行性分析 (Automation Feasibility)

- **终端脚本 (Node/Curl)**: **全线受阻**。主要站点均部署了防火墙，识别非浏览器 User-Agent 或异常请求频率。
- **浏览器代理 (Browser Agent)**: 技术可行，但当前环境下不可用。
- **半自动化 (Pre-filled Links)**: **最优解**。通过构造符合站点规则的 URL，减少手动输入误差。

## 3. 重点案例半自动化核对矩阵 (Priority Case Links)

以下链接预填了出生日期与性别，点击即可在第三方站点查看结果进行比对。

### CASE_002: 1990-02-04 08:00 | 男 | 己巳 丁丑 庚子 庚辰
- [指迷算命 (Zhimishuanming)](https://www.zhimishuanming.com/bazi/1990/2/4/8/1/)
- [易百查 (Yibaicha)](http://www.yibaicha.com/bazi/) (需手动输入)

### CASE_003: 1990-02-04 12:00 | 男 | 庚午 戊寅 庚子 壬午
- [指迷算命 (Zhimishuanming)](https://www.zhimishuanming.com/bazi/1990/2/4/12/1/)

### CASE_004: 1990-05-15 23:30 | 男 | 庚午 辛巳 辛巳 戊子
- [指迷算命 (Zhimishuanming)](https://www.zhimishuanming.com/bazi/1990/5/15/23/1/) (注：核对早晚子时处理)

### CASE_009: 1990-05-15 00:30 | 男 | 庚午 辛巳 庚辰 丙子
- [指迷算命 (Zhimishuanming)](https://www.zhimishuanming.com/bazi/1990/5/15/0/1/)

## 4. 外部核对操作建议 (Manual Instructions)

1. 点击上述 **Source B (指迷算命)** 链接。
2. 记录其产出的“四柱干支”及“起运时间”。
3. 在 `docs/bazi-external-verification-sheet.md` 的 **Source B** 列填入结果。
4. 如果与 Amber Compass 结果一致，标记为 `MATCHED`。
