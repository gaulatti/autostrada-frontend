import { Flex } from '@radix-ui/themes';
import { Laptop, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PerformanceComparisonCard, UrlPerformance, type PerformanceComparisonData, type URLPerformanceData } from './cards/performance';

interface UrlData {
  url: string;
  slug: string;
  average?: number;
  grades?: number[];
  variation?: number;
  desktopAverage?: number;
  mobileAverage?: number;
  difference?: number;
}

interface StableUrlsProps {
  desktop: UrlData[];
  mobile: UrlData[];
  differences: UrlData[];
}

/**
 * The `StableUrls` component displays a dashboard with three sections:
 * - Desktop Performance: Shows the most stable URLs for desktop performance with minimal oscillation.
 * - Mobile Performance: Shows the most stable URLs for mobile performance with minimal oscillation.
 * - Desktop vs Mobile: Highlights the performance gap between desktop and mobile platforms.
 *
 * Each section is represented as a card containing a list of URLs with their respective performance metrics.
 * The component uses charts to visualize performance grades and provides color-coded indicators for clarity.
 *
 * @param {Object} props - The component props.
 * @param {StableUrlsProps} props.data - The data object containing performance information for desktop, mobile, and platform differences.
 * @returns {JSX.Element} A grid layout with three cards displaying performance metrics and comparisons.
 */
const StableUrls = ({ data, solo = false }: { data: StableUrlsProps } & { solo?: boolean }) => {
  const { t } = useTranslation();

  if (!data) {
    return <></>;
  }

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      {solo ? (
        <>
          <UrlPerformance {...data.desktop[0]} solo={'desktop'} />
          <UrlPerformance {...data.mobile[0]} solo={'mobile'} />
          <PerformanceComparisonCard {...(data.differences[0] as PerformanceComparisonData)} solo='desktop' />
        </>
      ) : (
        <>
          <Flex direction={'column'} align={'center'}>
            <Laptop className='w-5 h-5' />
            <header className='font-semibold'>{t('dashboard.desktop-performance')}</header>
            <span className='text-muted-foreground text-sm'>{t('dashboard.most-stable-urls')}</span>
            <div className='space-y-4  w-full m-4'>
              {data.desktop.map((item) => (
                <UrlPerformance {...(item as URLPerformanceData)} />
              ))}
            </div>
          </Flex>
          <Flex direction={'column'} align={'center'}>
            <Smartphone className='w-5 h-5' />
            <header className='font-semibold'>{t('dashboard.mobile-performance')}</header>
            <span className='text-muted-foreground text-sm'>{t('dashboard.most-stable-urls')}</span>
            <div className='space-y-4  w-full m-4'>
              {data.mobile.map((item) => (
                <UrlPerformance {...(item as URLPerformanceData)} />
              ))}
            </div>
          </Flex>
          <Flex direction={'column'} align={'center'}>
            <Laptop className='w-5 h-5' />
            <header className='font-semibold'>{t('dashboard.desktop-vs-mobile')}</header>
            <span className='text-muted-foreground text-sm'>{t('dashboard.performance-gap')}</span>
            <div className='space-y-4 w-full m-4'>
              {data.differences.map((url) => (
                <PerformanceComparisonCard {...(url as PerformanceComparisonData)} />
              ))}
            </div>
          </Flex>
        </>
      )}
    </div>
  );
};

export { StableUrls };
