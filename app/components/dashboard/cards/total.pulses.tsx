import { Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const TotalPulses = () => {
    return (
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
    );
};

export { TotalPulses };
