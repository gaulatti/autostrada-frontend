import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

/**
 * A React component that displays the average performance value inside a styled card.
 *
 * @param {Object} props - The props object.
 * @param {number} props.average - The average performance value to display.
 * @returns {JSX.Element} A card component showing the average performance.
 */
const AveragePerformance = ({ average }: { average: number }) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>Avg. Performance</CardTitle>
        <BarChart3 className='w-4 h-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{ average }</div>
      </CardContent>
    </Card>
  );
};

export { AveragePerformance };
