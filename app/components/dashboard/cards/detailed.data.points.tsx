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

// Extended performance data point with UI-specific fields
interface RawDataPoint extends PerformanceDataPoint {
  timestamp?: number;
  platform?: 'mobile' | 'desktop';  // We'll use this to differentiate between mobile/desktop
}

interface DetailedDataPointsProps {
  data?: {
    mobile: RawDataPoint[];
    desktop: RawDataPoint[];
  };
  isLoading?: boolean;
  error?: Error | unknown;
}

const DetailedDataPoints = ({ data, isLoading, error }: DetailedDataPointsProps) => {
  const { t } = useTranslation();
  
  // Define fallback translations if they don't exist
  const getTranslation = (key: string, fallback: string) => {
    const translation = t(key);
    return translation === key ? fallback : translation;
  };
  
  // Format the data for display in the chart
  const formattedData = useMemo(() => {
    if (!data) return { desktop: [], mobile: [] };
    
    return {
      // Extract performance data points if available
      desktop: data.desktop
        .filter(point => point.timeDecimal !== undefined && point.performance !== undefined)
        .map(point => ({
          ...point,
          platform: 'desktop',
          formattedDateTime: `${point.date} ${point.hour || ''}`,
        }))
        .sort((a, b) => (a.timeDecimal || 0) - (b.timeDecimal || 0)),
      mobile: data.mobile
        .filter(point => point.timeDecimal !== undefined && point.performance !== undefined)
        .map(point => ({
          ...point,
          platform: 'mobile',
          formattedDateTime: `${point.date} ${point.hour || ''}`,
        }))
        .sort((a, b) => (a.timeDecimal || 0) - (b.timeDecimal || 0))
    };
  }, [data]);

  // Render error state
  if (error) {
    return (
      <Card className='col-span-2'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <LineChartIcon className='w-5 h-5' />
            {getTranslation('dashboard.detailed-performance', 'Detailed Performance')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.raw-performance-data', 'Raw performance data by hour')}</CardDescription>
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
            {getTranslation('dashboard.detailed-performance', 'Detailed Performance')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.raw-performance-data', 'Raw performance data by hour')}</CardDescription>
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
            {getTranslation('dashboard.detailed-performance', 'Detailed Performance')}
          </CardTitle>
          <CardDescription>{getTranslation('dashboard.raw-performance-data', 'Raw performance data by hour')}</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center justify-center py-10'>
          <div className='text-center text-muted-foreground'>
            {getTranslation('dashboard.no-detailed-data', 'No detailed data available')}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Combine data for chart display
  const combinedData = [...formattedData.desktop, ...formattedData.mobile];

  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <LineChartIcon className='w-5 h-5' />
          {getTranslation('dashboard.detailed-data-points', 'Detailed Data Points')}
        </CardTitle>
        <CardDescription>{getTranslation('dashboard.raw-performance-by-time', 'Raw performance data by time of day')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] w-full'>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={combinedData}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timeDecimal" 
                type="number"
                domain={[0, 24]}  // Full day range
                label={{ 
                  value: getTranslation('dashboard.time-of-day', 'Time of Day'), 
                  position: 'insideBottomRight', 
                  offset: -5 
                }}
                tickFormatter={(value) => {
                  // Format the time decimals to readable hours (e.g. 14.5 -> 14:30)
                  const hours = Math.floor(value);
                  const minutes = Math.round((value - hours) * 60);
                  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }}
                // Add more ticks for better readability
                ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
              />
              <YAxis
                label={{ 
                  value: getTranslation('dashboard.performance', 'Performance Score'), 
                  angle: -90, 
                  position: 'insideLeft' 
                }}
                domain={[0, 100]}
                // Add ticks for better readability
                ticks={[0, 25, 50, 75, 100]}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as (RawDataPoint & { formattedDateTime: string, platform: string });
                    
                    // Format the time display
                    let formattedTime = '';
                    if (data.timeDecimal !== undefined) {
                      const hours = Math.floor(data.timeDecimal);
                      const minutes = Math.round((data.timeDecimal - hours) * 60);
                      formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    }
                    
                    return (
                      <div className='bg-background border rounded-md shadow-md p-3'>
                        <p className='font-medium mb-1'>
                          {data.date} - {formattedTime}
                        </p>
                        <p className='text-sm mb-1'>
                          {getTranslation(`dashboard.${data.platform}`, data.platform === 'desktop' ? 'Desktop' : 'Mobile')}
                        </p>
                        {payload.map((entry, index) => (
                          <p key={`item-${index}`} className='text-sm font-medium' style={{ color: entry.color }}>
                            {getTranslation('dashboard.performance', 'Performance')}: {entry.value}
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
                name={getTranslation('dashboard.desktop-performance', 'Desktop Performance')}
                type="monotone"
                dataKey="performance"
                stroke="#4338ca" // Indigo color for desktop
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                connectNulls
                data={formattedData.desktop}
                animationDuration={1500}
              />
              <Line
                name={getTranslation('dashboard.mobile-performance', 'Mobile Performance')}
                type="monotone"
                dataKey="performance"
                stroke="#16a34a" // Green color for mobile
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                connectNulls
                data={formattedData.mobile}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export { DetailedDataPoints };
