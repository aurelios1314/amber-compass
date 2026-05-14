export interface LunarInfo {
  month: string;
  day: string;
  term: string | null;
  festival: string | null;
}

export interface CalendarDay {
  year: number;
  month: number;
  day: number;
  dateString: string; // "YYYY-MM-DD"
  isCurrentMonth: boolean;
  isToday: boolean;
  lunar: LunarInfo;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];
}


export interface AlmanacDay {
  date: CalendarDay;
  suit: string[];
  avoid: string[];
  clash: string;
  sha: string;
  auspiciousGods: string[];
  inauspiciousGods: string[];
  fiveElements: string;
  dutyGod: string;
  dayOfficer: string;
}
