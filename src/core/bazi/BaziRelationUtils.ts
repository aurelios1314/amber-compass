/**
 * BaZi Relationship Utility v1
 * Focused on structural relationships only (Stem Combinations, Branch Combinations/Clashes)
 * No fortune-telling or strength scoring in this layer.
 */

export interface RelationHint {
  from: 'year' | 'month' | 'day' | 'hour';
  to: 'year' | 'month' | 'day' | 'hour';
  type: string; // e.g., "合", "冲", "生", "克"
  label: string; // e.g., "甲己合", "子午冲"
  level: 'stem' | 'branch';
}

const STEM_5_COMBOS: Record<string, string> = {
  '甲己': '合', '己甲': '合',
  '乙庚': '合', '庚乙': '合',
  '丙辛': '合', '辛丙': '合',
  '丁壬': '合', '壬丁': '合',
  '戊癸': '合', '癸戊': '合',
};

const BRANCH_6_COMBOS: Record<string, string> = {
  '子丑': '合', '丑子': '合',
  '寅亥': '合', '亥寅': '合',
  '卯戌': '合', '戌卯': '合',
  '辰酉': '合', '酉辰': '合',
  '巳申': '合', '申巳': '合',
  '午未': '合', '未午': '合',
};

const BRANCH_6_CLASHES: Record<string, string> = {
  '子午': '冲', '午子': '冲',
  '丑未': '冲', '未丑': '冲',
  '寅申': '冲', '申寅': '冲',
  '卯酉': '冲', '酉卯': '冲',
  '辰戌': '冲', '戌辰': '冲',
  '巳亥': '冲', '亥巳': '冲',
};

// Simplified Creation/Destruction for Stems
const STEM_ELEMENTS: Record<string, string> = {
  '甲': 'mu', '乙': 'mu',
  '丙': 'huo', '丁': 'huo',
  '戊': 'tu', '己': 'tu',
  '庚': 'jin', '辛': 'jin',
  '壬': 'shui', '癸': 'shui',
};

const ELEMENT_RELATIONS: Record<string, { sheng: string; ke: string }> = {
  'mu': { sheng: 'huo', ke: 'tu' },
  'huo': { sheng: 'tu', ke: 'jin' },
  'tu': { sheng: 'jin', ke: 'shui' },
  'jin': { sheng: 'shui', ke: 'mu' },
  'shui': { sheng: 'mu', ke: 'huo' },
};

export function getBaziRelations(chart: any): RelationHint[] {
  const hints: RelationHint[] = [];
  const pillars = [
    { id: 'year', gan: chart.yearPillar.gan, zhi: chart.yearPillar.zhi },
    { id: 'month', gan: chart.monthPillar.gan, zhi: chart.monthPillar.zhi },
    { id: 'day', gan: chart.dayPillar.gan, zhi: chart.dayPillar.zhi },
    { id: 'hour', gan: chart.hourPillar.gan, zhi: chart.hourPillar.zhi },
  ];

  // 1. Stem Relations (Combinations and Adjacent Creation/Destruction)
  for (let i = 0; i < pillars.length; i++) {
    for (let j = i + 1; j < pillars.length; j++) {
      const p1 = pillars[i];
      const p2 = pillars[j];
      const key = p1.gan + p2.gan;

      // Combinations
      if (STEM_5_COMBOS[key]) {
        hints.push({ from: p1.id as any, to: p2.id as any, type: '合', label: `${key}合`, level: 'stem' });
      }

      // Adjacent Creation/Destruction (only for neighbors to avoid clutter)
      if (j === i + 1) {
        const e1 = STEM_ELEMENTS[p1.gan];
        const e2 = STEM_ELEMENTS[p2.gan];
        if (ELEMENT_RELATIONS[e1].sheng === e2) {
          hints.push({ from: p1.id as any, to: p2.id as any, type: '生', label: '生', level: 'stem' });
        } else if (ELEMENT_RELATIONS[e1].ke === e2) {
          hints.push({ from: p1.id as any, to: p2.id as any, type: '克', label: '克', level: 'stem' });
        }
      }
    }
  }

  // 2. Branch Relations (6-Combos and 6-Clashes)
  for (let i = 0; i < pillars.length; i++) {
    for (let j = i + 1; j < pillars.length; j++) {
      const p1 = pillars[i];
      const p2 = pillars[j];
      const key = p1.zhi + p2.zhi;

      if (BRANCH_6_COMBOS[key]) {
        hints.push({ from: p1.id as any, to: p2.id as any, type: '合', label: `${key}合`, level: 'branch' });
      }
      if (BRANCH_6_CLASHES[key]) {
        hints.push({ from: p1.id as any, to: p2.id as any, type: '冲', label: `${key}冲`, level: 'branch' });
      }
    }
  }

  // 3. Branch 3-He and 3-Hui (simplified detection for v1)
  const SAN_HE = ['申子辰', '亥卯未', '寅午戌', '巳酉丑'];
  const SAN_HUI = ['亥子丑', '寅卯辰', '巳午未', '申酉戌'];

  // This is a simplified checker: if 3 zhi of a 3-He exist in the 4 pillars, mark them.
  // In a real chart, they need to be complete. For v1, we only mark if 3 are present.
  [...SAN_HE, ...SAN_HUI].forEach(group => {
    const found = pillars.filter(p => group.includes(p.zhi));
    if (found.length >= 3) {
      // Create hints between the elements of the group
      hints.push({ from: found[0].id as any, to: found[2].id as any, type: '合', label: group, level: 'branch' });
    }
  });

  return hints;
}
