import { Laptop, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { getProgressColor } from '~/utils/dashboards';
import { UrlPerformance } from './url.performance';

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
const StableUrls = ({ data }: { data: StableUrlsProps }) => {
  const { t } = useTranslation();

  if (!data) {
    return <></>;
  }

  return (
    <div className='grid gap-6 md:grid-cols-3'>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Laptop className='w-5 h-5' />
            {t('dashboard.desktop-performance')}
          </CardTitle>
          {data.desktop.length > 1 && <CardDescription>{t('dashboard.most-stable-urls')}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.desktop.map((url) => (
              <UrlPerformance url={url} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Smartphone className='w-5 h-5' />
            {t('dashboard.mobile-performance')}
          </CardTitle>
          {data.mobile.length > 1 && <CardDescription>{t('dashboard.most-stable-urls')}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.mobile.map((url) => (
              <UrlPerformance url={url} />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Laptop className='w-5 h-5 mr-1' />
            <Smartphone className='w-5 h-5' />
            {t('dashboard.desktop-vs-mobile')}
          </CardTitle>
          {data.differences.length > 1 && <CardDescription>{t('dashboard.performance-gap')}</CardDescription>}
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {data.differences.map((url, index) => (
              <NavLink to={`/urls/${url.slug}`} key={index} className='flex items-center justify-between h-[50px]'>
                <div className='flex-1'>
                  <div className='flex items-center justify-between mb-1'>
                    <span className='text-sm font-medium truncate' title={url.url}>
                      {url.url}
                    </span>
                    <span className='text-sm font-bold flex items-center'>± {url.difference}</span>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <Laptop className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.desktopAverage!) }}>
                        {url.desktopAverage}
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <Smartphone className='w-4 h-4 mr-1 text-muted-foreground' />
                      <span className='text-sm' style={{ color: getProgressColor(url.mobileAverage!) }}>
                        {url.mobileAverage}
                      </span>
                    </div>
                    <div className='w-24 h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-full rounded-full'
                        style={{
                          width: `${url.difference}%`,
                          backgroundColor: getProgressColor(url.difference!, true),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { StableUrls };
