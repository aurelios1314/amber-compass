import { Solar, Lunar } from 'lunar-javascript';

// Helper to create Solar object forced to Asia/Shanghai time
// Note: lunar-javascript calculates based on the date parts we pass to Solar.fromYmd()
// Since we pass Y, M, D directly, we are effectively setting the "local" date
// For today in Asia/Shanghai, we get the current YMD in that timezone.

const testDates = [
  { year: 2024, month: 2, day: 10, note: "Spring Festival" },
  { year: 2024, month: 2, day: 4, note: "LiChun (Solar Term)" },
  { year: 2024, month: 12, day: 31, note: "End of year" },
  { year: 2025, month: 1, day: 1, note: "New Year's Day" }
];

// Add today in Asia/Shanghai
const nowStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
const now = new Date(nowStr);
testDates.push({
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  day: now.getDate(),
  note: "Today in Asia/Shanghai"
});

console.log("=== lunar-javascript Verification ===\n");

for (const td of testDates) {
  const solar = Solar.fromYmd(td.year, td.month, td.day);
  const lunar = solar.getLunar();

  console.log(`[Date]: ${solar.toYmd()} - ${td.note}`);
  console.log(`- Gregorian: ${solar.getYear()}-${solar.getMonth()}-${solar.getDay()}`);
  console.log(`- Lunar: ${lunar.getYearInChinese()}年 ${lunar.getMonthInChinese()}月 ${lunar.getDayInChinese()}`);
  
  const jieQi = lunar.getJieQi();
  console.log(`- Solar Terms: ${jieQi || "None"}`);
  
  const solarFestivals = solar.getFestivals();
  const lunarFestivals = lunar.getFestivals();
  const allFestivals = [...solarFestivals, ...lunarFestivals];
  console.log(`- Festivals: ${allFestivals.length > 0 ? allFestivals.join(', ') : "None"}`);
  
  console.log(`- Suitable (宜): ${lunar.getDayYi().join(', ')}`);
  console.log(`- Unsuitable (忌): ${lunar.getDayJi().join(', ')}`);
  
  console.log(`- Clash (冲): 冲${lunar.getDayChongDesc()}`);
  console.log(`- Sha (煞): 煞${lunar.getDaySha()}`);
  
  console.log(`- Auspicious Gods (吉神): ${lunar.getDayJiShen().join(', ')}`);
  console.log(`- Inauspicious Gods (凶神): ${lunar.getDayXiongSha().join(', ')}`);
  
  console.log(`- Five Elements (纳音五行): ${lunar.getDayNaYin()}`);
  console.log(`- Duty God (值神/十二黄黑道): ${lunar.getDayTianShen()} (${lunar.getDayTianShenType()})`);
  console.log(`- Day Officer (建除十二神): ${lunar.getZhiXing()}`);
  
  console.log("--------------------------------------------------\n");
}
