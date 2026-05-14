import React, { useState } from 'react';
import type { ModuleId } from '@/core/modules';
import { ModuleSidebar } from '@/ui/components/shell/ModuleSidebar';
import { CalendarModule } from '@/ui/components/modules/CalendarModule';
import { BaziModule } from '@/ui/components/modules/bazi/BaziModule';
import { DateSelectModule } from '@/ui/components/modules/DateSelectModule';
import { DailyInsightModule } from '@/ui/components/modules/DailyInsightModule';
import { SettingsModule } from '@/ui/components/modules/settings/SettingsModule';
import styles from './AppShell.module.css';

const MODULE_VIEWS: Record<ModuleId, React.FC> = {
  calendar:     CalendarModule,
  bazi:         BaziModule,
  dateSelect:   DateSelectModule,
  dailyInsight: DailyInsightModule,
  settings:     SettingsModule,
};

export const AppShell: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleId>('calendar');

  const ActiveView = MODULE_VIEWS[activeModule];

  return (
    <div className={styles.shell}>
      <header className={styles.bar}>
        <span className={styles.brand}>Amber Compass</span>
      </header>
      <div className={styles.body}>
        <main className={styles.content}>
          <ActiveView />
        </main>
        <ModuleSidebar activeModule={activeModule} onSelect={setActiveModule} />
      </div>
    </div>
  );
};
