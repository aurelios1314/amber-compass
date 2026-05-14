# Phase 1 MVP Implementation Plan: Calendar & Chinese Almanac

## 1. Product Vision & Understanding
A modern, clean, and professional Web application combining a standard calendar with traditional Chinese almanac (Huangli) information. The goal is to break the stereotype of cluttered, outdated fortune-telling websites by providing a premium, minimalist user experience. Phase 1 focuses exclusively on the Calendar and Almanac features, laying the architectural groundwork for future Four Pillars (BaZi) integration.

## 2. Phase 1 MVP Acceptance Criteria

### User Capabilities
*   Open the page to see the current month's calendar grid.
*   Navigate between months using "Previous/Next" controls.
*   View Gregorian dates, Lunar dates, and key solar terms/festivals directly on the calendar grid.
*   Click on any day in the grid to reveal a detailed panel with comprehensive Huangli (Almanac) information for that specific date.

### Must-Have Features
*   Accurate Gregorian calendar grid rendering (handling leap years, month lengths, start days).
*   Accurate Lunar and Huangli data mapping.
*   **Adapter Layer Design:** Strict isolation between UI components and the underlying calculation library.
*   **Timezone Enforcement:** All calculations must be strictly anchored to `Asia/Shanghai` (UTC+8) to ensure Lunar dates are calculated correctly regardless of the user's local timezone.

### Out of Scope for MVP
*   Four Pillars / BaZi calculation (reserved for Phase 2).
*   Yearly/Weekly views.
*   Complex animation systems (e.g., Framer Motion).
*   Theming (beyond standard light/dark modes).
*   Backend, user accounts, or payments.

### Supported Date Range
*   **1901 - 2099**: Ensuring maximum accuracy based on standard astronomical algorithms used by the library.

## 3. Technology Stack

*   **Framework:** React + Vite (Fast, lightweight, excellent for MVP SPA).
*   **Language:** TypeScript (Essential for managing complex Almanac data structures).
*   **State Management:** React Context (Sufficient for MVP state: `selectedDate` and `currentViewMonth`).
*   **Styling:** CSS Modules (Adheres to the "Vanilla CSS" requirement while providing local scoping to prevent class name collisions).
*   **Animations:** Native CSS Transitions (Keeps the project lightweight).
*   **Icons:** Lucide React.

## 4. Data Source & Algorithm (`lunar-javascript`)

We will use the highly reliable, zero-dependency `lunar-javascript` library by 6tail. It calculates all data locally without API calls.

| Business Field | `lunar-javascript` Mapping | Reliability |
| :--- | :--- | :--- |
| **Gregorian Date** | `Solar`: `.getYear()`, `.getMonth()`, `.getDay()` | 100% |
| **Lunar Date** | `Lunar`: `.getMonthInChinese()`, `.getDayInChinese()` | 100% |
| **Solar Terms** | `Lunar.getJieQi()` | 100% (Returns empty string if none) |
| **Festivals** | `Solar.getFestivals()`, `Lunar.getFestivals()` | 100% |
| **宜 (Suit)** | `Lunar.getDayYi()` | 100% (Returns string array) |
| **忌 (Avoid)** | `Lunar.getDayJi()` | 100% (Returns string array) |
| **冲煞 (Clash/Sha)** | `Lunar.getDayChongDesc()` + `Lunar.getDaySha()` | 100% |
| **吉神 (Auspicious)** | `Lunar.getDayJiShen()` | 100% (Returns string array) |
| **凶神 (Inauspicious)**| `Lunar.getDayXiongShen()` | 100% (Returns string array) |
| **五行 (Five Elements)**| `Lunar.getDayNaYin()` | 100% |
| **值神 (Duty God)** | `Lunar.getDayTianShen()` | 100% |
| **建除十二神 (Day Officer)**| `Lunar.getZhiXing()` | 100% |

## 5. Core TypeScript Data Structures

These structures will be defined independently of the calculation library.

```typescript
// src/core/types.ts

export interface LunarInfo {
  month: string;          // e.g., "正月"
  day: string;            // e.g., "初一"
  term: string | null;    // e.g., "立春", null if none
  festival: string | null;// e.g., "春节", null if none
}

export interface CalendarDay {
  year: number;
  month: number;
  day: number;
  dateString: string;     // e.g., "2024-02-10"
  isCurrentMonth: boolean;
  isToday: boolean;
  lunar: LunarInfo;
}

export interface CalendarMonth {
  year: number;
  month: number;
  days: CalendarDay[];    // Typically 35 or 42 days to complete weeks
}

export interface AlmanacSection {
  title: string;
  items: string[];
}

export interface AlmanacDay {
  date: CalendarDay;
  suit: string[];
  avoid: string[];
  clash: string;
  sha: string;
  auspiciousGods: string[];
  inauspiciousGods: string[];
  fiveElements: string;
  dutyGod: string;
  dayOfficer: string;
}
```

## 6. Architecture & File Structure

The architecture enforces the **Adapter Pattern** to ensure UI components do not directly import `lunar-javascript`.

```text
src/
├── core/                        # Core Domain & Adapters
│   ├── types.ts                 # Core Data Structures
│   ├── IAlmanacProvider.ts      # Interface Definition
│   ├── LunarJsAdapter.ts        # Implementation wrapping lunar-javascript
│   └── timeUtils.ts             # Timezone (Asia/Shanghai) helpers
├── ui/                          # UI Layer
│   ├── contexts/
│   │   └── CalendarContext.tsx  # Global state (selectedDate, currentMonth)
│   ├── components/
│   │   ├── calendar/            
│   │   │   ├── CalendarGrid.tsx 
│   │   │   ├── CalendarDayCell.tsx 
│   │   │   └── CalendarHeader.tsx  
│   │   ├── almanac/             
│   │   │   ├── AlmanacPanel.tsx 
│   │   │   └── AlmanacList.tsx  
│   │   └── layout/
│   │       └── MainLayout.tsx   
│   ├── styles/
│   │   ├── global.css           # CSS Variables & Resets
│   │   └── **/*.module.css      # CSS Modules for components
│   ├── App.tsx                  
│   └── main.tsx                 
```

## 7. Execution Plan (Walking Skeleton)

1.  **Project Initialization:** Scaffold Vite + React + TS. Clean up defaults. Configure path aliases (`@/`).
2.  **Domain & Adapter Setup:** Implement `types.ts`, `timeUtils.ts` (UTC+8 enforcement), and `LunarJsAdapter.ts`.
3.  **Global State:** Create `CalendarContext.tsx`.
4.  **UI Foundation:** Setup `global.css` for design tokens (colors, typography). Build `MainLayout`.
5.  **Calendar Core:** Implement `CalendarHeader`, `CalendarGrid`, and `CalendarDayCell`. Wire up month navigation.
6.  **Almanac Integration:** Implement `AlmanacPanel` to react to `selectedDate` and display `AlmanacDay` data.
7.  **Review & Polish:** Validate timezone handling and ensure clean UI formatting.

## 8. Risks and Limitations
*   **Information Overload:** Almanac data is dense. The primary UI challenge is presenting it cleanly without clutter.
*   **Timezone Edge Cases:** Lunar dates depend heavily on timezone. We must meticulously normalize all dates to `Asia/Shanghai` before querying the library to prevent off-by-one errors depending on the client's location.
*   **Historical Accuracy:** While accurate for modern times (1901-2099), calculations for ancient dates may drift due to historical calendar reforms. This is acceptable for our MVP scope.
