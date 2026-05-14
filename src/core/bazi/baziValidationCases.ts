import type { BirthInfo } from './BaziTypes';

export type ValidationStatus = 
  | 'internal_only' 
  | 'pending_external' 
  | 'external_matched' 
  | 'externally_confirmed' 
  | 'external_mismatch' 
  | 'rule_difference' 
  | 'needs_review';

export interface BaziValidationCase {
  id: string;
  description: string;
  input: BirthInfo;
  boundaryType: 'normal' | 'lichun' | 'zihour' | 'longitude' | 'gender_dayun' | 'year_boundary';
  
  expectedExternal: {
    source: string | null;
    pillars: [string, string, string, string] | null;
    notes: string | null;
  } | null;

  status: ValidationStatus;
}

export const baziValidationCases: BaziValidationCase[] = [
  {
    id: 'CASE_001',
    description: '普通时段案例 - 1990年5月15日 14:30 男',
    input: { year: 1990, month: 5, day: 15, hour: 14, minute: 30, gender: 1, isTrueSolarTime: false },
    boundaryType: 'normal',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['庚午', '辛巳', '庚辰', '癸未'],
      notes: 'Confirmed by two independent sources. Validates forward Da Yun direction and sequence.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_002',
    description: '立春前案例 - 1990年2月4日 08:00 (立春在10:14)',
    input: { year: 1990, month: 2, day: 4, hour: 8, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'lichun',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['己巳', '丁丑', '庚子', '庚辰'],
      notes: 'Confirmed by two independent sources. Validates Li Chun year boundary and day pillar stability.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_003',
    description: '立春后案例 - 1990年2月4日 12:00 (立春在10:14)',
    input: { year: 1990, month: 2, day: 4, hour: 12, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'lichun',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['庚午', '戊寅', '庚子', '壬午'],
      notes: 'Confirmed by two independent sources. Validates solar-term month boundary and day pillar stability.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_004',
    description: '晚子时案例 - 1990年5月15日 23:30',
    input: { year: 1990, month: 5, day: 15, hour: 23, minute: 30, gender: 1, isTrueSolarTime: false },
    boundaryType: 'zihour',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['庚午', '辛巳', '辛巳', '戊子'],
      notes: 'Confirmed by two independent sources. Validates late Zi-hour behavior and day pillar handling.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_005',
    description: '经度修正跨界案例 - 125°E 修正后时柱变动',
    input: { year: 1990, month: 5, day: 15, hour: 10, minute: 50, gender: 1, isTrueSolarTime: true, longitude: 125 },
    boundaryType: 'longitude',
    expectedExternal: null,
    status: 'pending_external'
  },
  {
    id: 'CASE_006',
    description: '大运方向校验 - 阳年女性 (庚午年) 逆行',
    input: { year: 1990, month: 5, day: 15, hour: 14, minute: 30, gender: 0, isTrueSolarTime: false },
    boundaryType: 'gender_dayun',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['庚午', '辛巳', '庚辰', '癸未'],
      notes: 'Confirmed by two independent sources. Validates backward Da Yun direction and sequence.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_007',
    description: '2024立春点前 - 2024年2月4日 10:00 (立春16:26)',
    input: { year: 2024, month: 2, day: 4, hour: 10, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'lichun',
    expectedExternal: null,
    status: 'pending_external'
  },
  {
    id: 'CASE_008',
    description: '春节已过但未立春 - 2024年2月10日 (初一) 12:00',
    input: { year: 2024, month: 2, day: 10, hour: 12, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'year_boundary',
    expectedExternal: null,
    status: 'pending_external'
  },
  {
    id: 'CASE_009',
    description: '早子时案例 - 1990年5月15日 00:30',
    input: { year: 1990, month: 5, day: 15, hour: 0, minute: 30, gender: 1, isTrueSolarTime: false },
    boundaryType: 'zihour',
    expectedExternal: {
      source: 'Source A: 易百查 | Source B: 易运盘',
      pillars: ['庚午', '辛巳', '庚辰', '丙子'],
      notes: 'Confirmed by two independent sources. Validates early Zi-hour behavior and hour pillar calculation.'
    },
    status: 'externally_confirmed'
  },
  {
    id: 'CASE_010',
    description: '子时起界点 - 1990年5月15日 23:00',
    input: { year: 1990, month: 5, day: 15, hour: 23, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'zihour',
    expectedExternal: null,
    status: 'pending_external'
  },
  {
    id: 'CASE_011',
    description: '西部极端经度修正 - 73°E 喀什',
    input: { year: 2024, month: 5, day: 1, hour: 12, minute: 0, gender: 1, isTrueSolarTime: true, longitude: 73 },
    boundaryType: 'longitude',
    expectedExternal: null,
    status: 'pending_external'
  },
  {
    id: 'CASE_012',
    description: '普通现代日期 - 2024年元旦',
    input: { year: 2024, month: 1, day: 1, hour: 12, minute: 0, gender: 1, isTrueSolarTime: false },
    boundaryType: 'normal',
    expectedExternal: null,
    status: 'pending_external'
  }
];
