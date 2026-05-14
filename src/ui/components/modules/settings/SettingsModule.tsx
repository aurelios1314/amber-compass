import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import styles from './SettingsModule.module.css';

const SECTIONS = [
  { id: 'source', label: '数据来源' },
  { id: 'huangli', label: '黄历计算说明' },
  { id: 'bazi', label: '四柱八字计算说明' },
  { id: 'validation', label: '外部校验记录' },
  { id: 'advanced', label: '高级规则与未来选项' },
  { id: 'privacy', label: '本地数据与隐私' },
];

export const SettingsModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState('source');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6,
        rootMargin: '0px 0px -40% 0px'
      }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.panel}>
      {/* ── 左侧：设置内容区 ── */}
      <div ref={scrollContainerRef} className={styles.left}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>设置</h1>
            <p className={styles.subtitle}>数据来源、算法边界、校验记录与本地数据说明</p>
          </header>

          {/* 数据来源 */}
          <section id="source" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>数据来源</h2>
            </div>
            <div className={styles.card}>
              <p>Amber Compass 遵循“本地优先”原则，核心计算逻辑完全运行于浏览器端。</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>计算引擎：</span>基于开源天文历算库 lunar-javascript，支持高精度星历推算。</li>
                <li><span className={styles.strong}>无后端依赖：</span>所有排盘逻辑均在本地完成，无需调用外部服务器接口。</li>
                <li><span className={styles.strong}>稳定性：</span>离线环境下（若已加载页面）仍可进行基础历法计算。</li>
              </ul>
            </div>
          </section>

          {/* 黄历计算说明 */}
          <section id="huangli" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>黄历计算说明</h2>
            </div>
            <div className={styles.card}>
              <p>包含高精度的历法转换及传统民俗字段参考：</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>核心：</span>公农历转换、二十四节气（精确到分）、传统节日。</li>
                <li><span className={styles.strong}>民俗：</span>宜忌、冲煞、建除十二值、六曜、值神、吉神方位。</li>
                <li><span className={styles.strong}>声明：</span>黄历流派众多，Amber Compass 输出内容仅供文化研究参考。</li>
              </ul>
            </div>
          </section>

          {/* 四柱八字计算说明 */}
          <section id="bazi" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>四柱八字计算说明</h2>
            </div>
            <div className={styles.card}>
              <p>提供基于传统节气交接标准的结构化干支模型：</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>交接：</span>以节气切换月份，以立春切换年份。</li>
                <li><span className={styles.strong}>子时：</span>采用跨日支机制。晚子时（23-24点）按当日地支、次日天干排盘。</li>
                <li><span className={styles.strong}>时差：</span>支持基于经度的地方时修正（LMT）。</li>
                <li><span className={styles.strong}>限度：</span>当前经度修正未包含均时差（EOT），非严谨真太阳时。</li>
                <li><span className={styles.strong}>定位：</span>仅展示十神、藏干等模型结构，谢绝输出命运断语。</li>
              </ul>
            </div>
          </section>

          {/* 外部校验记录 */}
          <section id="validation" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>外部校验记录</h2>
            </div>
            <div className={styles.card}>
              <p>核心算法已与主流专业排盘平台进行横向比对验证：</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>比对对象：</span>易百查、易运盘等。</li>
                <li><span className={styles.strong}>确认范围：</span>节气切换点、早晚子时逻辑、起运年龄及大运序列。</li>
                <li><span className={styles.strong}>结论：</span>已通过 selected cases 一致性校验。详情参阅项目 docs。</li>
              </ul>
            </div>
          </section>

          {/* 高级规则与未来选项 */}
          <section id="advanced" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>高级规则与未来选项</h2>
            </div>
            <div className={styles.card}>
              <p>以下功能目前处于调研或受限开启阶段，不干扰基础操作：</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>完整真太阳时：</span>计划引入均时差算法以实现秒级时刻修正。</li>
                <li><span className={styles.strong}>可视化层：</span>干支流通可视化层作为专业选项，未来将在设置中提供开关。</li>
                <li><span className={styles.strong}>算法切换：</span>未来计划支持不同流派的子时及起运计算规则。</li>
              </ul>
            </div>
          </section>

          {/* 本地数据与隐私 */}
          <section id="privacy" className={styles.section}>
            <div className={styles.secHeader}>
              <h2 className={styles.secTitle}>本地数据与隐私</h2>
            </div>
            <div className={styles.card}>
              <p>所有数据操作均在您的本地设备上完成，不涉及云端同步：</p>
              <ul className={styles.list}>
                <li><span className={styles.strong}>存储：</span>命盘档案存储于浏览器的 localStorage 中。</li>
                <li><span className={styles.strong}>Key：</span>amber-compass:bazi:saved-charts</li>
                <li><span className={styles.strong}>提示：</span>清除浏览器缓存或更换设备将导致本地保存的命盘丢失。</li>
                <li><span className={styles.strong}>无追踪：</span>应用不包含任何第三方追踪器，您的隐私属于您自己。</li>
              </ul>
            </div>
          </section>
        </div>
      </div>

      {/* ── 右侧：目录导航 ── */}
      <div className={styles.right}>
        <div className={styles.navTitle}>目录导航</div>
        <nav className={styles.navList}>
          {SECTIONS.map(({ id, label }) => (
            <a 
              key={id}
              className={classNames(styles.navItem, { [styles.navItemActive]: activeSection === id })}
              onClick={() => scrollToSection(id)}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
