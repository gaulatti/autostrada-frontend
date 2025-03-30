import { BarChart3, Clock, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const SummaryCards = () => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Total Pulses</CardTitle>
          <Zap className='w-4 h-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>27</div>
          <p className='text-xs text-muted-foreground'>+3 from last week</p>
        </CardContent>
      </Card>
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
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>URLs Monitored</CardTitle>
          <Globe className='w-4 h-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>10</div>
          <p className='text-xs text-muted-foreground'>+1 from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between pb-2'>
          <CardTitle className='text-sm font-medium'>Last Pulse</CardTitle>
          <Clock className='w-4 h-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>2h ago</div>
          <p className='text-xs text-muted-foreground'>Mar 27, 2025 at 5:49 PM</p>
        </CardContent>
      </Card>
    </div>
  );
};

export { SummaryCards };
