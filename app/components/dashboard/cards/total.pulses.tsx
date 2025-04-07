import { useTranslation } from 'react-i18next';
import { DataCard } from './data.card';
import { Zap } from 'lucide-react';

/**
 * A React component that displays the total number of pulses in a styled card.
 *
 * @param total - The total number of pulses to display.
 * @returns A JSX element representing the Total Pulses card.
 */
const TotalPulses = ({ total }: { total: number }) => {
  const { t } = useTranslation();
  return (
    <DataCard
      backgroundColor='bg-slate-100'
      textColor='text-slate-800'
      header={
        <div className='flex w-full justify-between'>
          <span>{t('dashboard.total-pulses')}</span>
          <Zap className='w-4 h-4 text-muted-foreground' />
        </div>
      }
      main={<div className='text-2xl font-black'>{total}</div>}
    />
  );
};

export { TotalPulses };
