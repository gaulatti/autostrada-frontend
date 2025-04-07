import { useTranslation } from 'react-i18next';
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
const ReportHeader = ({ pulse, heartbeat, url }: { pulse?: any; heartbeat?: any; url?: any }) => {
  const { t } = useTranslation();

  let fqdn;
  if (url) {
    fqdn = url.url;
  } else if (heartbeat) {
    fqdn = heartbeat.pulse.url.url;
  } else if (pulse) {
    fqdn = pulse.url.url;
  }

  if (!pulse && heartbeat) {
    pulse = heartbeat.pulse;
  }

  return (
    <header className='space-y-2'>
      <div className='flex gap-3 items-center text-sm text-gray-500 dark:text-gray-400'>
        <URLNavbar url={fqdn} />
        <span className='px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full'>{t('scans.comparison')}</span>
      </div>
      {pulse && (
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          {t('dashboard.tested-on')}: {new Date(pulse.createdAt).toLocaleString()}
        </div>
      )}
    </header>
  );
};

export { ReportHeader };
