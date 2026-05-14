# Amber Compass UI Layout Baseline

本文档记录 Amber Compass 各模块的界面布局基准，用于约束后续开发，防止布局回归。

## BaZi Module Layout Baseline

### 1. One-screen desktop layout
八字页面应始终致力于在单一桌面视口内完整展示核心排盘结果与操作区域，避免页面级的垂直滚动。

### 2. Left result panel
左侧结果面板包含以下核心组件：
- 四柱矩阵 (Four Pillars Matrix)
- 大运表头 (Da Yun Header)
- 大运 4 × 2 紧凑网格 (Da Yun Cycles Grid)

### 3. Right operation panel
右侧操作面板采用内部双列布局：
- 左列：生辰信息 (Birth Info Input)
- 右列：命盘档案 (Chart Archive & Save)

### 4. Far-right module rail
最右侧的模块导航栏保持固定，由所有模块共享，不随八字页面逻辑变动。

### 5. No horizontal scrolling
八字页面严禁在主工作区、排盘结果区或大运区域引入水平滚动条。

### 6. No default relationship-flow overlay
干支流通可视化属于高级视图，默认情况下严禁在主排盘页面显示关系连线或浮动标签。

### 7. No explanation clutter
八字主流程页面严禁显示：
- 冗长的算法解释
- 验证性说明文本
- 原型阶段的免责声明
- 技术性 TODO 注释
- 命运断语或 AI 解读

### 8. Preserved visual direction
八字页面视觉风格应保持：
- 静谧、专业、紧凑
- 与万年历/黄历模块风格高度统一
- 坚持“左果右控”的交互布局

### 9. Forbidden regressions (禁止回归项)
严禁回归到以下状态：
- 生辰信息与命盘档案的垂直堆叠布局
- 水平滚动的长条大运列表
- 稀疏且过大的结果卡片
- 独立的问号图标或破坏行高的提示符
- 默认显示的干支关系线
- 主流程中出现大块的免责声明或说明文字
