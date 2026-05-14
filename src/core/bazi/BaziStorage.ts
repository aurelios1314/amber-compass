import type { BirthInfo } from './BaziTypes';

export interface SavedChart {
  id: string;
  createdAt: number;
  updatedAt: number;
  archive: {
    name: string;
    tag: string;
    notes: string;
  };
  input: BirthInfo; // Contains year, month, day, hour, minute, gender, isTrueSolarTime, longitude
  snapshot?: {
    pillars: string[];
    tenGods: {
      heavenlyStems: string[];
      hiddenStems: string[][];
    };
    hiddenStems: string[][];
    naYin: string[];
    daYunDirection: string;
    daYunStart: string;
    daYunCycles: { stemBranch: string; age: number; startYear: number }[];
  };
}

const STORAGE_KEY = 'amber-compass:bazi:saved-charts';

export const baziStorage = {
  /**
   * Safely retrieve all charts from localStorage.
   * Handles corrupted data by returning an empty array.
   */
  getAll(): SavedChart[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      return parsed;
    } catch (e) {
      console.error('[BaziStorage] Failed to parse localStorage data. Corrupted data handled.', e);
      return [];
    }
  },

  /**
   * Save a chart to localStorage.
   */
  save(chartData: Omit<SavedChart, 'id' | 'createdAt' | 'updatedAt'>, existingId?: string): SavedChart {
    const charts = this.getAll();
    const now = Date.now();
    
    let updatedChart: SavedChart;

    if (existingId) {
      const index = charts.findIndex(c => c.id === existingId);
      if (index !== -1) {
        updatedChart = {
          ...charts[index],
          ...chartData,
          updatedAt: now
        };
        charts[index] = updatedChart;
      } else {
        updatedChart = {
          ...chartData,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: now,
          updatedAt: now
        };
        charts.push(updatedChart);
      }
    } else {
      updatedChart = {
        ...chartData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: now,
        updatedAt: now
      };
      charts.push(updatedChart);
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
    } catch (e) {
      console.error('[BaziStorage] Failed to save data to localStorage.', e);
    }
    
    return updatedChart;
  },

  /**
   * Delete a chart from localStorage.
   */
  delete(id: string): void {
    const charts = this.getAll().filter(c => c.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
    } catch (e) {
      console.error('[BaziStorage] Failed to delete data from localStorage.', e);
    }
  }
};
