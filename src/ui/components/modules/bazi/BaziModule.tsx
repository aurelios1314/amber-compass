import React, { useState } from 'react';
import type { BirthInfo, BaziChart } from '@/core/bazi/BaziTypes';
import { baziAdapter } from '@/core/bazi/BaziAdapter';
import { BaziChartPanel } from './BaziChartPanel';
import { BaziSidePanel } from './BaziSidePanel';
import styles from './BaziModule.module.css';

export const BaziModule: React.FC = () => {
  const [result, setResult] = useState<{ chart: BaziChart; adjustedInfo: BirthInfo } | null>(null);
  const [currentInput, setCurrentInput] = useState<BirthInfo | null>(null);

  const handleCalculate = (info: BirthInfo) => {
    try {
      const res = baziAdapter.calculateChart(info);
      setResult(res);
      setCurrentInput(info);
    } catch (err) {
      console.error('Bazi calculation failed', err);
    }
  };

  const handleLoad = (info: BirthInfo) => {
    handleCalculate(info);
  };

  return (
    <div className={styles.stage}>
      <div className={styles.panel}>
        <div className={styles.left}>
          <div className={styles.content}>
            {result ? (
              <BaziChartPanel chart={result.chart} />
            ) : (
              <div className={styles.emptyState} aria-label="等待生辰输入">
                <div className={styles.emptyStructure} aria-hidden="true">
                  <div className={styles.emptyRings}>
                    <span className={styles.emptyRingOuter} />
                    <span className={styles.emptyRingInner} />
                    <span className={styles.emptyLocator} />
                  </div>
                  <div className={styles.emptyDotGrid}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                  <div className={styles.emptyLines}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className={styles.emptyGuide}>
                  <div className={styles.emptyText}>等待生辰输入</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <BaziSidePanel
            onCalculate={handleCalculate}
            onLoad={handleLoad}
            currentInput={currentInput}
            chart={result?.chart || null}
          />
        </div>
      </div>
    </div>
  );
};
