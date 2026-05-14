import { Solar, Lunar } from 'lunar-javascript';

function investigateBazi(label, year, month, day, hour, minute, gender = 1) {
  console.log('\n' + '═'.repeat(60));
  console.log(`  ${label} → ${year}-${month}-${day} ${hour}:${minute} (Gender: ${gender === 1 ? 'M' : 'F'})`);
  
  try {
    const solar = Solar.fromYmdHms(year, month, day, hour, minute, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();
    
    baZi.setSect(2); // Set sect to 2 for晚子时 (late Zi hour) processing if available in the library

    const yGan = baZi.getYearGan();
    const yZhi = baZi.getYearZhi();
    const mGan = baZi.getMonthGan();
    const mZhi = baZi.getMonthZhi();
    const dGan = baZi.getDayGan();
    const dZhi = baZi.getDayZhi();
    const tGan = baZi.getTimeGan();
    const tZhi = baZi.getTimeZhi();
    
    console.log(`  四柱: ${yGan}${yZhi} ${mGan}${mZhi} ${dGan}${dZhi} ${tGan}${tZhi}`);
    
    // Check NaYin
    console.log(`  纳音: ${baZi.getYearNaYin()} ${baZi.getMonthNaYin()} ${baZi.getDayNaYin()} ${baZi.getTimeNaYin()}`);
    
    // Check Ten Gods (Shi Shen)
    console.log(`  天干十神: ${baZi.getYearShiShenGan()} ${baZi.getMonthShiShenGan()} 日主 ${baZi.getTimeShiShenGan()}`);
    console.log(`  地支十神: ${baZi.getYearShiShenZhi()[0]} ${baZi.getMonthShiShenZhi()[0]} ${baZi.getDayShiShenZhi()[0]} ${baZi.getTimeShiShenZhi()[0]}`);
    
    // Check Hidden Stems (Cang Gan)
    console.log(`  地支藏干: ${baZi.getYearHideGan()} | ${baZi.getMonthHideGan()} | ${baZi.getDayHideGan()} | ${baZi.getTimeHideGan()}`);
    
    // Da Yun
    const yun = baZi.getYun(gender); // 1 = Male, 0 = Female
    console.log(`  大运起排: ${yun.getStartYear()}年${yun.getStartMonth()}月${yun.getStartDay()}天后起运`);
    
    const daYunArr = yun.getDaYun();
    if (daYunArr && daYunArr.length > 0) {
      console.log(`  首个大运: ${daYunArr[1].getGanZhi()} (交运年份: ${daYunArr[1].getStartYear()})`);
    }

  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
}

// Tests
investigateBazi('Normal birth date', 1990, 5, 15, 14, 30, 1);
investigateBazi('Near Li Chun (Before)', 2024, 2, 4, 16, 26, 1); // 2024 立春是 16:26:53
investigateBazi('Near Li Chun (After)', 2024, 2, 4, 16, 28, 1);
investigateBazi('Early Zi Hour (00:30)', 1990, 5, 15, 0, 30, 1);
investigateBazi('Late Zi Hour (23:30)', 1990, 5, 15, 23, 30, 1);
investigateBazi('Gender Check (Female)', 1990, 5, 15, 14, 30, 0);

