import React from 'react';
import { PlaceholderView } from './PlaceholderView';

export const DailyInsightModule: React.FC = () => (
  <PlaceholderView
    title="每日洞察"
    description="该模块尚未启用，后续将把日历与黄历数据整理为简短的当日摘要。"
    planned={[
      '当日摘要',
      '节气与物候',
      '宜忌重点',
      '建除十二神参考',
      '本地数据说明',
    ]}
    note="当前不接入外部服务，不改变现有日历与黄历数据来源。"
  />
);
