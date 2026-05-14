import { Solar } from 'lunar-javascript';

// ── 真太阳时（平太阳时经度修正）简单模拟，如同业务代码中的实现
function applyLongitudeOffset(year, month, day, hour, minute, longitude) {
  const offsetMinutes = Math.round((longitude - 120) * 4);
  const date = new Date(year, month - 1, day, hour, minute);
  date.setMinutes(date.getMinutes() + offsetMinutes);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  };
}

function verifyBazi(label, year, month, day, hour, minute, gender = 1, isTrueSolar = false, longitude = 120) {
  console.log('\n' + '═'.repeat(60));
  console.log(`  [TEST] ${label}`);
  console.log(`  Input  : ${year}-${month}-${day} ${hour}:${minute} (Gender: ${gender === 1 ? 'M' : 'F'})`);
  
  try {
    let activeY = year, activeM = month, activeD = day, activeH = hour, activeMin = minute;
    
    if (isTrueSolar) {
      const adjusted = applyLongitudeOffset(year, month, day, hour, minute, longitude);
      activeY = adjusted.year;
      activeM = adjusted.month;
      activeD = adjusted.day;
      activeH = adjusted.hour;
      activeMin = adjusted.minute;
      console.log(`  TrueSolar: ${activeY}-${activeM}-${activeD} ${activeH}:${activeMin} (Offset for ${longitude}°E)`);
    }

    const solar = Solar.fromYmdHms(activeY, activeM, activeD, activeH, activeMin, 0);
    const lunar = solar.getLunar();
    const baZi = lunar.getEightChar();
    
    // Set sect to 2 for late Zi hour
    baZi.setSect(2);

    console.log(`  四柱    : ${baZi.getYearGan()}${baZi.getYearZhi()} ${baZi.getMonthGan()}${baZi.getMonthZhi()} ${baZi.getDayGan()}${baZi.getDayZhi()} ${baZi.getTimeGan()}${baZi.getTimeZhi()}`);
    console.log(`  地支藏干: ${baZi.getYearHideGan()} | ${baZi.getMonthHideGan()} | ${baZi.getDayHideGan()} | ${baZi.getTimeHideGan()}`);
    console.log(`  天干十神: ${baZi.getYearShiShenGan()} | ${baZi.getMonthShiShenGan()} | 日主 | ${baZi.getTimeShiShenGan()}`);
    console.log(`  地支十神: ${baZi.getYearShiShenZhi()[0]} | ${baZi.getMonthShiShenZhi()[0]} | ${baZi.getDayShiShenZhi()[0]} | ${baZi.getTimeShiShenZhi()[0]}`);
    console.log(`  五行纳音: ${baZi.getYearNaYin()} | ${baZi.getMonthNaYin()} | ${baZi.getDayNaYin()} | ${baZi.getTimeNaYin()}`);

    const yun = baZi.getYun(gender);
    console.log(`  大运起排: ${yun.getStartYear()}年${yun.getStartMonth()}月${yun.getStartDay()}天后起运`);
    
    const yunArr = yun.getDaYun();
    if (yunArr && yunArr.length > 1) {
      console.log(`  首个大运: ${yunArr[1].getGanZhi()} (交运年份: ${yunArr[1].getStartYear()}, 年龄: ${yunArr[1].getStartAge()}岁)`);
    }
  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
  }
}

// ── Cases ────────────────────────────────────────────────────────────────
verifyBazi('Normal birth time', 1990, 5, 15, 14, 30, 1);
verifyBazi('Near Li Chun (2024立春前 16:26)', 2024, 2, 4, 16, 26, 1);
verifyBazi('Near Li Chun (2024立春后 16:28)', 2024, 2, 4, 16, 28, 1);
verifyBazi('Late Zi Hour (23:30)', 1990, 5, 15, 23, 30, 1);
verifyBazi('Early Zi Hour (00:30)', 1990, 5, 16, 0, 30, 1);
verifyBazi('Male Da Yun (阳男顺排)', 1990, 5, 15, 14, 30, 1);
verifyBazi('Female Da Yun (阳女逆排)', 1990, 5, 15, 14, 30, 0);
verifyBazi('True Solar Enabled (110°E -> -40mins)', 1990, 5, 15, 14, 30, 1, true, 110);

