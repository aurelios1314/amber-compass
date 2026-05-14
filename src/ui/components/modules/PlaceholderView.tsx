import React from 'react';
import styles from './PlaceholderView.module.css';

interface Props {
  title: string;
  description: string;
  planned: string[];
  note?: string;
}

export const PlaceholderView: React.FC<Props> = ({ title, description, planned, note }) => {
  return (
    <div className={styles.wrap} aria-label={`${title}等待启用`}>
      <div className={styles.structure} aria-hidden="true">
        <div className={styles.rings}>
          <span className={styles.ringOuter} />
          <span className={styles.ringInner} />
          <span className={styles.locator} />
        </div>
        <div className={styles.dotGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className={styles.lines}>
          <span />
          <span />
          <span />
        </div>
      </div>

      <section className={styles.panel}>
        <div className={styles.status}>待启用</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{description}</p>

        {planned.length > 0 && (
          <div className={styles.scope}>
            <div className={styles.scopeTitle}>后续范围</div>
            <div className={styles.scopeList}>
              {planned.map((p, i) => (
                <div key={i} className={styles.scopeItem}>{p}</div>
              ))}
            </div>
          </div>
        )}

        {note && <div className={styles.note}>{note}</div>}
      </section>
    </div>
  );
};
