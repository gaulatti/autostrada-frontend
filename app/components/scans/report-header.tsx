import { URLNavbar } from '../url-navbar';

/**
 * A React functional component that renders a report header with information about a pulse or heartbeat.
 *
 * @param {Object} props - The props object.
 * @param {any} props.pulse - The primary pulse object containing details such as the URL and creation date.
 * @param {any} props.heartbeat - An optional heartbeat object, used as a fallback to extract the pulse if `pulse` is not provided.
 *
 * @returns {JSX.Element} A header element containing the URL navigation bar, a comparison badge, and the test date.
 */
const ReportHeader = ({ pulse, heartbeat }: any) => {

  if (!pulse && heartbeat) {
    pulse = heartbeat.pulse
  }

  return (
    <header className='space-y-2'>
      <div className='flex gap-3 items-center text-sm text-gray-500 dark:text-gray-400'>
        <URLNavbar url={pulse.url.url} />
        <span className='px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full'>Comparison</span>
      </div>
      <div className='text-sm text-gray-500 dark:text-gray-400'>Tested on: {new Date(pulse.createdAt).toLocaleString()}</div>
    </header>
  );
};

export { ReportHeader };
