export type Gender = 1 | 0; // 1: Male, 0: Female

export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  gender: Gender;
  isTrueSolarTime: boolean;
  longitude?: number; // 经度 (e.g., 116 for 116°E)
}

export interface Pillar {
  gan: string;
  zhi: string;
  ganTenGod: string;
  zhiTenGod: string[]; // [Main, ...Hidden]
  hiddenStems: string[];
  naYin: string;
}

export interface DaYunInfo {
  ganZhi: string;
  startYear: number;
  age: number;
}

export interface BaziChart {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  dayMaster: string; // 日主 (Day Gan)
  daYunStart: string; // "X年X月X天后起运"
  daYunDirection: 'Forward' | 'Backward';
  daYunList: DaYunInfo[];
}

export interface BaziValidationResult {
  isValid: boolean;
  error?: string;
}
