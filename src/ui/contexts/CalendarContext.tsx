import React, { createContext, useContext, useState, useMemo } from 'react';
import type { CalendarMonth, AlmanacDay } from '@/core/types';
import { almanacProvider } from '@/core/LunarJsAdapter';
import { getTodayInShanghai, formatDateString } from '@/core/timeUtils';

interface CalendarContextType {
  currentMonth: CalendarMonth;
  selectedDate: AlmanacDay | null;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  goToToday: () => void;
  selectDate: (dateString: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const today = getTodayInShanghai();
  
  const [viewYear, setViewYear] = useState(today.year);
  const [viewMonth, setViewMonth] = useState(today.month);
  
  const [selectedDateString, setSelectedDateString] = useState<string | null>(
    formatDateString(today.year, today.month, today.day)
  );

  const currentMonth = useMemo(() => {
    return almanacProvider.getMonthGrid(viewYear, viewMonth);
  }, [viewYear, viewMonth]);

  const selectedDate = useMemo(() => {
    if (!selectedDateString) return null;
    return almanacProvider.getAlmanacDetails(selectedDateString);
  }, [selectedDateString]);

  const goToNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const goToPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const goToToday = () => {
    const t = getTodayInShanghai();
    setViewYear(t.year);
    setViewMonth(t.month);
    setSelectedDateString(formatDateString(t.year, t.month, t.day));
  };

  const selectDate = (dateString: string) => {
    setSelectedDateString(dateString);
  };

  const value = {
    currentMonth,
    selectedDate,
    goToNextMonth,
    goToPrevMonth,
    goToToday,
    selectDate
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
