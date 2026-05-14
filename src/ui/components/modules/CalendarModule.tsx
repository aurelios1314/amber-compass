import React from 'react';
import styles from './CalendarModule.module.css';
import { CalendarProvider } from '@/ui/contexts/CalendarContext';
import { CalendarGrid } from '@/ui/components/calendar/CalendarGrid';
import { CalendarHeader } from '@/ui/components/calendar/CalendarHeader';
import { AlmanacPanel } from '@/ui/components/almanac/AlmanacPanel';

export const CalendarModule: React.FC = () => {
  return (
    <CalendarProvider>
      <div className={styles.stage}>
        <div className={styles.panel}>
          <div className={styles.left}>
            <CalendarHeader />
            <CalendarGrid />
          </div>
          <div className={styles.right}>
            <AlmanacPanel />
          </div>
        </div>
      </div>
    </CalendarProvider>
  );
};
