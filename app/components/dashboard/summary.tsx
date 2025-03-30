import { AveragePerformance } from './cards/avg.performance';
import { LastPulse } from './cards/last.pulse';
import { TotalPulses } from './cards/total.pulses';
import { UrlsMonitored } from './cards/urls.monitored';

/**
 * A functional component that renders a summary of dashboard metrics
 * using individual cards for each metric.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {Object} props.data - The data object containing metrics to display.
 * @param {number} props.data.totalPulses - The total number of pulses.
 * @param {number} props.data.averagePerformance - The average performance value.
 * @param {number} props.data.urlsMonitored - The number of monitored URLs.
 * @param {string} props.data.lastPulse - The timestamp of the last pulse.
 * @returns {JSX.Element} A grid of summary cards, or an empty fragment if no data is provided.
 */
const SummaryCards = ({ data }) => {
  if (!data) {
    return <></>;
  }
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      <TotalPulses total={data.totalPulses} />
      <AveragePerformance average={data.averagePerformance} />
      <UrlsMonitored amount={data.urlsMonitored} />
      <LastPulse time={data.lastPulse} />
    </div>
  );
};

export { SummaryCards };
