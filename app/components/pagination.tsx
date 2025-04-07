import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * A React component for rendering pagination controls.
 *
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onPageChange - A callback function to handle page changes.
 *
 * @returns {JSX.Element} A pagination component with "Previous" and "Next" buttons.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const { t } = useTranslation();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className='flex items-center justify-between space-x-2'>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md disabled:opacity-50'
      >
        <ChevronLeft className='w-4 h-4' />
        {t('ui.previous')}
      </button>
      <span className='text-sm font-medium'>
        {t('ui.page')} {currentPage} {t('ui.of')} {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md disabled:opacity-50'
      >
        {t('ui.next')}
        <ChevronRight className='w-4 h-4' />
      </button>
    </div>
  );
};

export { Pagination };
