import { Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

/**
 * A React functional component that displays the number of monitored URLs
 * inside a styled card. The card includes a title, an icon, and the amount
 * of monitored URLs.
 *
 * @param {Object} props - The props object.
 * @param {number} props.amount - The number of monitored URLs to display.
 * @returns {JSX.Element} A card component displaying the monitored URLs count.
 */
const UrlsMonitored = ({ amount }: { amount: number }) => {
  return (<Card>
    <CardHeader className='flex flex-row items-center justify-between pb-2'>
      <CardTitle className='text-sm font-medium'>URLs Monitored</CardTitle>
      <Globe className='w-4 h-4 text-muted-foreground' />
    </CardHeader>
    <CardContent>
      <div className='text-2xl font-bold'>{ amount }</div>
    </CardContent>
  </Card>
  );
};

export { UrlsMonitored };
