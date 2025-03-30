import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const LastPulse = () => {
  return (
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
  );
};

export { LastPulse };
