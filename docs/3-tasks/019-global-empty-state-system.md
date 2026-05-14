# Task 019：Amber Compass 全局空状态系统

## 背景

Task 018 已完成 Bazi 模块初始空状态改造。

当前问题：

- Calendar、Almanac、Settings 等模块仍使用通用 Placeholder 或骨架占位
- 空状态缺乏统一品牌气质
- 工作台感不足

下一阶段目标：

- 建立全局空状态体系
- 保证所有模块共享统一视觉 Token 和空状态风格
- 传递 Logo 秩序语言
- 低权重、克制、可信、东方秩序感

---

## 当前阶段

Phase 2：空状态系统统一 / 品牌感注入

---

## 任务目标

为全局模块建立统一空状态：

- Calendar / Almanac
- Bazi
- Settings
- 未开放模块 / 无数据状态

要求：

- 空状态比真实内容轻，不抢主流程
- 极轻圆环、点阵、定位点、微结构线抽象 Logo
- 文案简洁、克制、非情绪化
- 避免骨架屏、插画、玄学或营销元素

---

## 允许读取

- global.css
- docs/0-long-term-rules/03_VISUAL_TOKEN_STANDARD.md
- BaziModule、CalendarModule、AlmanacModule、SettingsModule
- Empty / Placeholder / Skeleton 相关组件
- UI 样式文件

---

## 允许修改

- 各模块空状态组件
- 对应模块样式文件
- 必要时少量 global.css empty-state token

允许更新：

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

---

## 不要修改

- 核心计算逻辑
- 左侧真实结果区
- 主布局结构
- 右侧操作区流程
- Token 主体系
- 八字 / 日历核心功能
- IA / 交互流程

---

## 输出要求

输出：

# Global Empty State Implementation Summary

包含：

- 各模块空状态改造内容
- Logo 秩序语言抽象应用
- 文案调整
- 空状态权重与真实内容对比
- 保持全局一致性
- 哪些模块仍保留待改内容
- 风险点和注意事项

---

## 验收标准

- 所有模块空状态统一方向
- Bazi 初始空状态逻辑延展到其他模块
- 保持低权重和克制感
- 不破坏 UI 布局和主流程
- 不影响业务逻辑
- 不加入玄学、营销或插画元素

---

## 执行要求

1. 先输出实施计划
2. 不直接改业务逻辑或主流程
3. 小步调整
4. 修改后自行 build 检查
5. 完成后更新 PROJECT_STATUS 与 TASK_QUEUE