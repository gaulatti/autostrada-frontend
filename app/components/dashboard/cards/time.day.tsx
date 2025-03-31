'use client';

import { Link } from '@radix-ui/themes';
import { Clock, Laptop, Smartphone } from 'lucide-react';
import { NavLink } from 'react-router';

import { CartesianGrid, ReferenceLine, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip } from '~/components/ui/chart';
import { getProgressColor } from '~/utils/dashboards';

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
