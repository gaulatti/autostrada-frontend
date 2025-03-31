import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useParams } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { TimeOfDay } from '~/components/dashboard/cards/time.day';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { UrlSummaryCards } from '~/components/dashboard/url.summary';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { OverlaySpinner } from '~/components/spinners';
import { DataTable } from './list.table';
export function meta() {
  return [{ title: 'Url Report - Autostrada' }];
}

const cwvHistoryData = {
  desktop: [
    { date: 'Mar 21', lcp: 2.1, fid: 0.08, cls: 0.12, ttfb: 0.35 },
    { date: 'Mar 22', lcp: 2.3, fid: 0.09, cls: 0.14, ttfb: 0.38 },
    { date: 'Mar 23', lcp: 2.0, fid: 0.07, cls: 0.11, ttfb: 0.32 },
    { date: 'Mar 24', lcp: 1.9, fid: 0.06, cls: 0.1, ttfb: 0.3 },
    { date: 'Mar 25', lcp: 1.8, fid: 0.06, cls: 0.09, ttfb: 0.28 },
    { date: 'Mar 26', lcp: 2.0, fid: 0.07, cls: 0.1, ttfb: 0.31 },
    { date: 'Mar 27', lcp: 1.9, fid: 0.07, cls: 0.1, ttfb: 0.3 },
  ],
  mobile: [
    { date: 'Mar 21', lcp: 2.8, fid: 0.12, cls: 0.18, ttfb: 0.45 },
    { date: 'Mar 22', lcp: 3.0, fid: 0.14, cls: 0.19, ttfb: 0.48 },
    { date: 'Mar 23', lcp: 2.7, fid: 0.11, cls: 0.16, ttfb: 0.42 },
    { date: 'Mar 24', lcp: 2.5, fid: 0.1, cls: 0.15, ttfb: 0.4 },
    { date: 'Mar 25', lcp: 2.4, fid: 0.09, cls: 0.14, ttfb: 0.38 },
    { date: 'Mar 26', lcp: 2.6, fid: 0.11, cls: 0.15, ttfb: 0.41 },
    { date: 'Mar 27', lcp: 2.5, fid: 0.1, cls: 0.15, ttfb: 0.4 },
  ],
};

const gradesData = {
  desktop: [
    { metric: 'Performance', value: 85 },
    { metric: 'Accessibility', value: 92 },
    { metric: 'SEO', value: 88 },
    { metric: 'Best Practices', value: 90 },
    { metric: 'Security', value: 95 },
    { metric: 'Aesthetics', value: 82 },
  ],
  mobile: [
    { metric: 'Performance', value: 78 },
    { metric: 'Accessibility', value: 85 },
    { metric: 'SEO', value: 90 },
    { metric: 'Best Practices', value: 82 },
    { metric: 'Security', value: 88 },
    { metric: 'Aesthetics', value: 75 },
  ],
};

const UrlDetail = () => {
  const { slug } = useParams();
  const [timeRange, setTimeRange] = useState<DateRange>();
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `urls/${slug}`, queryParams);

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: 'Urls',
      link: '/urls',
    },
    {
      title: 'URL Report',
      link: `/urls/${slug}`,
    },
  ];

  return (
    <>
      <SiteHeader title='URL Report' actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        {slug && data ? (
          <>
            <UrlSummaryCards data={data!.stats} />
            {/* <div className='grid grid-cols-2 gap-6'>
          <CwvHistory data={cwvHistoryData} />
          <GradesRadial data={gradesData} />
        </div> */}
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
