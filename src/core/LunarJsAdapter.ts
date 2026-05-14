import { Solar } from 'lunar-javascript';
import type { IAlmanacProvider } from './IAlmanacProvider';
import type { CalendarMonth, AlmanacDay, CalendarDay } from './types';
import { isTodayInShanghai, parseDateString, formatDateString } from './timeUtils';

export class LunarJsAdapter implements IAlmanacProvider {
  getMonthGrid(year: number, month: number): CalendarMonth {
    const days: CalendarDay[] = [];
    
    // Find the day of the week for the 1st of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
    
    // We want the calendar to start on Sunday.
    // Calculate how many days from the previous month we need to show.
    const daysFromPrevMonth = startingDayOfWeek;
    
    // Calculate the last day of the current month
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    
    // Calculate the last day of the previous month
    const lastDayOfPrevMonth = new Date(year, month - 1, 0).getDate();
    
    // 1. Add previous month's padding days
    const prevMonth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      const day = lastDayOfPrevMonth - i;
      days.push(this.createCalendarDay(prevYear, prevMonth, day, false));
    }
    
    // 2. Add current month's days
    for (let day = 1; day <= lastDayOfMonth; day++) {
      days.push(this.createCalendarDay(year, month, day, true));
    }
    
    // 3. Add next month's padding days to complete a 6x7 grid (42 days total)
    const nextMonth = month === 12 ? 1 : month + 1;
    const nextYear = month === 12 ? year + 1 : year;
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push(this.createCalendarDay(nextYear, nextMonth, day, false));
    }
    
    return {
      year,
      month,
      days
    };
  }

  getAlmanacDetails(dateString: string): AlmanacDay {
    const { year, month, day } = parseDateString(dateString);
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    
    const chongDesc = lunar.getDayChongDesc();
    const shaDesc = lunar.getDaySha();
    const duty = lunar.getDayTianShen();
    const dutyType = lunar.getDayTianShenType();

    return {
      date: this.createCalendarDay(year, month, day, true), // isCurrentMonth is contextual, so we pass true here
      suit: lunar.getDayYi(),
      avoid: lunar.getDayJi(),
      clash: chongDesc ? `冲${chongDesc}` : '—',
      sha: shaDesc ? `煞${shaDesc}` : '—',
      auspiciousGods: lunar.getDayJiShen(),
      inauspiciousGods: lunar.getDayXiongSha(),
      fiveElements: lunar.getDayNaYin() || '—',
      dutyGod: duty ? `${duty} (${dutyType})` : '—',
      dayOfficer: lunar.getZhiXing() || '—'
    };
  }

  private createCalendarDay(year: number, month: number, day: number, isCurrentMonth: boolean): CalendarDay {
    const solar = Solar.fromYmd(year, month, day);
    const lunar = solar.getLunar();
    
    const jieQi = lunar.getJieQi();
    const solarFestivals = solar.getFestivals();
    const lunarFestivals = lunar.getFestivals();
    const allFestivals = [...solarFestivals, ...lunarFestivals];
    
    return {
      year,
      month,
      day,
      dateString: formatDateString(year, month, day),
      isCurrentMonth,
      isToday: isTodayInShanghai(year, month, day),
      lunar: {
        month: `${lunar.getMonthInChinese()}月`,
        day: lunar.getDayInChinese(),
        term: jieQi || null,
        festival: allFestivals.length > 0 ? allFestivals[0] : null
      }
    };
  }
}

export const almanacProvider = new LunarJsAdapter();
