# Task 018：Bazi Initial Empty State Refactor

## 背景

Task 017 已完成 Amber Compass Empty State Review。

当前结论：

- Amber Compass 空状态方向已经明确
- 当前最大问题是：
  Bazi 初始空状态仍偏骨架屏 / 占位结构
- 空状态缺少：
  工作台感
  品牌秩序感
  等待输入感

下一阶段目标：

不是做装饰，
而是让：

Bazi 初始状态

真正进入：

Amber Compass 的品牌语言。

---

## 当前阶段

Phase 2：空状态系统建立 / 品牌感注入

---

# 任务目标

重构：

Bazi 模块初始空状态。

目标：

从：

“骨架占位”

升级为：

“安静等待输入的东方工作台”。

---

# 核心方向

必须保持：

克制
可信
专业
温润
低对比
现代东方秩序感

空状态：

不能比真实内容更抢眼。

---

# 允许引入的元素

允许：

- 极轻圆环
- 极轻点阵
- 微结构线
- 极淡琥珀定位点
- 极弱层级结构

这些元素：

只能抽象转译自 Logo。

---

# 禁止事项

禁止：

- 八卦
- 罗盘 UI
- 云纹
- 发光
- 粒子
- 大插画
- 吉祥物
- 复杂 decorative pattern
- 强渐变
- 玄学图腾
- 营销文案

禁止：

让空状态像：

- 营销页
- 插画页
- 命理海报
- loading skeleton

---

# 重点目标

## 一、降低骨架屏感

当前 skeleton 结构过强。

目标：

更像：

结构已准备好，
等待输入。

而不是：

页面还没加载。

---

## 二、增强工作台感

让用户感觉：

这是：

可信的专业系统。

不是：

娱乐排盘页。

---

## 三、Logo 气质抽象转译

重点：

抽取：

- 圆环
- 点阵
- 琥珀定位感
- 秩序感

不是：

直接贴 Logo。

---

## 四、保持低干扰

空状态：

必须低于真实内容。

不能：

喧宾夺主。

---

# 允许读取

允许读取：

- docs/0-long-term-rules/03_VISUAL_TOKEN_STANDARD.md
- docs/3-tasks/017-amber-empty-state-system.md

- BaziModule
- BaziChartPanel
- PlaceholderView
- global.css
- Bazi styles

---

# 允许修改

允许修改：

- Bazi 初始空状态相关组件
- PlaceholderView（如果有必要）
- styles
- global.css（仅少量 empty-state token）

允许更新：

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

---

# 不要修改

禁止修改：

- 八字计算逻辑
- 左侧真实结果区结构
- Calendar 主结构
- Almanac 主结构
- Token 主体系
- 布局基线
- 右侧操作区流程

---

# 输出要求

完成后输出：

# Bazi Initial Empty State Refactor Summary

包含：

## 做了哪些空状态调整

## 如何降低骨架屏感

## 如何引入 Logo 秩序语言

## 哪些元素被严格克制

## 是否影响真实内容区

## 是否影响布局结构

---

# 验收标准

任务完成后：

- Bazi 空状态不再像 loading skeleton
- 更像“等待输入的工作台”
- 品牌感增强
- 不玄学化
- 不营销化
- 不抢真实内容
- 不破坏当前布局

---

# 执行要求

1. 先输出实施计划
2. 小步修改
3. 不做视觉重设计
4. 修改后自行检查：
   - build 是否通过
   - 是否破坏布局
   - 是否过度装饰
5. 完成后更新 PROJECT_STATUS 与 TASK_QUEUE