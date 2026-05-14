import React from 'react';
import classNames from 'classnames';
import type { BaziChart, Pillar } from '@/core/bazi/BaziTypes';
import styles from './BaziModule.module.css';

interface Props {
  chart: BaziChart;
}

// ── 五行工具 (Refined Colors) ──
const getElement = (char: string): string => {
  if ('甲乙寅卯'.includes(char)) return 'mu';
  if ('丙丁巳午'.includes(char)) return 'huo';
  if ('戊己辰戌丑未'.includes(char)) return 'tu';
  if ('庚辛申酉'.includes(char)) return 'jin';
  if ('壬癸亥子'.includes(char)) return 'shui';
  return '';
};

const getElementColor = (char: string): string => {
  const el = getElement(char);
  return el ? `var(--wx-${el})` : 'var(--ink)';
};

export const BaziChartPanel: React.FC<Props> = ({ chart }) => {
  const { yearPillar, monthPillar, dayPillar, hourPillar, daYunList } = chart;
  const currentYear = new Date().getFullYear();
  const visibleDaYunList = daYunList.slice(0, 8);

  return (
    <div className={styles.resultSection}>
      {/* ═══ 核心四柱 ═══ */}
      <div className={styles.chartCard}>
        <div className={styles.pillarsGrid}>
          {/* Header Row with Spacer */}
          <div className={styles.gridHeader}></div> 
          <div className={styles.gridHeader}>年柱</div>
          <div className={styles.gridHeader}>月柱</div>
          <div className={styles.gridHeader}>日柱</div>
          <div className={styles.gridHeader}>时柱</div>

          {/* 十神行 */}
          <PillarRow label="十神" values={[yearPillar.ganTenGod, monthPillar.ganTenGod, '日主', hourPillar.ganTenGod]} isTenGodRow />
          
          {/* 天干行 */}
          <PillarRow label="天干" values={[yearPillar.gan, monthPillar.gan, dayPillar.gan, hourPillar.gan]} isGanRow />

          {/* 地支行 */}
          <PillarRow label="地支" values={[yearPillar.zhi, monthPillar.zhi, dayPillar.zhi, hourPillar.zhi]} isZhiRow />

          {/* 藏干行 */}
          <div className={styles.gridRowLabel}>藏干</div>
          <PillarHiddenStems pillar={yearPillar} />
          <PillarHiddenStems pillar={monthPillar} />
          <PillarHiddenStems pillar={dayPillar} />
          <PillarHiddenStems pillar={hourPillar} />

          {/* 纳音行 */}
          <div className={styles.gridRowLabel}>纳音</div>
          <div className={styles.nayinVal}>{yearPillar.naYin}</div>
          <div className={styles.nayinVal}>{monthPillar.naYin}</div>
          <div className={styles.nayinVal}>{dayPillar.naYin}</div>
          <div className={styles.nayinVal}>{hourPillar.naYin}</div>
        </div>
      </div>

      {/* ═══ 大运流水 ═══ */}
      <div className={styles.daYunSec}>
        <div className={styles.daYunHeader}>
          <div className={styles.daYunTitleWrap}>
            <h3 className={styles.daYunTitle}>大运流水</h3>
          </div>
          <div className={styles.daYunMeta}>
            <span className={styles.daYunDir}>
              方向：{chart.daYunDirection === 'Forward' ? '顺行' : '逆行'}
            </span>
            <span className={styles.daYunStartNote}>
              起运：{chart.daYunStart}
            </span>
          </div>
        </div>
        <div className={styles.daYunScrollWrap}>
          <div className={styles.daYunGrid}>
            {visibleDaYunList.map((dy, idx) => {
              const isCurrent = currentYear >= dy.startYear && (idx === daYunList.length - 1 || currentYear < daYunList[idx + 1].startYear);
              return (
                <div key={idx} className={classNames(styles.daYunCard, { [styles.daYunActive]: isCurrent })}>
                  <span className={styles.daYunAge}>{dy.age} 岁起</span>
                  <span className={styles.daYunGanzhi} style={{ color: getElementColor(dy.ganZhi[0]) }}>{dy.ganZhi}</span>
                  <span className={styles.daYunYear}>{dy.startYear} 年</span>
                  {isCurrent && <span className={styles.currBadge}>当前</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const PillarRow: React.FC<{ label: string; values: string[]; isGanRow?: boolean; isZhiRow?: boolean; isTenGodRow?: boolean }> = ({ label, values, isGanRow, isZhiRow, isTenGodRow }) => {
  return (
    <>
      <div className={styles.gridRowLabel}>{label}</div>
      {values.map((val, i) => (
        <div key={i} className={classNames(styles.gridVal, {
          [styles.ganCell]: isGanRow,
          [styles.zhiCell]: isZhiRow,
          [styles.tenGodCell]: isTenGodRow,
          [styles.dmFocus]: i === 2 && (isGanRow || isTenGodRow)
        })}>
          <span style={isGanRow || isZhiRow ? { color: getElementColor(val[0]) } : {}}>
            {val}
          </span>
        </div>
      ))}
    </>
  );
};

const PillarHiddenStems: React.FC<{ pillar: Pillar }> = ({ pillar }) => {
  return (
    <div className={styles.gridHiddenStems}>
      {pillar.hiddenStems.map((stem, i) => (
        <div key={i} className={styles.hsRow}>
          <span className={styles.hsGan} style={{ color: getElementColor(stem) }}>{stem}</span>
          <span className={styles.hsGod}>{pillar.zhiTenGod[i]}</span>
        </div>
      ))}
    </div>
  );
};
