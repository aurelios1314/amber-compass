import React from 'react';
import { PlaceholderView } from './PlaceholderView';

export const DateSelectModule: React.FC = () => (
  <PlaceholderView
    title="择日"
    description="该模块尚未启用，后续将基于日历、黄历和八字数据提供日期筛选。"
    planned={[
      '事项类型',
      '日期范围',
      '黄历宜忌筛选',
      '八字冲合参考',
      '候选日期列表',
    ]}
    note="当前不影响日历、黄历和八字模块的既有使用。"
  />
);
