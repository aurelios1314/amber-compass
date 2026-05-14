import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './BaziModule.module.css';

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  width?: string;
}

export const BaziSelect: React.FC<Props> = ({ options, value, onChange, className, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll active item to center when opened
  useEffect(() => {
    if (isOpen && activeItemRef.current && listRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  }, [isOpen]);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div 
      ref={containerRef} 
      className={classNames(styles.customSelectContainer, className)}
      style={{ width: width || '100%' }}
    >
      <div 
        className={classNames(styles.customSelectTrigger, { [styles.active]: isOpen })}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.triggerLabel}>{selectedOption?.label}</span>
        <span className={styles.triggerArrow}>▾</span>
      </div>

      {isOpen && (
        <div ref={listRef} className={styles.customSelectList}>
          {options.map(opt => (
            <div
              key={opt.value}
              ref={opt.value === value ? activeItemRef : null}
              className={classNames(styles.customSelectOption, { [styles.selected]: opt.value === value })}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
