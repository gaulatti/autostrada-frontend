import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { CwvHistory } from '~/components/dashboard/cards/cwv.history';
import { GradesRadial } from '~/components/dashboard/cards/grades.radial';
import { TimeOfDay } from '~/components/dashboard/cards/time.day';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { UrlSummaryCards } from '~/components/dashboard/url.summary';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { ReportHeader } from '~/components/scans/report-header';
import { OverlaySpinner } from '~/components/spinners';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';
import { DataTable } from './detail.table';
import i18n from '~/i18n';

export function meta() {
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
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `urls/${slug}`, queryParams);
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
      <SiteHeader title={t('targets.url-detail')} actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        {slug && data ? (
          <>
            <ReportHeader url={data} />
            <UrlSummaryCards data={data!.stats} />

            <div className='grid grid-cols-2 gap-6'>
              <CwvHistory data={data!.stats.history} />
              <GradesRadial data={data!.stats.grades} />
            </div>
            <StableUrls data={data!.stats.stability} />
            <TimeOfDay data={data!.stats.timeOfDay} />
            <DataTable slug={slug} timeRange={timeRange} />
          </>
        ) : (
          <OverlaySpinner />
        )}
      </Flex>
    </>
  );
};

export default UrlDetail;
