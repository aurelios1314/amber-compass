import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '@/ui/contexts/CalendarContext';
import styles from './Calendar.module.css';

export const CalendarHeader: React.FC = () => {
  const { currentMonth, goToNextMonth, goToPrevMonth, goToToday } = useCalendar();

  return (
    <div className={styles.nav}>
      <h2 className={styles.title}>{currentMonth.year}年{currentMonth.month}月</h2>
      <div className={styles.actions}>
        <button className={styles.navBtn} onClick={goToPrevMonth} aria-label="上个月">
          <ChevronLeft size={16} />
        </button>
        <button className={styles.todayBtn} onClick={goToToday}>今天</button>
        <button className={styles.navBtn} onClick={goToNextMonth} aria-label="下个月">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
