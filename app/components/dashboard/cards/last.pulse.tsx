import { Clock } from 'lucide-react';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation(); // Added hook

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{t('dashboard.last-pulse')}</CardTitle>
        <Clock className='w-4 h-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{moment(time).fromNow()}</div>
      </CardContent>
    </Card>
  );
};

export { LastPulse };
