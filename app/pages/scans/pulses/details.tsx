import { Flex } from '@radix-ui/themes';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { OverallGrade } from '~/components/metrics/overall-grade';
import { CwvComparison } from '~/components/scans/cwv-comparison';
import { GradesComparison } from '~/components/scans/grades-comparison';
import { ReportHeader } from '~/components/scans/report-header';
import { transformHeartbeat } from '~/utils/dashboards';

export function meta() {
  return [{ title: 'Pulses Report - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
  { title: 'Home', link: '/' },
  { title: 'Scans' },
  { title: 'Pulses', link: '/scans/pulses' },
  { title: 'Pulse Report' },
];

const Page = () => {
  const { slug } = useParams();
  const { data } = useAPI(Method.GET, [], `pulses/${slug}`);

  if (!data?.pulse) {
    return <div>Loading...</div>;
  }

  const pulse = data.pulse;
  const heartbeats = (pulse.heartbeats || []).map(transformHeartbeat);

  return (
    <>
      <SiteHeader title="Pulse Report" />
      <Flex className="m-6" gap="3" direction="column">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Overall Grades */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {heartbeats.map((heartbeat: any) => <OverallGrade heartbeat={heartbeat} />)}
        </section>

        {/* Header */}
        <ReportHeader pulse={pulse} />

        {/* Score Comparison */}
        <GradesComparison heartbeats={heartbeats} />

        {/* Core Web Vitals Comparison */}
        <CwvComparison heartbeats={heartbeats} />

        {/* Tabs for Opportunities and Resources */}
        {/* <Opportunities /> */}
      </Flex>
    </>
  );
};

export default Page;