import React from 'react';
import classNames from 'classnames';
import { useCalendar } from '@/ui/contexts/CalendarContext';
import styles from './Almanac.module.css';

const WD = ['日', '一', '二', '三', '四', '五', '六'] as const;

/** Generate a neutral daily summary from the day officer (建除十二神) */
function getSummary(dayOfficer: string): string {
  const map: Record<string, string> = {
    '建': '宜稳步推进计划，打好基础',
    '除': '适合清理整顿，去旧迎新',
    '满': '诸事圆满之日，宜积极行动',
    '平': '平稳之日，适合处理日常事务',
    '定': '适合确定计划，签约定事',
    '执': '宜执行既定计划，按部就班',
    '破': '不宜重大决策，谨慎为上',
    '危': '凡事小心谨慎，避免冒险',
    '成': '万事可成之日，宜积极把握',
    '收': '适合收尾总结，不宜开新局',
    '开': '万象更新之日，宜开始新事',
    '闭': '宜休养生息，避免大动作',
  };
  return map[dayOfficer] || '适合处理日常事务，重大决策仍需谨慎参考';
}

export const AlmanacPanel: React.FC = () => {
  const { selectedDate } = useCalendar();
  if (!selectedDate) return null;

  const {
    date, suit, avoid, clash, sha,
    auspiciousGods, inauspiciousGods,
    fiveElements, dutyGod, dayOfficer,
  } = selectedDate;

  const wd = WD[new Date(date.year, date.month - 1, date.day).getDay()];
  const occasion = date.lunar.festival || date.lunar.term;
  const summary = getSummary(dayOfficer);

  return (
    <div className={styles.brief}>

      {/* ═══ 今日概览 ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroDay}>{date.day}</span>
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroGreg}>
            {date.year}年{date.month}月 · 星期{wd}
          </div>
          <div className={styles.heroLunar}>
            农历{date.lunar.month}{date.lunar.day}
            {occasion && <span className={styles.heroOccasion}>{occasion}</span>}
          </div>
          <p className={styles.heroSummary}>{summary}</p>
        </div>
      </section>

      {/* ═══ 今日宜忌 ═══ */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>今日宜忌</h3>
        <div className={styles.yiji}>
          <div className={styles.yijiBlock}>
            <span className={styles.yijiLabel}>宜</span>
            <div className={styles.chips}>
              {suit.length > 0
                ? suit.map((s, i) => <span key={i} className={classNames(styles.chip, styles.chipYi)}>{s}</span>)
                : <span className={styles.chipNone}>无</span>
              }
            </div>
          </div>
          <div className={styles.yijiBlock}>
            <span className={classNames(styles.yijiLabel, styles.yijiLabelJi)}>忌</span>
            <div className={styles.chips}>
              {avoid.length > 0
                ? avoid.map((a, i) => <span key={i} className={classNames(styles.chip, styles.chipJi)}>{a}</span>)
                : <span className={styles.chipNone}>无</span>
              }
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 今日格局 ═══ */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>今日格局</h3>
        <div className={styles.grid4}>
          <div className={styles.kv}><span className={styles.k}>建除</span><span className={styles.v}>{dayOfficer === '—' ? '—' : `${dayOfficer}日`}</span></div>
          <div className={styles.kv}><span className={styles.k}>值神</span><span className={styles.v}>{dutyGod}</span></div>
          <div className={styles.kv}><span className={styles.k}>五行</span><span className={styles.v}>{fiveElements}</span></div>
          <div className={styles.kv}><span className={styles.k}>冲煞</span><span className={styles.v}>{clash === '—' && sha === '—' ? '—' : `${clash} ${sha}`}</span></div>
        </div>
      </section>

      {/* ═══ 吉凶神煞 ═══ */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>吉凶神煞</h3>
        <div className={styles.gods}>
          <div className={styles.godRow}>
            <span className={styles.godLabel}>吉神</span>
            <span className={styles.godVal}>{auspiciousGods.length > 0 ? auspiciousGods.join('  ') : '无'}</span>
          </div>
          <div className={styles.godRow}>
            <span className={classNames(styles.godLabel, styles.godLabelBad)}>凶神</span>
            <span className={styles.godVal}>{inauspiciousGods.length > 0 ? inauspiciousGods.join('  ') : '无'}</span>
          </div>
        </div>
      </section>

      <footer className={styles.foot}>
        基于 lunar-javascript 天文历算引擎生成，仅供文化参考。
      </footer>
    </div>
  );
};
