import { AveragePerformance } from './cards/avg.performance';
import { LastPulse } from './cards/last.pulse';
import { TotalPulses } from './cards/total.pulses';

const UrlSummaryCards = () => {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      <TotalPulses />
      <AveragePerformance />
      <LastPulse />
    </div>
  );
};

export { UrlSummaryCards };
