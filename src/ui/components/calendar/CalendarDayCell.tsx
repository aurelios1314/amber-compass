import React from 'react';
import classNames from 'classnames';
import type { CalendarDay } from '@/core/types';
import { useCalendar } from '@/ui/contexts/CalendarContext';
import styles from './Calendar.module.css';

interface Props {
  day: CalendarDay;
}

export const CalendarDayCell: React.FC<Props> = ({ day }) => {
  const { selectedDate, selectDate } = useCalendar();

  const isSelected = selectedDate?.date.dateString === day.dateString;
  const wd = new Date(day.year, day.month - 1, day.day).getDay();
  const isWeekend = wd === 0 || wd === 6;

  // Display priority: festival > term > lunar day (show month name on 初一)
  const lunarDisplay = day.lunar.festival
    || day.lunar.term
    || (day.lunar.day === '初一' ? day.lunar.month : day.lunar.day);

  const isSpecial = !!(day.lunar.festival || day.lunar.term);

  return (
    <button
      className={classNames(styles.cell, {
        [styles.cur]: day.isCurrentMonth,
        [styles.out]: !day.isCurrentMonth,
        [styles.today]: day.isToday,
        [styles.sel]: isSelected,
        [styles.wknd]: isWeekend && day.isCurrentMonth,
      })}
      onClick={() => selectDate(day.dateString)}
    >
      <span className={styles.gNum}>{day.day}</span>
      {day.isCurrentMonth && (
        <span className={classNames(styles.lTxt, { [styles.special]: isSpecial })}>
          {lunarDisplay}
        </span>
      )}
      {day.isToday && !isSelected && <span className={styles.todayDot} />}
    </button>
  );
};
