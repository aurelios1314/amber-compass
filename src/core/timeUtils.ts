/**
 * Helper to ensure calculations are anchored to Asia/Shanghai time.
 * Returns the current year, month (1-12), and day in Asia/Shanghai timezone.
 */
export function getTodayInShanghai(): { year: number; month: number; day: number } {
  const nowStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Shanghai" });
  const now = new Date(nowStr);
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate()
  };
}

/**
 * Checks if a given year, month, and day matches today in Asia/Shanghai.
 */
export function isTodayInShanghai(year: number, month: number, day: number): boolean {
  const today = getTodayInShanghai();
  return today.year === year && today.month === month && today.day === day;
}

/**
 * Parses 'YYYY-MM-DD' to an object.
 */
export function parseDateString(dateString: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateString.split('-').map(Number);
  return { year, month, day };
}

/**
 * Formats to 'YYYY-MM-DD' ensuring double digits for month and day.
 */
export function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
