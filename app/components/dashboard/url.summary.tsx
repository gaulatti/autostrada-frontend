import { AveragePerformance } from './cards/avg.performance';
import { LastPulse } from './cards/last.pulse';
import { TotalPulses } from './cards/total.pulses';

const UrlSummaryCards = ({ data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      <TotalPulses total={data.totalPulses} />
      <AveragePerformance average={data.averagePerformance} />
      <LastPulse time={data.lastPulse} />
    </div>
  );
};

export { UrlSummaryCards };
