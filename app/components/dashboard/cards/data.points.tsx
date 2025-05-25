import { LineChartIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  CartesianGrid, 
  Legend, 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartTooltip } from '~/components/ui/chart';
import { OverlaySpinner } from '~/components/spinners';
import type { PerformanceDataPoint } from '~/models/api.types';

interface DataPointsProps {
  data?: {
    desktop: PerformanceDataPoint[];
    mobile: PerformanceDataPoint[];
  };
  isLoading?: boolean;
  error?: Error | unknown;
}

const DataPoints = ({ data, isLoading, error }: DataPointsProps) => {
  const { t } = useTranslation();
  
  // Define fallback translations if they don't exist
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  const formattedData = useMemo(() => {
    if (!data) return { desktop: [], mobile: [] };
    
    return {
      desktop: data.desktop.map(point => ({
        ...point,
        formattedDate: new Date(point.date).toLocaleDateString(),
        timestamp: new Date(point.date).getTime(), // Convert date to timestamp for charts
      })).sort((a, b) => a.timestamp - b.timestamp),
      mobile: data.mobile.map(point => ({
        ...point,
        formattedDate: new Date(point.date).toLocaleDateString(),
        timestamp: new Date(point.date).getTime(), // Convert date to timestamp for charts
      })).sort((a, b) => a.timestamp - b.timestamp)
    };
  }, [data]);

  // Render error state
  if (error) {
    return (
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LineChartIcon className='w-5 h-5' />
            {getTranslation('dashboard.performance-over-time', 'Performance Over Time')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.core-web-vitals-tracking', 'Core Web Vitals tracking over time')}</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-10'>
          <div className='text-center text-destructive'>
            <p>{getTranslation('errors.failed-to-load-data', 'Failed to load data')}</p>
            <p className='text-sm text-muted-foreground'>{(error as Error)?.message || getTranslation('errors.unknown-error', 'Unknown error')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render loading state
  if (isLoading) {
    return (
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LineChartIcon className='w-5 h-5' />
            {getTranslation('dashboard.performance-over-time', 'Performance Over Time')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.core-web-vitals-tracking', 'Core Web Vitals tracking over time')}</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-10'>
          <OverlaySpinner />
        </CardContent>
      </Card>
    );
  }

  // Render empty state
  if (!data || (formattedData.desktop.length === 0 && formattedData.mobile.length === 0)) {
    return (
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LineChartIcon className='w-5 h-5' />
            {getTranslation('dashboard.performance-over-time', 'Performance Over Time')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.core-web-vitals-tracking', 'Core Web Vitals tracking over time')}</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-10'>
          <div className='text-center text-muted-foreground'>
            {getTranslation('dashboard.no-data-available', 'No data available')}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LineChartIcon className='w-5 h-5' />
          {getTranslation('dashboard.performance-over-time', 'Performance Over Time')}
        </CardTitle>
        <CardDescription>{getTranslation('dashboard.core-web-vitals-tracking', 'Core Web Vitals tracking over time')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-6'>
          <div className='h-[300px] w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={formattedData.desktop.concat(formattedData.mobile)} 
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  type="number" 
                  domain={['dataMin', 'dataMax']} 
                  tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
                  label={{ value: getTranslation('dashboard.date', 'Date'), position: 'insideBottomRight', offset: -10 }}
                />
                <YAxis
                  label={{ value: getTranslation('metrics.performance-score', 'Performance Score'), angle: -90, position: 'insideLeft' }}
                  domain={[0, 100]}
                />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className='bg-background border rounded-md shadow-md p-2'>
                          <p className='font-medium'>
                            {getTranslation('dashboard.date', 'Date')}: {data.formattedDate}
                          </p>
                          <p className='text-sm'>
                            {getTranslation('dashboard.time', 'Time')}: {data.hour}
                          </p>
                          {payload.map((entry, index) => (
                            <p key={`item-${index}`} className='text-sm' style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line
                  name={`${getTranslation('dashboard.desktop', 'Desktop')} ${getTranslation('metrics.performance', 'Performance')}`}
                  type="monotone"
                  dataKey="performance"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  connectNulls
                  data={formattedData.desktop}
                />
                <Line
                  name={`${getTranslation('dashboard.mobile', 'Mobile')} ${getTranslation('metrics.performance', 'Performance')}`}
                  type="monotone"
                  dataKey="performance"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                  connectNulls
                  data={formattedData.mobile}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { DataPoints };
