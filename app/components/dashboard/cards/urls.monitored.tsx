import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const UrlsMonitored = () => {
  return (<Card>
    <CardHeader className='flex flex-row items-center justify-between pb-2'>
      <CardTitle className='text-sm font-medium'>URLs Monitored</CardTitle>
      <Globe className='w-4 h-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>10</div>
      <p className='text-xs text-muted-foreground'>+1 from last week</p>
    </CardContent>
  </Card>
  );
};

export { UrlsMonitored };
