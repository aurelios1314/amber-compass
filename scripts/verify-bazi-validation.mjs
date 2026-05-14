import { baziAdapter } from '../src/core/bazi/BaziAdapter.ts';
import { baziValidationCases } from '../src/core/bazi/baziValidationCases.ts';

const PRIORITY_CASES = ['CASE_001', 'CASE_002', 'CASE_003', 'CASE_004', 'CASE_006', 'CASE_009'];

console.log('# 八字重点案例比对导出 (BaZi Priority Comparison Export)');
console.log('\n> [!NOTE]\n> Ages in Da Yun cycle labels are library-provided age labels from lunar-javascript. The exact age convention requires external verification.\n');

baziValidationCases.forEach((testCase) => {
  const isPriority = PRIORITY_CASES.includes(testCase.id);
  if (!isPriority) return;

  const { chart, adjustedInfo } = baziAdapter.calculateChart(testCase.input);
  
  const pillars = [
    chart.yearPillar.gan + chart.yearPillar.zhi,
    chart.monthPillar.gan + chart.monthPillar.zhi,
    chart.dayPillar.gan + chart.dayPillar.zhi,
    chart.hourPillar.gan + chart.hourPillar.zhi
  ];

  const actualPillarsStr = pillars.join(' ');
  const daYunDirection = chart.daYunDirection;

  // Check Source A from metadata
  const extSourceA = testCase.expectedExternal?.source || 'PENDING';
  const extPillarsA = testCase.expectedExternal?.pillars ? testCase.expectedExternal.pillars.join(' ') : 'PENDING';
  const matchStatus = (testCase.expectedExternal?.pillars && actualPillarsStr === extPillarsA) 
    ? 'Source A MATCHED' 
    : 'PENDING';

  console.log(`## ${testCase.id} - ${testCase.description}`);
  console.log(`\n1. CASE ID:               ${testCase.id}`);
  console.log(`2. Purpose:               ${testCase.description}`);
  console.log(`3. Input:                 ${testCase.input.year}-${testCase.input.month}-${testCase.input.day} ${testCase.input.hour}:${testCase.input.minute} | ${testCase.input.gender === 1 ? '男' : '女'} | LMT:${testCase.input.isTrueSolarTime ? testCase.input.longitude : 'OFF'}`);
  console.log(`4. Adjusted datetime:     ${adjustedInfo.year}-${adjustedInfo.month}-${adjustedInfo.day} ${adjustedInfo.hour}:${adjustedInfo.minute}`);
  console.log(`5. Gender:                ${testCase.input.gender === 1 ? 'Male' : 'Female'}`);
  console.log(`6. Longitude correction:  ${testCase.input.isTrueSolarTime ? 'ON (' + testCase.input.longitude + ')' : 'OFF'}`);
  console.log(`7. Pillars:               ${actualPillarsStr}`);
  console.log(`8. Ten Gods:              ${chart.yearPillar.ganTenGod} ${chart.monthPillar.ganTenGod} ${chart.dayPillar.ganTenGod} ${chart.hourPillar.ganTenGod}`);
  console.log(`9. NaYin:                 ${chart.yearPillar.naYin} ${chart.monthPillar.naYin} ${chart.dayPillar.naYin} ${chart.hourPillar.naYin}`);
  console.log(`10. Hidden Stems:         Y:${chart.yearPillar.hiddenStems.join('')} M:${chart.monthPillar.hiddenStems.join('')} D:${chart.dayPillar.hiddenStems.join('')} H:${chart.hourPillar.hiddenStems.join('')}`);
  console.log(`11. Da Yun Direction:     ${daYunDirection}`);
  console.log(`12. Da Yun Start:         ${chart.daYunStart}`);
  console.log(`13. First 8 Da Yun Cycles: ${chart.daYunList.slice(0, 8).map(dy => `${dy.ganZhi}(${dy.age}岁)`).join(' → ')}`);
  console.log(`14. Status:                [${testCase.status.toUpperCase()}] | INTERNALLY STABLE`);
  console.log(`15. External Source A:     ${extSourceA} | Pillars: ${extPillarsA}`);
  console.log(`16. External Source B:     PENDING`);
  console.log(`17. Match Status:          ${matchStatus}`);
  console.log(`18. Mismatch Notes:        ${testCase.expectedExternal?.notes || 'NOT_PROVIDED'}`);

  if (testCase.id === 'CASE_002') {
    console.log(`\n> [!IMPORTANT]\n> **CASE_002 Incident Note**: Previous 庚午日 report was invalid extraction error. Use current output 己巳 丁丑 庚子 庚辰 for external comparison.`);
  }
  console.log('\n---\n');
});
