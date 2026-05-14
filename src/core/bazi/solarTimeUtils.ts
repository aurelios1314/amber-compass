/**
 * 经度转真太阳时算法
 * 
 * 中国标准时间（北京时间）是基于 120°E。
 * 真太阳时需要根据当地经度与 120°E 的差值进行修正：
 * 每相差 1°，时间相差 4 分钟。
 * 经度 < 120°E，时间减去差值；经度 > 120°E，时间加上差值。
 *
 * 更严谨的真太阳时还应包含“均时差”（Equation of Time），
 * 但在此作为轻量级 MVP，我们仅提供基于经度的平太阳时（Local Mean Time）修正。
 */

export function applyLongitudeOffset(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  longitude: number
): { year: number; month: number; day: number; hour: number; minute: number; offsetMinutes: number } {
  // 1. Calculate base difference from 120°E in minutes
  // 1 degree = 4 minutes
  const offsetMinutes = Math.round((longitude - 120) * 4);

  // 2. Apply to date
  const date = new Date(year, month - 1, day, hour, minute);
  date.setMinutes(date.getMinutes() + offsetMinutes);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    offsetMinutes
  };
}
