import { Clock } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { DataCard } from './data.card';

/**
 * A React component that displays the last recorded pulse time.
 *
 * @param {Object} props - The props object.
 * @param {Date} props.time - The timestamp of the last pulse.
 * @returns {JSX.Element} A card component displaying the relative time since the last pulse
 *                        and a static example timestamp.
 *
 * @remarks
 * This component uses the `moment` library to format the relative time
 * (e.g., "5 minutes ago"). It also includes a static example timestamp
 * for demonstration purposes.
 *
 * @example
 * ```tsx
 * <LastPulse time={new Date()} />
 * ```
 */
const LastPulse = ({ time }: { time: Date }) => {
  const { t } = useTranslation();

  return (
    <DataCard
      backgroundColor='bg-slate-100'
      textColor='text-slate-800'
      header={
        <div className='flex w-full justify-between'>
          <span>{t('dashboard.last-pulse')}</span>
          <Clock className='w-4 h-4 text-muted-foreground' />
        </div>
      }
      main={<div className='text-2xl font-black'>{moment(time).fromNow()}</div>}
    />
  );
};

export { LastPulse };
