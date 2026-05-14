import { Solar } from 'lunar-javascript';
import type { BirthInfo, BaziChart, Pillar, DaYunInfo } from './BaziTypes';
import { applyLongitudeOffset } from './solarTimeUtils';

export class BaziAdapter {
  calculateChart(info: BirthInfo): { chart: BaziChart; adjustedInfo: BirthInfo } {
    let activeInfo = { ...info };

    // Apply true solar time (longitude offset) if enabled
    if (info.isTrueSolarTime && info.longitude !== undefined) {
      const adjusted = applyLongitudeOffset(
        info.year,
        info.month,
        info.day,
        info.hour,
        info.minute,
        info.longitude
      );
      activeInfo = {
        ...activeInfo,
        year: adjusted.year,
        month: adjusted.month,
        day: adjusted.day,
        hour: adjusted.hour,
        minute: adjusted.minute
      };
    }

    const solar = Solar.fromYmdHms(
      activeInfo.year,
      activeInfo.month,
      activeInfo.day,
      activeInfo.hour,
      activeInfo.minute,
      0
    );
    const lunar = solar.getLunar();
    const bazi = lunar.getEightChar();
    
    // Set sect to 2 for late Zi hour processing (23:00 - 24:00 is same day earthly branch, next day heavenly stem)
    bazi.setSect(2);

    const yearPillar: Pillar = {
      gan: bazi.getYearGan(),
      zhi: bazi.getYearZhi(),
      ganTenGod: bazi.getYearShiShenGan(),
      zhiTenGod: bazi.getYearShiShenZhi(),
      hiddenStems: bazi.getYearHideGan(),
      naYin: bazi.getYearNaYin(),
    };

    const monthPillar: Pillar = {
      gan: bazi.getMonthGan(),
      zhi: bazi.getMonthZhi(),
      ganTenGod: bazi.getMonthShiShenGan(),
      zhiTenGod: bazi.getMonthShiShenZhi(),
      hiddenStems: bazi.getMonthHideGan(),
      naYin: bazi.getMonthNaYin(),
    };

    const dayPillar: Pillar = {
      gan: bazi.getDayGan(),
      zhi: bazi.getDayZhi(),
      ganTenGod: '日主', // Day master itself
      zhiTenGod: bazi.getDayShiShenZhi(),
      hiddenStems: bazi.getDayHideGan(),
      naYin: bazi.getDayNaYin(),
    };

    const hourPillar: Pillar = {
      gan: bazi.getTimeGan(),
      zhi: bazi.getTimeZhi(),
      ganTenGod: bazi.getTimeShiShenGan(),
      zhiTenGod: bazi.getTimeShiShenZhi(),
      hiddenStems: bazi.getTimeHideGan(),
      naYin: bazi.getTimeNaYin(),
    };

    // Calculate Da Yun
    const yun = bazi.getYun(info.gender);
    const daYunStart = `${yun.getStartYear()}年${yun.getStartMonth()}月${yun.getStartDay()}天后起运`;
    
    const daYunList: DaYunInfo[] = [];
    const yunArr = yun.getDaYun();
    
    // getDaYun() returns all Da Yun blocks. We typically show the first 8 or so.
    // Index 0 is often childhood before real Da Yun starts, index 1 is usually the first 10-year pillar.
    if (yunArr && yunArr.length > 0) {
      // Loop from index 1 to 8 (8 pillars = 80 years)
      for (let i = 1; i < Math.min(9, yunArr.length); i++) {
        const dy = yunArr[i];
        daYunList.push({
          ganZhi: dy.getGanZhi(),
          startYear: dy.getStartYear(),
          age: dy.getStartAge()
        });
      }
    }

    const chart: BaziChart = {
      yearPillar,
      monthPillar,
      dayPillar,
      hourPillar,
      dayMaster: bazi.getDayGan(),
      daYunStart,
      daYunDirection: yun.isForward() ? 'Forward' : 'Backward',
      daYunList,
    };

    return { chart, adjustedInfo: activeInfo };
  }
}

export const baziAdapter = new BaziAdapter();
