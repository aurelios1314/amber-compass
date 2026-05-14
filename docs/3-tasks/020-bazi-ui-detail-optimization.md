# Task 020：八字模块 UI 细节优化落地

## 背景

Phase 2 结束时，Amber Compass 已完成：

- 八字模块可信度建设
- Visual Token 系统建立
- 全局空状态体系统一

当前问题：

- 八字模块左侧结果区与右侧操作区层级仍可优化
- 字体、圆角、阴影、色彩局部存在偏差
- 信息层级在主流程和次级流程间仍有细微视觉冲突

下一阶段目标：

- 落地八字模块细节优化
- 确保左果右控、主流程优先
- 完全遵循 Visual Token 系统
- 保持专业可信、东方秩序感
- 不改核心业务逻辑

---

## 当前阶段

Phase 3：八字模块 UI 细节优化落地

---

## 任务目标

1. **信息层级优化**
   - 左侧四柱矩阵 / 大运矩阵
   - 当前输入信息、排盘结果、时间修正等
   - 确保主流程信息突出，辅助信息降权

2. **右侧操作区优化**
   - 生辰输入 / 开始排盘 → 一级主流程
   - 保存命盘 → 次级流程
   - 历史档案 → 辅助流程
   - 确保视觉权重与任务优先级一致

3. **视觉细节统一**
   - 字体：sans / serif 使用严格遵循 Visual Token
   - 圆角：统一 --r-* token
   - 阴影：统一 --shadow-* token
   - 色彩：背景、表面、强调色、五行色保持全局一致

4. **空状态与骨架元素整合**
   - 左侧 / 右侧空状态保持低权重
   - 极轻圆环、点阵、微结构线、琥珀定位点统一使用
   - 不新增骨架动画、插画或营销元素

---

## 允许读取

- docs/0-long-term-rules/03_VISUAL_TOKEN_STANDARD.md
- docs/3-tasks/018-bazi-initial-empty-state-refactor.md
- docs/3-tasks/019-global-empty-state-system.md
- src/ui/components/modules/bazi/
- BaziModule / BaziChartPanel / BaziInputForm / BaziNotes
- Calendar / Almanac 样式和组件
- global.css

---

## 允许修改

- 八字模块 UI 组件
- 对应模块样式文件
- 少量 global.css token（空状态相关）
- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

---

## 不要修改

- 核心业务逻辑
- 八字计算
- 左侧结果结构
- Calendar / Almanac 主结构
- 右侧操作区主流程
- 布局基线
- IA 或交互流程

---

## 输出要求

完成后输出：

# Bazi UI Detail Optimization Summary

包含：

- 落地调整内容
- 主流程视觉强化
- 次级 / 辅助流程视觉降低
- 字体 / 圆角 / 阴影 / 色彩统一情况
- 空状态与骨架元素整合情况
- 是否保持布局基线
- 是否影响核心业务逻辑

---

## 验收标准

- 八字模块主流程突出
- 次级 / 辅助流程视觉降权
- 空状态与骨架元素统一
- 左果右控布局保持
- Token 系统完全遵循
- 不影响核心业务逻辑

---

## 执行要求

1. 输出落地调整计划
2. 小步优化
3. 不做大范围视觉重设计
4. 修改后 build 自检
5. 完成后更新 PROJECT_STATUS 与 TASK_QUEUE