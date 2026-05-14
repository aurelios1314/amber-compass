export type ModuleId = 'calendar' | 'bazi' | 'dateSelect' | 'dailyInsight' | 'settings';

export type ModuleStatus = 'active' | 'prototype' | 'coming-soon' | 'disabled';

export interface ModuleEntry {
  id: ModuleId;
  label: string;
  status: ModuleStatus;
}

export const MODULES: ModuleEntry[] = [
  { id: 'calendar',     label: '日历黄历', status: 'active' },
  { id: 'bazi',         label: '四柱八字', status: 'prototype' },
  { id: 'dateSelect',   label: '择日',     status: 'coming-soon' },
  { id: 'dailyInsight', label: '每日洞察', status: 'coming-soon' },
  { id: 'settings',     label: '设置',     status: 'active' },
];
