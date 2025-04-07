import { Flex } from '@radix-ui/themes';
import { Laptop, Smartphone } from 'lucide-react';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { type PerformantDashboardProps } from '~/utils/dashboards';
import { PerformanceComparisonCard, UrlPerformance, type PerformanceComparisonData, type URLPerformanceData } from './cards/performance';

/**
 * The `PerformantUrls` component displays performance data for URLs across
 * desktop and mobile platforms, as well as the performance gap between the two.
 * It organizes the data into three sections: Desktop Performance, Mobile Performance,
 * and Desktop vs Mobile comparison.
 *
 * @param {Object} props - The props for the component.
 * @param {PerformantUrlsProps} props.data - The performance data to display.
 * @param {Array} props.data.desktop - An array of desktop performance data objects.
 * @param {Array} props.data.mobile - An array of mobile performance data objects.
 * @param {Array} props.data.differences - An array of objects representing the performance
 * gap between desktop and mobile platforms.
 *
 * @returns {JSX.Element} A grid layout containing cards for each performance category.
 *
 * - **Desktop Performance**: Displays the most performant URLs for desktop, including
 *   a line chart of grades and average performance.
 * - **Mobile Performance**: Displays the most performant URLs for mobile, including
 *   a line chart of grades and average performance.
 * - **Desktop vs Mobile**: Highlights the performance gap between desktop and mobile
 *   platforms, showing averages and a visual representation of the gap.
 *
 * @example
 * ```tsx
 * const data = {
 *   desktop: [
 *     { url: 'https://example.com', slug: 'example', average: 90, variation: 5, grades: [88, 92, 89] },
 *   ],
 *   mobile: [
 *     { url: 'https://example.com', slug: 'example', average: 85, variation: 4, grades: [83, 87, 84] },
 *   ],
 *   differences: [
 *     { url: 'https://example.com', slug: 'example', desktopAverage: 90, mobileAverage: 85, difference: 5 },
 *   ],
 * };
 *
 * <PerformantUrls data={data} />;
 * ```
 */
const PerformantUrls = ({ data }: { data: PerformantDashboardProps }): JSX.Element => {
  const { t } = useTranslation();

  if (!data) {
    return <></>;
  }

  return (
    <div className='grid gap-6 xl:grid-cols-3'>
      <Flex direction={'column'} align={'center'}>
        <Laptop className='w-5 h-5' />
        <header className='font-bold'>{t('dashboard.desktop-performance')}</header>
        <span className='text-muted-foreground text-sm'>{t('dashboard.most-performant-urls')}</span>
        <div className='space-y-4 w-full m-4'>
          {data.desktop.map((item) => (
            <UrlPerformance {...(item as URLPerformanceData)} />
          ))}
        </div>
      </Flex>
      <Flex direction={'column'} align={'center'}>
        <Smartphone className='w-5 h-5' />
        <header className='font-bold'>{t('dashboard.mobile-performance')}</header>
        <span className='text-muted-foreground text-sm'>{t('dashboard.most-performant-urls')}</span>
        <div className='space-y-4 w-full m-4'>
          {data.mobile.map((item) => (
            <UrlPerformance {...(item as URLPerformanceData)} />
          ))}
        </div>
      </Flex>
      <Flex direction={'column'} align={'center'}>
        <Laptop className='w-5 h-5' />
        <header className='font-bold'>{t('dashboard.desktop-vs-mobile')}</header>
        <span className='text-muted-foreground text-sm'>{t('dashboard.performance-gap')}</span>
        <div className='space-y-4 w-full m-4'>
          {data.differences.map((url, index) => (
            <PerformanceComparisonCard {...url as PerformanceComparisonData } />
          ))}
        </div>
      </Flex>
    </div>
  );
};

export { PerformantUrls };
