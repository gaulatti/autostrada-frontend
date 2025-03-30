import { Laptop, Radar, Smartphone } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, RadarChart, Radar as RadarComponent } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '~/components/ui/chart';

const GradesRadial = ({ data }) => {
  return (
    <Card className='col-span-2 2xl:col-span-1'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Radar className='w-5 h-5' />
          Grades comparison
        </CardTitle>
        <CardDescription>Comparing performance aspects across platforms</CardDescription>
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
                value: { label: 'Score', color: 'hsl(var(--chart-1))' },
              }}
              className='h-[200px] w-full'
            >
              <RadarChart accessibilityLayer data={data.desktop} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey='metric' />
                <PolarRadiusAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RadarComponent name='Desktop' dataKey='value' stroke='var(--color-value)' fill='var(--color-value)' fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </div>
          <div>
            <div className='text-center mb-2 flex items-center justify-center'>
              <Smartphone className='w-5 h-5 mr-1' />
              <span className='font-medium'>Mobile</span>
            </div>
            <ChartContainer
              config={{
                value: { label: 'Score', color: 'hsl(var(--chart-2))' },
              }}
              className='h-[200px] w-full'
            >
              <RadarChart accessibilityLayer data={data.mobile} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <PolarGrid />
                <PolarAngleAxis dataKey='metric' />
                <PolarRadiusAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <RadarComponent name='Mobile' dataKey='value' stroke='var(--color-value)' fill='var(--color-value)' fillOpacity={0.6} />
              </RadarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { GradesRadial };
