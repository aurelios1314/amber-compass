import React, { useEffect, useMemo, useState } from 'react';
import type { BirthInfo, BaziChart } from '@/core/bazi/BaziTypes';
import { baziStorage } from '@/core/bazi/BaziStorage';
import type { SavedChart } from '@/core/bazi/BaziStorage';
import styles from './BaziModule.module.css';
import { BaziInputForm } from './BaziInputForm';
import { BaziSelect } from './BaziSelect';

interface Props {
  onCalculate: (info: BirthInfo) => void;
  onLoad: (info: BirthInfo) => void;
  currentInput: BirthInfo | null;
  chart: BaziChart | null;
}

const TAG_OPTIONS = [
  { value: '自用', label: '自用' },
  { value: '客户', label: '客户' },
  { value: '家庭', label: '家庭' },
  { value: '事业', label: '事业' },
  { value: '婚恋', label: '婚恋' },
  { value: '其他', label: '其他' },
];

export const BaziSidePanel: React.FC<Props> = ({ onCalculate, onLoad, currentInput, chart }) => {
  const [archive, setArchive] = useState({
    name: '',
    tag: '自用',
    notes: ''
  });
  const [savedCharts, setSavedCharts] = useState<SavedChart[]>([]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success'>('idle');

  useEffect(() => {
    setSavedCharts(baziStorage.getAll());
  }, []);

  const orderedSavedCharts = useMemo(
    () => [...savedCharts].sort((a, b) => b.updatedAt - a.updatedAt),
    [savedCharts]
  );

  const formatBirthDate = (input: BirthInfo) => {
    const month = String(input.month).padStart(2, '0');
    const day = String(input.day).padStart(2, '0');
    const hour = String(input.hour).padStart(2, '0');
    const minute = String(input.minute).padStart(2, '0');
    return `${input.year}-${month}-${day} ${hour}:${minute}`;
  };

  const handleSave = () => {
    if (!currentInput || !chart) {
      alert('请先进行排盘计算，再保存命盘。');
      return;
    }

    const snapshot = {
      pillars: [chart.yearPillar.gan + chart.yearPillar.zhi, chart.monthPillar.gan + chart.monthPillar.zhi, chart.dayPillar.gan + chart.dayPillar.zhi, chart.hourPillar.gan + chart.hourPillar.zhi],
      tenGods: {
        heavenlyStems: [chart.yearPillar.ganTenGod, chart.monthPillar.ganTenGod, '日主', chart.hourPillar.ganTenGod],
        hiddenStems: [chart.yearPillar.zhiTenGod, chart.monthPillar.zhiTenGod, chart.dayPillar.zhiTenGod, chart.hourPillar.zhiTenGod]
      },
      hiddenStems: [
        chart.yearPillar.hiddenStems,
        chart.monthPillar.hiddenStems,
        chart.dayPillar.hiddenStems,
        chart.hourPillar.hiddenStems
      ],
      naYin: [chart.yearPillar.naYin, chart.monthPillar.naYin, chart.dayPillar.naYin, chart.hourPillar.naYin],
      daYunDirection: chart.daYunDirection,
      daYunStart: chart.daYunStart,
      daYunCycles: chart.daYunList.slice(0, 8).map(dy => ({ stemBranch: dy.ganZhi, age: dy.age, startYear: dy.startYear }))
    };

    baziStorage.save({
      archive,
      input: currentInput,
      snapshot
    });
    
    setSavedCharts(baziStorage.getAll());
    setSaveStatus('success');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleLoadChart = (sc: SavedChart) => {
    setArchive(sc.archive);
    onLoad(sc.input);
  };

  const handleDeleteChart = (id: string) => {
    baziStorage.delete(id);
    setSavedCharts(baziStorage.getAll());
  };

  return (
    <div className={styles.spRightContent}>
      {/* ── 左列：生辰输入 ── */}
      <div className={styles.spInputSection}>
        <div className={styles.spInputCard}>
          <div className={styles.spCardTitle}>生辰排盘</div>
          <BaziInputForm onCalculate={onCalculate} initialInfo={currentInput} />
        </div>
      </div>

      {/* ── 右列：命盘档案 ── */}
      <div className={styles.spArchiveSection}>
        <div className={styles.spArchiveCard}>
          <div className={styles.spCardTitle}>保存命盘</div>
          <div className={styles.spFormGrid}>
            <div className={styles.spFormGroup}>
              <label className={styles.formLabel}>姓名 / 昵称</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="请输入..." 
                value={archive.name}
                onChange={e => setArchive({...archive, name: e.target.value})}
              />
            </div>
            <div className={styles.spFormRow}>
              <div className={styles.spFormGroup}>
                <label className={styles.formLabel}>分类标签</label>
                <BaziSelect 
                  options={TAG_OPTIONS} 
                  value={archive.tag} 
                  onChange={val => setArchive({...archive, tag: String(val)})} 
                />
              </div>
            </div>
            <div className={styles.spFormGroup}>
              <label className={styles.formLabel}>备注</label>
              <textarea 
                className={styles.textarea} 
                rows={2} 
                placeholder="添加备注..."
                value={archive.notes}
                onChange={e => setArchive({...archive, notes: e.target.value})}
              />
            </div>
            <button className={styles.btnSave} onClick={handleSave} disabled={!currentInput || !chart}>
              {saveStatus === 'success' ? '✓ 已保存' : '保存命盘'}
            </button>
          </div>
        </div>

        {/* 已保存列表 */}
        <div className={styles.spListCard}>
          <div className={styles.spCardTitle}>历史命盘</div>
          <div className={styles.savedListScroll}>
            {savedCharts.length === 0 ? (
              <div className={styles.listEmpty}>暂无已保存命盘</div>
            ) : (
              orderedSavedCharts.map(sc => (
                <div key={sc.id} className={styles.savedItem}>
                  <div className={styles.siMain}>
                    <div className={styles.siHeader}>
                      <span className={styles.siName}>{sc.archive.name || '未命名'}</span>
                      <span className={styles.siTag}>{sc.archive.tag}</span>
                    </div>
                    <div className={styles.siMeta}>
                      {formatBirthDate(sc.input)}
                    </div>
                  </div>
                  <div className={styles.siActions}>
                    <button className={styles.siBtnLoad} onClick={() => handleLoadChart(sc)}>载入</button>
                    <button className={styles.siBtnDel} onClick={() => handleDeleteChart(sc.id)}>删除</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
