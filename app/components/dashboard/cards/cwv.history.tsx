import { Laptop, LineChartIcon, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ReactApexChart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { dateFormatter } from '~/utils/dashboards';

interface DataPoint {
  date: string;
  lcp: number;
}

interface CwvHistoryProps {
  data: {
    desktop: DataPoint[];
    mobile: DataPoint[];
  };
}

interface CandlestickData {
  x: number;
  y: [number, number, number, number]; // [open (p75 prev), high, low, close (p75 current)]
}

interface DayData {
  values: number[];
  date: number;
}

const CwvHistory = ({ data }: CwvHistoryProps) => {
  const { t } = useTranslation();

  const calculatePercentile = (arr: number[], percentile: number): number => {
    const sorted = [...arr].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  };

  const processDataForCandlestick = (sourceData: DataPoint[]): CandlestickData[] => {
    // First, group data by day
    const dayMap = sourceData.reduce((acc: Map<string, DayData>, curr) => {
      const date = new Date(curr.date);
      const dayKey = date.toISOString().split('T')[0];
      if (!acc.has(dayKey)) {
        acc.set(dayKey, {
          values: [curr.lcp],
          date: date.getTime()
        });
      } else {
        acc.get(dayKey)!.values.push(curr.lcp);
      }
      return acc;
    }, new Map());

    // Convert to array and sort by date
    const sortedDays = Array.from(dayMap.entries())
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB));

    // Create candlestick data
    return sortedDays.map((([_, dayData], index) => {
      const values = dayData.values;
      const prevDayValues = index > 0 ? sortedDays[index - 1][1].values : values;

      return {
        x: dayData.date,
        y: [
          calculatePercentile(prevDayValues, 75), // open (p75 from previous day)
          Math.max(...values), // high
          Math.min(...values), // low
          calculatePercentile(values, 75), // close (p75 current day)
        ]
      };
    }));
  };

  const baseChartOptions: ApexOptions = {
    chart: {
      type: 'candlestick' as const,
      height: 200,
      toolbar: {
        show: false
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: (value: string): string => {
          return dateFormatter(new Date(parseInt(value)));
        }
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      },
      title: {
        text: 'LCP (s)'
      },
      decimalsInFloat: 2
    },
    tooltip: {
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        
        return `
          <div class="p-2">
            <div>Date: ${dateFormatter(new Date(w.globals.seriesX[seriesIndex][dataPointIndex]))}</div>
            <div>Open (Prev P75): ${o.toFixed(2)}s</div>
            <div>High: ${h.toFixed(2)}s</div>
            <div>Low: ${l.toFixed(2)}s</div>
            <div>Close (P75): ${c.toFixed(2)}s</div>
          </div>
        `;
      }
    }
  };

  const desktopOptions: ApexOptions = {
    ...baseChartOptions,
    title: {
      text: t('dashboard.desktop'),
      align: 'center'
    }
  };

  const mobileOptions: ApexOptions = {
    ...baseChartOptions,
    title: {
      text: t('dashboard.mobile'),
      align: 'center'
    }
  };

  const desktopSeries = [{
    name: 'LCP',
    data: processDataForCandlestick(data.desktop)
  }];

  const mobileSeries = [{
    name: 'LCP',
    data: processDataForCandlestick(data.mobile)
  }];

  return (
    <Card className='col-span-2 2xl:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LineChartIcon className='w-5 h-5' />
          {t('dashboard.core-web-vitals-history')}
        </CardTitle>
        <CardDescription>{t('dashboard.core-web-vitals-tracking')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Laptop className='w-5 h-5 mr-1' />
            </div>
            <div className='h-[200px] w-full'>
              <ReactApexChart 
                options={desktopOptions}
                series={desktopSeries}
                type="candlestick"
                height={200}
              />
            </div>
          </div>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
            </div>
            <div className='h-[200px] w-full'>
              <ReactApexChart 
                options={mobileOptions}
                series={mobileSeries}
                type="candlestick"
                height={200}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { CwvHistory };
