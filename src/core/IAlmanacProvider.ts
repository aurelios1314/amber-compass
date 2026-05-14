import type { CalendarMonth, AlmanacDay } from './types';

export interface IAlmanacProvider {
  /**
   * Generates calendar grid for a given year and month.
   * Includes padding days for the first and last weeks.
   */
  getMonthGrid(year: number, month: number): CalendarMonth;

  /**
   * Gets detailed almanac information for a given date.
   * dateString should be in 'YYYY-MM-DD' format.
   */
  getAlmanacDetails(dateString: string): AlmanacDay;
}
