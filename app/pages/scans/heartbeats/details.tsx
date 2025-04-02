import { Flex } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { CoreWebVitals } from '~/components/metrics/cwv';
import { Grades } from '~/components/metrics/grades';
import { OverallGrade } from '~/components/metrics/overall-grade';
import { Opportunities } from '~/components/scans/opportunities';
import { ReportHeader } from '~/components/scans/report-header';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';
export function meta() {
  const { t } = useTranslation();
  return [{ title: t('scans.heartbeat-details') }];
}

/**
 * HeartbeatReport component renders the detailed report of a specific heartbeat.
 *
 * This component fetches heartbeat data based on the `slug` parameter from the URL
 * and displays various sections of the report, including the overall grade, header,
 * score overview, core web vitals, and recommendations.
 *
 * @returns A JSX element containing the heartbeat report details.
 *
 * @remarks
 * - The `useParams` hook is used to extract the `slug` parameter from the URL.
 * - The `useAPI` hook is used to fetch the heartbeat data from the API endpoint.
 * - The component conditionally renders the report only if the `data` is available.
 *
 * @component
 * @example
 * ```tsx
 * <HeartbeatReport />
 * ```
 */
const HeartbeatReport = () => {
  const { slug } = useParams();
  const { data } = useAPI(Method.GET, [], `heartbeats/${slug}`);
  const featureFlags = useFeatureFlags();
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: t('navigation.home'), link: '/' },
    { title: t('scans.pulses'), link: '/' },
    { title: t('scans.heartbeat-details'), link: `/heartbeats/${slug}` },
  ];

  /**
   * Phased opening
   */
  if (!featureFlags('4aJnwTZcKE8BP8MToXQJC').isEnabled()) {
    return <Forbidden />;
  }

  return (
    data && (
      <>
        <SiteHeader title={t('scans.heartbeat-details')} />
        <Flex className='m-6' gap='3' direction='column'>
          <Breadcrumbs items={breadcrumbItems} />

          {/* Overall Grade */}
          <OverallGrade heartbeat={data} showLink={false} />

          {/* Header */}
          <ReportHeader heartbeat={data} />

          {/* Score Overview */}
          <Grades heartbeats={[data]} />

          {/* Core Web Vitals & Metrics */}
          <CoreWebVitals heartbeats={[data]} />

          {/* Recommendations */}
          <Opportunities heartbeat={data} />
        </Flex>
      </>
    )
  );
};

export default HeartbeatReport;
