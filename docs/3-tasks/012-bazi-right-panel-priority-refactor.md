# Task 012：梳理右侧操作区主次关系

## 背景

Task 011 已完成八字模块产品体验评审。

主要发现：

- 右侧操作区承担输入、保存、档案列表等多功能，主流程不够聚焦
- 用户核心流程是：“输入生辰 → 排盘 → 查看结果”
- 保存和档案管理在用户未排盘前占据注意力过早

目标是优化右侧操作区层级，让主流程更加突出。

---

## 当前阶段

Phase 2：八字模块验证与界面打磨 / 产品体验统一

---

## 任务目标

梳理右侧操作区组件优先级：

1. 输入生辰 / 排盘 → 主流程
2. 保存命盘 / 历史档案 → 次级流程
3. 其他功能 → 隐藏或折叠，避免占用主界面注意力

输出：

- 右侧操作区优先级清单
- 组件主次关系示意
- 对应 Task Card 或可供 Codex 参考的层级规范

---

## 允许读取

- docs/0-long-term-rules/00_PROJECT_BRIEF.md
- docs/1-current-status/01_PROJECT_STATUS.md
- docs/4-old-docs/ui-layout-baseline.md
- src/ui/components/modules/bazi/
- BaziModule
- BaziInputForm
- BaziNotes
- BaziChartPanel
- styles

---

## 不要修改

- src/
- package.json
- UI 代码
- 业务逻辑
- docs 状态文件
- 不输出具体实现方案

---

## 分析重点

- 确认输入排盘在视觉和交互层级中的优先级
- 保存 / 历史档案组件放置为次级流程
- 避免主流程被分散注意力
- 确认层级逻辑能被 Codex 执行参考

---

## 输出要求

输出：

# Right Panel Priority Refactor Plan

包含：

- 组件优先级清单
- 主流程与次级流程分层
- 可执行 Task Card / Codex 参考说明
- 必要注意事项（哪些部分暂时不动）

---

## 验收标准

- 明确右侧操作区主次关系
- 主流程突出，次级流程明确
- 不影响主界面整体布局
- 不输出实现方案

---

## 执行要求

1. 先输出分析计划
2. 不修改代码
3. 不输出具体实现方案
4. 等待确认后再进一步执行