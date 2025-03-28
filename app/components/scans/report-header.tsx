import { URLNavbar } from '../url-navbar';

const ReportHeader = ({ pulse }: any) => {
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
