import { AveragePerformance } from './cards/avg.performance';
import { LastPulse } from './cards/last.pulse';
import { TotalPulses } from './cards/total.pulses';
import { UrlsMonitored } from './cards/urls.monitored';

const SummaryCards = () => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <TotalPulses />
      <AveragePerformance />
      <UrlsMonitored />
      <LastPulse />
    </div>
  );
};

export { SummaryCards };
