import { ExternalLink } from 'lucide-react';

const ReportHeader = ({ pulse }: any) => {
  return (
    <header className='space-y-2'>
      <div className='flex gap-3 items-center text-sm text-gray-500 dark:text-gray-400'>
        <div className='flex'>
          <span className='mr-2'>URL:</span>
          <a href={pulse.url.url} className='text-blue-600 dark:text-blue-400 hover:underline flex items-center' target='_blank' rel='noopener noreferrer'>
            {new URL(pulse.url.url).hostname} <ExternalLink className='ml-1 h-3 w-3' />
          </a>
        </div>
        <span className='px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 text-xs rounded-full'>Comparison</span>
      </div>
      <div className='text-sm text-gray-500 dark:text-gray-400'>Tested on: {new Date(pulse.createdAt).toLocaleString()}</div>
    </header>
  );
};

export { ReportHeader };
