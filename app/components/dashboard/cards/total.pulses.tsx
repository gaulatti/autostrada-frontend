import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

/**
 * A React component that displays the total number of pulses in a styled card.
 *
 * @param total - The total number of pulses to display.
 * @returns A JSX element representing the Total Pulses card.
 */
const TotalPulses = ({ total }: { total: number }) => {
  const { t } = useTranslation(); // Added hook

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{t('dashboard.total-pulses')}</CardTitle>
        <Zap className='w-4 h-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{total}</div>
      </CardContent>
    </Card>
  );
};

export { TotalPulses };
