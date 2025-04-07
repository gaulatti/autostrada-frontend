import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { DataCard } from './data.card';

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
  const { t } = useTranslation();

  return (
    <DataCard
      backgroundColor='bg-slate-100'
      textColor='text-slate-800'
      header={
        <div className='flex w-full justify-between'>
          <span>{t('dashboard.urls-monitored')}</span>
          <Globe className='w-4 h-4 text-muted-foreground' />
        </div>
      }
      main={<div className='text-2xl font-black'>{amount}</div>}
    />
  );
};

export { UrlsMonitored };
