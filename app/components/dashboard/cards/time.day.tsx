'use client';

import { Link } from '@radix-ui/themes';
import { Clock, Laptop, Smartphone } from 'lucide-react';
import { NavLink } from 'react-router';

import { CartesianGrid, ReferenceLine, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip } from '~/components/ui/chart';
import { getProgressColor } from '~/utils/dashboards';

/**
 * The `TimeOfDay` component displays performance variations across different hours of the day
 * for both desktop and mobile platforms using scatter charts.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The performance data for desktop and mobile platforms.
 * @param {Array} props.data.desktop - Array of performance data points for desktop.
 * @param {Array} props.data.mobile - Array of performance data points for mobile.
 *
 * @returns {JSX.Element} A card component containing scatter charts for desktop and mobile performance.
 *
 * @remarks
 * - The scatter charts display performance scores (0-100) against the hour of the day (0-24).
 * - Includes tooltips for detailed information on each data point.
 * - Reference lines are used to indicate performance thresholds: "Good" (90+) and "Needs Improvement" (75-89).
 *
 * @example
 * ```tsx
 * const data = {
 *   desktop: [
 *     { timeDecimal: 9.5, performance: 85, slug: 'example-slug', date: '2023-01-01', hour: '09:30' },
 *     { timeDecimal: 14.0, performance: 92, slug: 'example-slug', date: '2023-01-01', hour: '14:00' },
 *   ],
 *   mobile: [
 *     { timeDecimal: 10.0, performance: 78, slug: 'example-slug', date: '2023-01-01', hour: '10:00' },
 *     { timeDecimal: 16.5, performance: 88, slug: 'example-slug', date: '2023-01-01', hour: '16:30' },
 *   ],
 * };
 *
 * <TimeOfDay data={data} />
 * ```
 */
const TimeOfDay = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Clock className='w-5 h-5' />
          Time-of-Day Performance
        </CardTitle>
        <CardDescription>Performance variations across different hours of the day.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Laptop className='w-5 h-5 mr-1' />
              <span className='font-medium'>Desktop</span>
            </div>
            <ChartContainer
              config={{
                performance: { label: 'Performance Score', color: 'hsl(var(--chart-1))' },
              }}
              className='h-[300px] w-full'
            >
              <ScatterChart accessibilityLayer margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  type='number'
                  dataKey='timeDecimal'
                  name='Time'
                  domain={[0, 24]}
                  label={{ value: 'Hour of Day', position: 'insideBottomRight', offset: -10 }}
                  ticks={[0, 6, 9, 11, 12, 13, 14, 15, 17, 20, 24]}
                />
                <YAxis
                  type='number'
                  dataKey='performance'
                  name='Performance'
                  domain={[0, 100]}
                  label={{ value: 'Performance Score', angle: -90, position: 'insideLeft' }}
                />

                <ChartTooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className='bg-background border rounded-md shadow-md p-2'>
                          <Link asChild>
                            <NavLink to={`/heartbeats/${data.slug}`}>View Heartbeat</NavLink>
                          </Link>
                          <p className='font-medium'>Date: {data.date}</p>
                          <p className='font-medium'>Time: {data.hour}</p>
                          <p className='text-sm'>Performance: {data.performance}</p>
                          <p className='text-sm text-muted-foreground'>
                            {data.performance >= 90 ? 'Good' : data.performance >= 75 ? 'Needs Improvement' : 'Poor'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter
                  name='Performance'
                  data={data.desktop}
                  fill='var(--color-performance)'
                  shape={(props) => {
                    const { cx, cy, payload } = props;
                    const color = getProgressColor(payload.performance);
                    return <circle cx={cx} cy={cy} r={4} fill={color} fillOpacity={0.7} stroke={color} />;
                  }}
                />
                <ReferenceLine y={90} stroke='#22c55e' strokeDasharray='3 3' label='Good' />
                <ReferenceLine y={75} stroke='#eab308' strokeDasharray='3 3' label='Needs Improvement' />
              </ScatterChart>
            </ChartContainer>
          </div>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
              <span className='font-medium'>Mobile</span>
            </div>
            <ChartContainer
              config={{
                performance: { label: 'Performance Score', color: 'hsl(var(--chart-2))' },
              }}
              className='h-[300px] w-full'
            >
              <ScatterChart accessibilityLayer margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis
                  type='number'
                  dataKey='timeDecimal'
                  name='Time'
                  domain={[0, 24]}
                  label={{ value: 'Hour of Day', position: 'insideBottomRight', offset: -10 }}
                  ticks={[0, 6, 9, 11, 12, 13, 14, 15, 17, 20, 24]}
                />
                <YAxis
                  type='number'
                  dataKey='performance'
                  name='Performance'
                  domain={[0, 100]}
                  label={{ value: 'Performance Score', angle: -90, position: 'insideLeft' }}
                />

                <ChartTooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className='bg-background border rounded-md shadow-md p-2'>
                          <Link asChild>
                            <NavLink to={`/heartbeats/${data.slug}`}>View Heartbeat</NavLink>
                          </Link>
                          <p className='font-medium'>Time: {data.hour}</p>
                          <p className='text-sm'>Performance: {data.performance}</p>
                          <p className='text-sm text-muted-foreground'>
                            {data.performance >= 90 ? 'Good' : data.performance >= 75 ? 'Needs Improvement' : 'Poor'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter
                  name='Performance'
                  data={data.mobile}
                  fill='var(--color-performance)'
                  shape={(props) => {
                    const { cx, cy, payload } = props;
                    const color = getProgressColor(payload.performance);
                    return <circle cx={cx} cy={cy} r={4} fill={color} fillOpacity={0.7} stroke={color} />;
                  }}
                />
                <ReferenceLine y={90} stroke='#22c55e' strokeDasharray='3 3' label='Good' />
                <ReferenceLine y={75} stroke='#eab308' strokeDasharray='3 3' label='Needs Improvement' />
              </ScatterChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { TimeOfDay };
