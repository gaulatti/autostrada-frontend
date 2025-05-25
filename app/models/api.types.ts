
/**
 * Type definitions for API responses related to URL stats and performance data.
 * These types are used for the /stats and /datapoints endpoints.
 */

/**
 * Represents stability data for a specific URL
 */
export interface StabilityData {
  url?: string;
  slug: string;
  average?: number;
  grades?: number[];
  variation?: number;
}

/**
 * Represents the difference in performance between desktop and mobile platforms
 */
export interface PlatformDifference {
  url?: string;
  name: string;
  slug: string;
  desktopAverage: number;
  mobileAverage: number;
  difference: number;
}

/**
 * Represents performance data for a specific time of day
 */
export interface TimeOfDayEntry {
  timeDecimal: number;
  performance: number;
  slug: string;
  date: string;
  hour: string;
}

/**
 * Represents historical performance data
 */
export interface HistoryEntry {
  date: string;
  lcp: number;
}

/**
 * Represents a performance data point from the /datapoints endpoint
 */
export interface PerformanceDataPoint {
  date: string; 
  hour: string; 
  timeDecimal: number; 
  performance: number;
}

/**
 * Represents pulse data returned by the API
 */
export interface PulseData {
  slug: string;
  playlist_slug: string;
  url: { slug: string; url: string };
  createdAt: string;
  updatedAt: string;
}

/**
 * Complete URL statistics response from the /stats endpoint
 */
export interface UrlStats {
  url: string;
  totalPulses: number;
  averagePerformance: number;
  urlsMonitored: number;
  lastPulse: string;
  stability: { 
    mobile: StabilityData[]; 
    desktop: StabilityData[]; 
    differences: PlatformDifference[] 
  };
  timeOfDay: { 
    mobile: TimeOfDayEntry[]; 
    desktop: TimeOfDayEntry[] 
  };
  grades: { metric: string; value: number }[];
  history: HistoryEntry[];
  pulses?: {
    rows: PulseData[];
    count: number;
  };
}
