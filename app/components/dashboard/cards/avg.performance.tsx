import { BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DataCard } from './data.card';

/**
 * A React component that displays the average performance value inside a styled card.
 *
 * @param {Object} props - The props object.
 * @param {number} props.average - The average performance value to display.
 * @returns {JSX.Element} A card component showing the average performance.
 */
const AveragePerformance = ({ average }: { average: number }) => {
  const { t } = useTranslation();


  return (
    <DataCard
      backgroundColor='bg-slate-100'
      textColor='text-slate-800'
      header={
        <div className='flex w-full justify-between'>
          <span>{t('dashboard.avg-performance')}</span>
          <BarChart3 className='w-4 h-4 text-muted-foreground' />
        </div>
      }
      main={<div className='text-2xl font-black'>{average}</div>}
    />
  );
};

export { AveragePerformance };
