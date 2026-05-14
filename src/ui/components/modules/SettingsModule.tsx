import React from 'react';
import { PlaceholderView } from './PlaceholderView';

export const SettingsModule: React.FC = () => (
  <PlaceholderView
    title="设置"
    description="设置入口用于集中管理显示偏好、数据来源说明和本地数据选项。"
    planned={[
      '显示偏好',
      '时区设置',
      '数据来源说明',
      '语言选项',
      '本地数据管理',
    ]}
    note="当前正式设置页面已在主流程中启用，此占位入口仅保留为兼容组件。"
  />
);
