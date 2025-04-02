import moment from 'moment';

/**
 * Determines the CSS class for the text color based on the given score.
 *
 * @param score - A numeric value representing the score.
 *                - If the score is 90 or above, it returns 'text-green-500'.
 *                - If the score is between 50 (inclusive) and 89, it returns 'text-amber-500'.
 *                - If the score is below 50, it returns 'text-red-500'.
 * @returns A string representing the CSS class for the text color.
 */
const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-500';
  if (score >= 50) return 'text-amber-500';
  return 'text-red-500';
};

/**
 * Determines the color associated with a progress value.
 *
 * @param value - The progress value as a percentage (0 to 100).
 * @param inverted - Optional flag to invert the progress value. If `true`, the value is calculated as `100 - value`.
 * @returns A string representing the hex color code:
 * - `#22c55e` (green) for values >= 90.
 * - `#eab308` (yellow) for values >= 75 and < 90.
 * - `#ef4444` (red) for values < 75.
 */
const getProgressColor = (value: number, inverted = false) => {
  if (inverted) {
    value = 100 - value;
  }
  if (value >= 90) return '#22c55e';
  if (value >= 75) return '#eab308';
  return '#ef4444';
};

/**
 * Calculates the grade and corresponding color based on weighted scores for performance,
 * accessibility, best practices, and SEO.
 *
 * @param performance - The performance score (0-100), weighted at 50%.
 * @param accessibility - The accessibility score (0-100), weighted at 20%.
 * @param bestPractices - The best practices score (0-100), weighted at 15%.
 * @param seo - The SEO score (0-100), weighted at 15%.
 * @returns An object containing:
 *   - `grade`: The letter grade (e.g., 'A+', 'B-', 'F').
 *   - `color`: The corresponding Tailwind CSS text color class for the grade.
 */
const calculateGrade = (performance: number, accessibility: number, bestPractices: number, seo: number) => {
  const weightedScore = performance * 0.4 + accessibility * 0.2 + bestPractices * 0.2 + seo * 0.2;

  if (weightedScore >= 97) return { grade: 'A+', color: 'text-green-600' };
  if (weightedScore >= 93) return { grade: 'A', color: 'text-green-600' };
  if (weightedScore >= 90) return { grade: 'A-', color: 'text-green-600' };
  if (weightedScore >= 87) return { grade: 'B+', color: 'text-green-500' };
  if (weightedScore >= 83) return { grade: 'B', color: 'text-green-500' };
  if (weightedScore >= 80) return { grade: 'B-', color: 'text-green-500' };
  if (weightedScore >= 77) return { grade: 'C+', color: 'text-amber-500' };
  if (weightedScore >= 73) return { grade: 'C', color: 'text-amber-500' };
  if (weightedScore >= 70) return { grade: 'C-', color: 'text-amber-500' };
  if (weightedScore >= 67) return { grade: 'D+', color: 'text-amber-600' };
  if (weightedScore >= 63) return { grade: 'D', color: 'text-amber-600' };
  if (weightedScore >= 60) return { grade: 'D-', color: 'text-amber-600' };
  return { grade: 'F', color: 'text-red-600' };
};

/**
 * Formats a given time in milliseconds into a string representation in seconds with one decimal place.
 *
 * @param ms - The time in milliseconds to be formatted.
 * @returns A string representing the time in seconds, suffixed with 's'.
 */
const formatTime = (ms: number) => {
  return (ms / 1000).toFixed(1) + 's';
};

/**
 * Transforms a heartbeat object into a structured format containing performance metrics,
 * accessibility scores, best practices, SEO grades, and various timing metrics.
 *
 * @param hb - The raw heartbeat object containing grades and Core Web Vitals (CWV) data.
 * @returns An object with the following structure:
 * - `performance`: The performance grade from the heartbeat.
 * - `accessibility`: The accessibility grade from the heartbeat.
 * - `bestPractices`: The best practices grade from the heartbeat.
 * - `seo`: The SEO grade from the heartbeat.
 * - `timings`: An object containing various timing metrics:
 *   - `TTFB`: Time to First Byte.
 *   - `FCP`: First Contentful Paint.
 *   - `DCL`: DOM Content Loaded.
 *   - `LCP`: Largest Contentful Paint.
 *   - `TTI`: Time to Interactive.
 *   - `SI`: Speed Index.
 *   - `CLS`: Cumulative Layout Shift, parsed as a float.
 *   - `TBT`: Total Blocking Time.
 */
const transformHeartbeat = (hb: any) => ({
  performance: hb.grades.performance,
  accessibility: hb.grades.accessibility,
  bestPractices: hb.grades.best_practices,
  seo: hb.grades.seo,
  timings: {
    TTFB: hb.cwv.ttfb,
    FCP: hb.cwv.fcp,
    DCL: hb.cwv.dcl,
    LCP: hb.cwv.lcp,
    TTI: hb.cwv.tti,
    SI: hb.cwv.si,
    CLS: parseFloat(hb.cwv.cls),
    TBT: hb.cwv.tbt,
  },
  platform: hb.platform,
  id: hb.id,
  grades: hb.grades,
  slug: hb.slug,
});

/**
 * Formats a given Date object into a localized date string.
 *
 * @param value - The Date object to be formatted.
 * @returns A string representing the formatted date in the localized format.
 */
const dateFormatter = (value: Date) => {
  return moment(value).format('L');
};

/**
 * Formats a given Date object into a localized string representation.
 *
 * @param value - The Date object to be formatted.
 * @returns A string representing the formatted date and time in a localized format.
 */
const labelFormatter = (value: Date) => {
  return moment(value).format('LLL');
};
export { calculateGrade, dateFormatter, formatTime, getProgressColor, getScoreColor, labelFormatter, transformHeartbeat };
