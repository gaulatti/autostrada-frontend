import type { JSX } from 'react';
import { NavLink } from 'react-router';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, YAxis } from 'recharts';
import { getProgressColor, type PerformanceData } from '~/utils/dashboards';

/**
 * A React component that renders a performance summary for a given URL.
 * It displays the URL, its average performance score, a line chart of grades,
 * and the variation percentage. The component uses a `NavLink` to navigate
 * to a detailed view of the URL's performance.
 *
 * @param {Object} props - The component props.
 * @param {PerformanceData} props.url - The performance data for the URL.
 * @param {string} props.url.url - The URL string.
 * @param {string} props.url.slug - A unique slug identifier for the URL.
 * @param {number} props.url.average - The average performance score of the URL.
 * @param {number} props.url.variation - The variation percentage of the performance score.
 * @param {number[]} props.url.grades - An array of performance grades over time.
 *
 * @returns {JSX.Element} A JSX element displaying the URL's performance summary.
 */
const UrlPerformance = ({ url }: { url: PerformanceData }): JSX.Element => {
  return (
    <NavLink to={`/urls/${url.slug}`} key={url.slug} className='flex items-center justify-between h-[50px]'>
      <div className='flex-1'>
        <div className='flex items-center justify-between mb-1'>
          <span className='text-sm font-medium truncate' title={url.url}>
            {url.url}
          </span>
          <span className='text-sm font-bold' style={{ color: getProgressColor(url.average!) }}>
            {url.average}
          </span>
        </div>
        <div className='flex items-center'>
          <div className='w-full h-8'>
            <ResponsiveContainer className='w-full' height={30}>
              <LineChart data={url.grades!.map((value, i) => ({ value, index: i }))}>
                <CartesianGrid />
                <Line type='monotone' dataKey='value' stroke={getProgressColor(url.average!)} strokeWidth={2} dot={false} />
                <YAxis domain={[url.average! - url.variation!, url.average! + url.variation!]} hide />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className='ml-2 text-xs text-muted-foreground'>±{url.variation}%</div>
        </div>
      </div>
    </NavLink>
  );
};

export { UrlPerformance };
