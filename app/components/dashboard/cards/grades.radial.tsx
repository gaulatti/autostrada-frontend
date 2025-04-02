import { Laptop, Radar, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar as RadarComponent } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

/**
 * GradesRadial is a React component that renders a comparison of performance grades
 * between desktop and mobile platforms using radar charts. It displays two radar charts
 * side by side, each representing the performance metrics for a specific platform.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.data - The data object containing performance metrics for both platforms.
 * @param {Array} props.data.desktop - The data array for the desktop platform, where each object
 * contains a `metric` (string) and a `value` (number).
 * @param {Array} props.data.mobile - The data array for the mobile platform, where each object
 * contains a `metric` (string) and a `value` (number).
 *
 * @returns {JSX.Element} A card component with radar charts comparing desktop and mobile performance.
 */
const GradesRadial = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Card className='col-span-2 2xl:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Radar className='w-5 h-5' />
          {t('dashboard.grades-comparison')}
        </CardTitle>
        <CardDescription>{t('dashboard.platform-comparison')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid md:grid-cols-2 gap-4'>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Laptop className='w-5 h-5 mr-1' />
              <span className='font-medium'>{t('dashboard.desktop')}</span>
            </div>
            <ChartContainer
              config={{
                value: { label: 'Score', color: 'hsl(var(--amber-9))' },
              }}
              className='h-[200px] w-full'
            >
              <RadarChart accessibilityLayer data={data.desktop} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey='metric' />
                <PolarRadiusAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RadarComponent name={t('dashboard.desktop')} dataKey='value' stroke='var(--amber-9)' fill='var(--amber-9)' fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </div>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
              <span className='font-medium'>{t('dashboard.mobile')}</span>
            </div>
            <ChartContainer
              config={{
                value: { label: 'Score', color: 'hsl(var(--red-9))' },
              }}
              className='h-[200px] w-full'
            >
              <RadarChart accessibilityLayer data={data.mobile} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey='metric' />
                <PolarRadiusAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RadarComponent name={t('dashboard.mobile')} dataKey='value' stroke='var(--red-9)' fill='var(--red-9)' fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { GradesRadial };
