import React, { useState } from 'react';
import type { BirthInfo, Gender } from '@/core/bazi/BaziTypes';
import styles from './BaziModule.module.css';
import { BaziSelect } from './BaziSelect';

interface Props {
  onCalculate: (info: BirthInfo) => void;
  initialInfo?: BirthInfo | null;
}

// Generate ranges for dropdowns as Options
const YEAR_OPTIONS = Array.from({ length: 201 }, (_, i) => ({ value: 1900 + i, label: `${1900 + i} 年` }));
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1} 月` }));
const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => ({ value: i + 1, label: `${i + 1} 日` }));
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => ({ value: i, label: `${String(i).padStart(2, '0')} 时` }));
const MINUTE_OPTIONS = Array.from({ length: 60 }, (_, i) => ({ value: i, label: `${String(i).padStart(2, '0')} 分` }));
const GENDER_OPTIONS = [
  { value: 1, label: '乾造 (男)' },
  { value: 0, label: '坤造 (女)' }
];

export const BaziInputForm: React.FC<Props> = ({ onCalculate, initialInfo }) => {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(5);
  const [day, setDay] = useState<number>(15);
  const [hour, setHour] = useState<number>(14);
  const [minute, setMinute] = useState<number>(30);
  const [gender, setGender] = useState<Gender>(1);
  const [isTrueSolarTime, setIsTrueSolarTime] = useState(false);
  const [longitude, setLongitude] = useState('116');

  React.useEffect(() => {
    if (initialInfo) {
      setYear(initialInfo.year);
      setMonth(initialInfo.month);
      setDay(initialInfo.day);
      setHour(initialInfo.hour);
      setMinute(initialInfo.minute);
      setGender(initialInfo.gender);
      setIsTrueSolarTime(!!initialInfo.isTrueSolarTime);
      if (initialInfo.longitude !== undefined) {
        setLongitude(String(initialInfo.longitude));
      }
    }
  }, [initialInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      year,
      month,
      day,
      hour,
      minute,
      gender,
      isTrueSolarTime,
      longitude: isTrueSolarTime ? parseFloat(longitude) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.spFormGrid}>
        {/* Row 1: Year & Month */}
        <div className={styles.spFormRow}>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>年份</label>
            <BaziSelect options={YEAR_OPTIONS} value={year} onChange={val => setYear(Number(val))} />
          </div>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>月份</label>
            <BaziSelect options={MONTH_OPTIONS} value={month} onChange={val => setMonth(Number(val))} />
          </div>
        </div>
        
        {/* Row 2: Day & Gender */}
        <div className={styles.spFormRow}>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>日期</label>
            <BaziSelect options={DAY_OPTIONS} value={day} onChange={val => setDay(Number(val))} />
          </div>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>性别</label>
            <BaziSelect options={GENDER_OPTIONS} value={gender} onChange={val => setGender(Number(val) as Gender)} />
          </div>
        </div>

        {/* Row 3: Hour & Minute */}
        <div className={styles.spFormRow}>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>出生时</label>
            <BaziSelect options={HOUR_OPTIONS} value={hour} onChange={val => setHour(Number(val))} />
          </div>
          <div className={styles.spFormGroup}>
            <label className={styles.formLabel}>出生分</label>
            <BaziSelect options={MINUTE_OPTIONS} value={minute} onChange={val => setMinute(Number(val))} />
          </div>
        </div>

        {/* Special Correction Area */}
        <div className={styles.spSwitchArea}>
          <label className={styles.switchWrap}>
            <input type="checkbox" checked={isTrueSolarTime} onChange={e => setIsTrueSolarTime(e.target.checked)} />
            按出生地地方时修正
          </label>
          {isTrueSolarTime && (
            <div className={styles.spFormRow}>
              <div className={styles.spFormGroup} style={{ gridColumn: 'span 2' }}>
                <label className={styles.formLabel}>出生经度</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className={styles.input} 
                  value={longitude} 
                  onChange={e => setLongitude(e.target.value)} 
                  min="70" max="140" required 
                />
              </div>
            </div>
          )}
        </div>
        
        <button type="submit" className={styles.btnAction}>开始排盘</button>
      </div>
    </form>
  );
};
