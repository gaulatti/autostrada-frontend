import { Flex } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { CoreWebVitals } from '~/components/metrics/cwv';
import { Grades } from '~/components/metrics/grades';
import { OverallGrade } from '~/components/metrics/overall-grade';
import { ReportHeader } from '~/components/scans/report-header';
import { OverlaySpinner } from '~/components/spinners';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';

export function meta() {
  const { t } = useTranslation();
  return [{ title: t('scans.pulse-details') }];
}

/**
 * Component: PulseReport
 *
 * This component renders a detailed report for a specific pulse, including its overall grades,
 * header information, score comparison, and Core Web Vitals comparison. It fetches the pulse data
 * using the `useAPI` hook and dynamically displays the content based on the retrieved data.
 *
 * @returns {JSX.Element} The rendered PulseReport component.
 *
 * @remarks
 * - Displays a loading state if the pulse data is not yet available.
 * - Utilizes several child components such as `OverallGrade`, `ReportHeader`, t('metrics.grades'), and `CoreWebVitals`
 *   to structure the report.
 *
 * @dependencies
 * - `useParams` for extracting the `slug` parameter from the URL.
 * - `useAPI` for fetching pulse data from the API.
 * - `SiteHeader`, `Breadcrumbs`, `OverallGrade`, `ReportHeader`, t('metrics.grades'), and `CoreWebVitals` components.
 *
 * @example
 * ```tsx
 * <PulseReport />
 * ```
 */
const PulseReport = () => {
  const { slug } = useParams();
  const { data } = useAPI(Method.GET, [], `pulses/${slug}`);
  const featureFlags = useFeatureFlags();
  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = [
    { title: t('navigation.home'), link: '/' },
    { title: t('scans.pulses'), link: '/' },
    { title: t('scans.pulse-details'), link: `/pulses/${slug}` },
  ];

  if (!data?.pulse) {
    return <OverlaySpinner />;
  }

  const pulse = data.pulse;
  const { heartbeats } = pulse;

  /**
   * Phased opening
   */
  if (!featureFlags('ANVTKEb8xZTxCGdJPeHyb').isEnabled()) {
    return <Forbidden />;
  }

  return (
    <>
      <SiteHeader title={t('scans.pulse-details')} />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />

        {/* Overall Grades */}
        <section className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {heartbeats.map((heartbeat: any) => (
            <OverallGrade heartbeat={heartbeat} />
          ))}
        </section>

        {/* Header */}
        <ReportHeader pulse={pulse} />

        {/* Score Comparison */}
        <Grades heartbeats={heartbeats} />

        {/* Core Web Vitals Comparison */}
        <CoreWebVitals heartbeats={heartbeats} />
      </Flex>
    </>
  );
};

export default PulseReport;
