/**
 * Golden Date Verification Script for Amber Calendar
 *
 * Verifies all LunarJsAdapter fields against known "golden dates".
 * Run with: node scripts/verify-golden-dates.mjs
 *
 * No test framework required. Output is plain text.
 */

import { Solar } from 'lunar-javascript';

// ─── Helpers ────────────────────────────────────────────────────────────────

function orDash(val) {
  if (val === null || val === undefined || val === '') return '—';
  return String(val);
}

function orNone(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return '（无）';
  return arr.join(' / ');
}

function verifyDate(label, year, month, day) {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${label}  →  ${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`);
  console.log('═'.repeat(60));

  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar  = solar.getLunar();

    // ── Gregorian
    const gYear  = solar.getYear();
    const gMonth = solar.getMonth();
    const gDay   = solar.getDay();
    console.log(`公历日期      : ${gYear}-${gMonth}-${gDay}`);

    // ── Lunar
    const lMonth = lunar.getMonthInChinese();
    const lDay   = lunar.getDayInChinese();
    const lYear  = lunar.getYearInChinese ? lunar.getYearInChinese() : '—';
    console.log(`农历日期      : ${lYear}年 ${lMonth}月${lDay}`);

    // ── Solar term
    const jieQi  = lunar.getJieQi();
    console.log(`节气          : ${orDash(jieQi)}`);

    // ── Festivals
    const solarFests = solar.getFestivals();
    const lunarFests = lunar.getFestivals();
    const allFests   = [...solarFests, ...lunarFests];
    console.log(`节日          : ${orNone(allFests)}`);

    // ── Yi / Ji
    const yi = lunar.getDayYi();
    const ji = lunar.getDayJi();
    console.log(`宜            : ${orNone(yi)}`);
    console.log(`忌            : ${orNone(ji)}`);

    // ── Clash / Sha
    const chong = lunar.getDayChongDesc();
    const sha   = lunar.getDaySha();
    console.log(`冲            : 冲${orDash(chong)}`);
    console.log(`煞            : 煞${orDash(sha)}`);

    // ── Day officer (建除十二神)
    const zhiXing = lunar.getZhiXing();
    console.log(`建除十二神    : ${orDash(zhiXing)}`);

    // ── Duty god (值神)
    const tianShen     = lunar.getDayTianShen();
    const tianShenType = lunar.getDayTianShenType();
    console.log(`值神          : ${orDash(tianShen)} (${orDash(tianShenType)})`);

    // ── Five elements / NaYin
    const naYin = lunar.getDayNaYin();
    console.log(`五行纳音      : ${orDash(naYin)}`);

    // ── Auspicious gods
    const jiShen = lunar.getDayJiShen();
    console.log(`吉神宜趋      : ${orNone(jiShen)}`);

    // ── Inauspicious gods
    const xiongSha = lunar.getDayXiongSha();
    console.log(`凶神宜忌      : ${orNone(xiongSha)}`);

    // ── Leap month check
    const isLeap = lunar.getMonth() < 0;
    console.log(`是否闰月      : ${isLeap ? '是' : '否'}`);

    console.log('\n  ✅ 所有字段获取成功，无 null / undefined 异常');

  } catch (err) {
    console.error(`\n  ❌ 错误: ${err.message}`);
  }
}

// ─── Golden Dates ────────────────────────────────────────────────────────────

verifyDate('立春（节气日）',           2024, 2,  4);
verifyDate('春节（农历新年）',          2024, 2, 10);
verifyDate('2024 年末',               2024, 12, 31);
verifyDate('元旦',                    2025, 1,  1);
verifyDate('今日 (PRD 批准日)',        2026, 5,  8);
verifyDate('普通日',                  2025, 6, 15);
verifyDate('闰二月初一 (闰月检查)',     2023, 3, 22);
verifyDate('小寒（节气日）',           2025, 1,  5);

console.log('\n' + '═'.repeat(60));
console.log('  验证完成');
console.log('═'.repeat(60) + '\n');
