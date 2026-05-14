import React from 'react';
import { useCalendar } from '@/ui/contexts/CalendarContext';
import { CalendarDayCell } from './CalendarDayCell';
import styles from './Calendar.module.css';

const WK = ['日', '一', '二', '三', '四', '五', '六'];

export const CalendarGrid: React.FC = () => {
  const { currentMonth } = useCalendar();

  return (
    <div className={styles.gridWrap}>
      <div className={styles.wkRow}>
        {WK.map(d => <div key={d} className={styles.wkLabel}>{d}</div>)}
      </div>
      <div className={styles.grid}>
        {currentMonth.days.map(day => (
          <CalendarDayCell key={day.dateString} day={day} />
        ))}
      </div>
    </div>
  );
};
