import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { CwvHistory } from '~/components/dashboard/cards/cwv.history';
import { DataPoints } from '~/components/dashboard/cards/data.points';
import { DetailedDataPoints } from '~/components/dashboard/cards/detailed.data.points';
import { GradesRadial } from '~/components/dashboard/cards/grades.radial';
import { TimeOfDay } from '~/components/dashboard/cards/time.day';
import { StableUrls } from '~/components/dashboard/stable.urls';
import { UrlSummaryCards } from '~/components/dashboard/url.summary';
import { ValidatingDatePicker } from '~/components/validating-date-picker';
import { SiteHeader } from '~/components/header';
import { ReportHeader } from '~/components/scans/report-header';
import { OverlaySpinner } from '~/components/spinners';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import i18n from '~/i18n';
import { Forbidden } from '~/pages/403';
import { DataTable } from './detail.table';

export function meta() {
  i18n.on('languageChanged', () => {
    document.title = i18n.t('targets.url-detail');
  });
  return [{ title: i18n.t('targets.url-detail') }];
}

/**
 * The `UrlDetail` component is responsible for rendering the detailed view of a specific URL report.
 * It fetches data based on the URL slug and an optional time range, and displays various statistics
 * and visualizations related to the URL's performance and stability.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered URL detail page.
 *
 * @remarks
 * - This component uses the `useParams` hook to extract the `slug` parameter from the URL.
 * - The `useAPI` hook is used to fetch data for the specific URL, with support for time range filtering.
 * - The `useMemo` hook is used to optimize the query parameters for the API call.
 *
 * @example
 * ```tsx
 * <Route path="/urls/:slug" element={<UrlDetail />} />
 * ```
 *
 * @dependencies
 * - `SiteHeader`: Displays the page header with a title and a date range picker.
 * - `Breadcrumbs`: Renders the breadcrumb navigation for the page.
 * - `ReportHeader`: Displays the main header information for the URL report.
 * - `UrlSummaryCards`: Shows summary statistics for the URL.
 * - `CwvHistory`: Visualizes the Core Web Vitals history.
 * - `GradesRadial`: Displays grades in a radial chart format.
 * - `StableUrls`: Shows stability-related data for the URL.
 * - `TimeOfDay`: Visualizes data based on the time of day.
 * - `DataTable`: Renders a table of detailed data for the URL.
 * - `OverlaySpinner`: Displays a loading spinner while data is being fetched.
 *
 * @hooks
 * - `useParams`: Extracts the `slug` parameter from the route.
 * - `useState`: Manages the state of the selected time range.
 * - `useMemo`: Optimizes the query parameters for the API call.
 * - `useAPI`: Fetches data from the API based on the `slug` and `timeRange`.
 */
const UrlDetail = () => {
  const { slug } = useParams();
  const [timeRange, setTimeRange] = useState<DateRange>();
  const [platform, setPlatform] = useState<string>(); // Add state for platform if UI allows selection
  const [provider, setProvider] = useState<string>(); // Add state for provider if UI allows selection

  // Create and validate query parameters for API calls
  const queryParams = useMemo(() => {
    const params: Record<string, string | undefined> = {
      platform,
      provider
    };
    
    // Add date range parameters if available, ensuring they are valid ISO strings
    if (timeRange?.from && timeRange?.to) {
      // Validate that from date is before or equal to to date
      const fromDate = new Date(timeRange.from);
      const toDate = new Date(timeRange.to);
      
      if (fromDate <= toDate) {
        // Valid range: convert to ISO strings for the API
        params.from = fromDate.toISOString();
        params.to = toDate.toISOString();
      } else {
        // Invalid range: don't add parameters
        console.warn('Invalid date range: from date is after to date');
      }
    }
    
    // Remove undefined values
    Object.keys(params).forEach(key => 
      params[key] === undefined && delete params[key]
    );
    
    return params;
  }, [timeRange, platform, provider]);
  
  // Fetch URL stats data
  const { 
    data,
    loading: statsLoading,
    error: statsError
  } = useAPI(Method.GET, [queryParams], `urls/${slug}/stats`, queryParams);
  
  // Fetch data points for visualization
  const { 
    data: dataPointsData,
    loading: dataPointsLoading,
    error: dataPointsError
  } = useAPI(Method.GET, [queryParams], `urls/${slug}/datapoints`, queryParams);
  
  // Combined loading state
  const isLoading = statsLoading || dataPointsLoading;
  const featureFlags = useFeatureFlags();
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: t('navigation.home'), link: '/' },
    { title: t('targets.urls'), link: '/urls' },
    { title: t('targets.url-detail'), link: `/urls/${slug}` },
  ];

  /**
   * Phased opening
   */
  if (!featureFlags('eP84UUn8qcnTsf0cbTeoM').isEnabled()) {
    return <Forbidden />;
  }

  return (
    <>
      <SiteHeader title={t('targets.url-detail')} actions={<ValidatingDatePicker onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        {isLoading && (
          <div className="w-full flex justify-center py-12">
            <OverlaySpinner />
          </div>
        )}
        {slug && data && !isLoading ? (
          <>
            <ReportHeader url={{ url: data.url }} />
            <UrlSummaryCards data={data} />
            <div className='grid grid-cols-2 gap-6'>
              <CwvHistory data={data.history} />
              <GradesRadial data={data.grades} />
            </div>
            <DataPoints 
              data={dataPointsData} 
              isLoading={dataPointsLoading} 
              error={dataPointsError} 
            />
            <DetailedDataPoints
              data={dataPointsData}
              isLoading={dataPointsLoading}
              error={dataPointsError}
            />
            <StableUrls data={data.stability} solo={true} />
            <TimeOfDay data={data.timeOfDay} />
            <DataTable 
              slug={slug} 
              timeRange={timeRange}
              platform={platform}
              provider={provider}
            />
          </>
        ) : !isLoading && (!slug || !data || Object.keys(data).length === 0) ? (
          <div className="w-full flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-destructive mb-4" />
            <p className="text-lg font-medium">No performance data for this range.</p>
            <p className="text-sm text-muted-foreground">{statsError ? statsError.toString() : t('errors.could-not-load-data', 'Could not load data')}</p>
          </div>
        ) : null}
      </Flex>
    </>
  );
};

export default UrlDetail;
