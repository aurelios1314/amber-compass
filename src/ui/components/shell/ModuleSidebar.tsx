import React from 'react';
import { Calendar, Columns3, CalendarCheck, Sparkles, Settings } from 'lucide-react';
import type { ModuleId } from '@/core/modules';
import { MODULES } from '@/core/modules';
import styles from './ModuleSidebar.module.css';

const ICONS: Record<ModuleId, React.ReactNode> = {
  calendar:     <Calendar size={18} />,
  bazi:         <Columns3 size={18} />,
  dateSelect:   <CalendarCheck size={18} />,
  dailyInsight: <Sparkles size={18} />,
  settings:     <Settings size={18} />,
};

interface Props {
  activeModule: ModuleId;
  onSelect: (id: ModuleId) => void;
}

export const ModuleSidebar: React.FC<Props> = ({ activeModule, onSelect }) => {
  return (
    <nav className={styles.sidebar} aria-label="功能导航">
      <div className={styles.items}>
        {MODULES.map((m) => {
          const isActive = activeModule === m.id;
          const isPreview = m.status === 'prototype' || m.status === 'coming-soon';
          const isDisabled = m.status === 'disabled';
          
          return (
            <button
              key={m.id}
              className={`${styles.item} ${isActive ? styles.active : ''} ${isPreview ? styles.preview : ''}`}
              onClick={() => { if (!isDisabled) onSelect(m.id); }}
              disabled={isDisabled}
              aria-current={isActive ? 'page' : undefined}
            >
              {isActive && <span className={styles.indicator} />}
              <span className={styles.icon}>{ICONS[m.id]}</span>
              <span className={styles.label}>{m.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
