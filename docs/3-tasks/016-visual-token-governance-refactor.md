# Task 016：Visual Token Governance Refactor

## 背景

Amber Compass 已建立：

- 视觉 Token 标准
- Visual Token Audit
- UI 基线
- 统一视觉方向

当前问题已经不是：

“页面能不能用”。

而是：

视觉 Token 尚未真正制度化。

当前存在：

- Token 缺口
- 模块私有 Token
- 圆角漂移
- 阴影硬编码
- opacity 状态失控
- serif 使用扩散

其中：

Bazi 模块是当前最大风险区域。

---

## 当前阶段

Phase 2：视觉系统治理 / Token 统一阶段

---

## 任务目标

不改变 UI 结构，
不重做视觉，
只治理当前项目中的：

- Token 缺口
- Token 漂移
- 高风险硬编码

让 Amber Compass 开始真正进入：

统一视觉系统阶段。

---

# 本次任务范围

本次只做：

## 一、补齐全局 Token

允许新增：

- --r-sm
- --r-md
- --shadow-sm
- --shadow
- --shadow-lg
- --disabled
- --muted

要求：

统一进入 global.css。

---

## 二、统一圆角体系

允许：

将当前：

- 3px
- 4px
- 5px
- 12px

映射到：

- --r-sm
- --r
- --r-md
- --r-lg

目标：

减少圆角漂移。

禁止：

新增新的圆角尺寸。

---

## 三、统一阴影体系

将：

- 面板阴影
- 浮层阴影
- active 阴影
- 按钮阴影

统一为 shadow token。

禁止：

继续新增 rgba shadow 硬编码。

---

## 四、治理明显 Token 缺口

重点：

Settings 当前使用：

--r-md

但 global.css 未定义。

本任务必须解决。

---

# 本次不要处理

禁止：

- 大范围 UI 重做
- 修改布局
- 修改 IA
- 修改业务逻辑
- 修改八字计算
- 修改左侧结果区结构
- 重构五行色体系
- 大范围 serif 调整
- 新增复杂动画
- 改变整体暖色体系

---

# 允许读取

允许读取：

- global.css
- theme
- styles
- Calendar
- Almanac
- Bazi
- Settings
- Navigation

相关样式文件。

---

# 允许修改

允许修改：

- global.css
- theme
- 模块样式文件

允许更新：

- docs/1-current-status/01_PROJECT_STATUS.md
- docs/1-current-status/02_TASK_QUEUE.md

---

# 实现原则

## 一、治理优先于美化

目标：

建立秩序。

不是：

追求“更酷”。

---

## 二、小步统一

优先：

token 映射。

不是：

视觉重设计。

---

## 三、保持现有视觉方向

Amber Compass 当前方向已经正确：

现代
克制
温润
东方秩序感

本任务不能破坏。

---

## 四、禁止模块继续自治

模块：

不能继续：

- 自发明 shadow
- 自发明 radius
- 自发明状态体系

必须逐步回归全局 Token。

---

# 输出要求

完成后输出：

# Visual Token Governance Refactor Summary

包含：

## 新增了哪些全局 Token

## 修复了哪些 Token 缺口

## 哪些圆角已统一

## 哪些阴影已统一

## 哪些硬编码已移除

## 哪些问题暂时保留

## 是否影响 UI 结构

## 是否影响业务逻辑

---

# 验收标准

任务完成后：

- global.css 拥有完整基础 Token
- 不再存在未定义 Token
- 圆角体系明显收敛
- 阴影体系开始统一
- 不破坏当前 UI 气质
- 不改变布局结构
- 不影响业务逻辑

---

# 执行要求

1. 先输出实施计划
2. 小步修改
3. 不做视觉重设计
4. 修改后自行检查：
   - build 是否通过
   - 是否出现 UI 回归
   - 是否出现布局变化
5. 完成后更新 PROJECT_STATUS 与 TASK_QUEUE