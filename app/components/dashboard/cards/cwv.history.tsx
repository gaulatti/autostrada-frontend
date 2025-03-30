import { Laptop, LineChartIcon, Smartphone } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

const CwvHistory = ({ data }) => {
  return (
    <Card className='col-span-2 2xl:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LineChartIcon className='w-5 h-5' />
          Core Web Vitals History
        </CardTitle>
        <CardDescription>Tracking key Core Web Vitals (LCP, FID, CLS, TTFB) over time</CardDescription>
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
                lcp: { label: 'LCP (s)', color: 'hsl(var(--iris-11))' },
                fid: { label: 'FID (s)', color: 'hsl(var(--jade-11))' },
                cls: { label: 'CLS', color: 'hsl(var(--chart-3))' },
                ttfb: { label: 'TTFB (s)', color: 'hsl(var(--chart-4))' },
              }}
              className='h-[200px] w-full'
            >
              <LineChart accessibilityLayer data={data.desktop} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='lcp' stroke='var(--iris-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='fid' stroke='var(--jade-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='cls' stroke='var(--amber-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='ttfb' stroke='var(--blue-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </div>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
              <span className='font-medium'>Mobile</span>
            </div>
            <ChartContainer
              config={{
                lcp: { label: 'LCP (s)', color: 'hsl(var(--iris-11))' },
                fid: { label: 'FID (s)', color: 'hsl(var(--jade-11))' },
                cls: { label: 'CLS', color: 'hsl(var(--amber-11))' },
                ttfb: { label: 'TTFB (s)', color: 'hsl(var(--blue-11))' },
              }}
              className='h-[200px] w-full'
            >
              <LineChart accessibilityLayer data={data.mobile} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type='monotone' dataKey='lcp' stroke='var(--iris-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='fid' stroke='var(--jade-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='cls' stroke='var(--amber-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type='monotone' dataKey='ttfb' stroke='var(--blue-11)' strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CwvHistory };
