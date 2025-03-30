import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const AveragePerformance = () => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Avg. Performance</CardTitle>
        <BarChart3 className='w-4 h-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>87%</div>
        <p className='text-xs text-muted-foreground'>+2% from last week</p>
      </CardContent>
    </Card>
  );
};

export { AveragePerformance };
