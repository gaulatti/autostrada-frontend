import { Laptop, LineChartIcon, Smartphone } from 'lucide-react';
import moment from 'moment';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';
import { dateFormatter, labelFormatter } from '~/utils/dashboards';

const CwvHistory = ({ data }) => {
  // Define colors from @radix-ui/themes (feel free to adjust these variables)
  const colors = {
    lcp: 'var(--red-11)',
    fid: 'var(--green-11)',
    ttfb: 'var(--blue-11)',
    dcl: 'var(--violet-11)',
    tti: 'var(--indigo-11)',
    si: 'var(--orange-11)',
    tbt: 'var(--yellow-11)',
  };

  return (
    <Card className='col-span-2 2xl:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LineChartIcon className='w-5 h-5' />
          Core Web Vitals History
        </CardTitle>
        <CardDescription>Tracking key Core Web Vitals over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-4'>
          {/* Desktop Chart */}
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Laptop className='w-5 h-5 mr-1' />
              <span className='font-medium'>Desktop</span>
            </div>
            <ChartContainer
              config={{
                lcp: { label: 'LCP (s)', color: colors.lcp },
                fid: { label: 'FID (s)', color: colors.fid },
                ttfb: { label: 'TTFB (s)', color: colors.ttfb },
                dcl: { label: 'DCL (s)', color: colors.dcl },
                tti: { label: 'TTI (s)', color: colors.tti },
                si: { label: 'SI', color: colors.si },
                tbt: { label: 'TBT (ms)', color: colors.tbt },
              }}
              className='h-[200px] w-full'
            >
              <LineChart accessibilityLayer data={data.desktop} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tickFormatter={dateFormatter} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent labelKey='date' labelFormatter={labelFormatter} />} />
                <Line type='monotone' dataKey='lcp' stroke={colors.lcp} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='fid' stroke={colors.fid} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='ttfb' stroke={colors.ttfb} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='dcl' stroke={colors.dcl} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='tti' stroke={colors.tti} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='si' stroke={colors.si} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='tbt' stroke={colors.tbt} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </div>
          {/* Mobile Chart */}
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
              <span className='font-medium'>Mobile</span>
            </div>
            <ChartContainer
              config={{
                lcp: { label: 'LCP (s)', color: colors.lcp },
                fid: { label: 'FID (s)', color: colors.fid },
                ttfb: { label: 'TTFB (s)', color: colors.ttfb },
                dcl: { label: 'DCL (s)', color: colors.dcl },
                tti: { label: 'TTI (s)', color: colors.tti },
                si: { label: 'SI', color: colors.si },
                tbt: { label: 'TBT (ms)', color: colors.tbt },
              }}
              className='h-[200px] w-full'
            >
              <LineChart accessibilityLayer data={data.mobile} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' tickFormatter={dateFormatter} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent labelKey='date' labelFormatter={labelFormatter} />} />
                <Line type='monotone' dataKey='lcp' stroke={colors.lcp} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='fid' stroke={colors.fid} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='ttfb' stroke={colors.ttfb} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='dcl' stroke={colors.dcl} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='tti' stroke={colors.tti} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='si' stroke={colors.si} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='tbt' stroke={colors.tbt} strokeWidth={2} dot={{ r: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CwvHistory };
