import { Flex } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { CwvHistory } from '~/components/dashboard/cards/cwv.history';
import { GradesRadial } from '~/components/dashboard/cards/grades.radial';
import { TimeOfDay } from '~/components/dashboard/cards/time.day';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { UrlSummaryCards } from '~/components/dashboard/url.summary';
import { SiteHeader } from '~/components/header';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
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

const generateTimeOfDayData = (isMobile = false) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const result = [];

  // Performance penalty for mobile
  const mobilePenalty = isMobile ? Math.random() * 4 : 0;

  hours.forEach((hour) => {
    const basePerformance =
      hour >= 0 && hour < 6
        ? 75 + Math.random() * 25 - mobilePenalty
        : hour >= 6 && hour < 12
        ? 50 + Math.random() * 25 - mobilePenalty
        : hour >= 12 && hour < 18
        ? 100 - Math.random() * 50 - mobilePenalty
        : 75 + Math.random() * 25 - mobilePenalty;

    const pointCount = 15 + Math.floor(Math.random() * 15);

    for (let i = 0; i < pointCount; i++) {
      const variation = Math.random() * 10 - 5; // -5 to +5
      const performance = Math.min(100, Math.max(50, basePerformance + variation));
      const minute = Math.floor(Math.random() * 60);
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      const timeDecimal = hour + minute / 60;

      result.push({
        hour: `${formattedHour}:${formattedMinute}`,
        hourNum: hour,
        minuteNum: minute,
        timeDecimal: timeDecimal,
        performance: Math.round(performance),
      });
    }
  });

  return result;
};

const timeOfDayData = {
  desktop: generateTimeOfDayData(false),
  mobile: generateTimeOfDayData(true),
};

/**
 * A dropdown-based range selector component for selecting a time range.
 *
 * @param {Object} props - The props for the RangeSelector component.
 * @param {(timeRange: string) => void} props.setTimeRange - A callback function to update the selected time range.
 * @param {string} props.timeRange - The currently selected time range.
 *                                    Possible values are '7d', '30d', '90d', or 'Custom'.
 *
 * @returns {JSX.Element} A dropdown menu allowing the user to select a time range.
 */
const RangeSelector = ({ setTimeRange, timeRange }: any) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm'>
          {timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : timeRange === '90d' ? 'Last 90 days' : 'Custom'}
          <ChevronDown className='w-4 h-4 ml-2' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTimeRange('7d')}>Last 7 days</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTimeRange('30d')}>Last 30 days</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTimeRange('90d')}>Last 90 days</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const data = {
  desktop: [{ name: 'example.com/home', score: 95, variation: 3, trend: [92, 94, 93, 95, 96, 94, 95] }],
  mobile: [{ name: 'example.com/home', score: 88, variation: 4, trend: [85, 86, 87, 89, 90, 88, 88] }],
  comparison: [{ name: 'example.com/home', desktop: 95, mobile: 88, diff: 7 }],
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
  const [timeRange, setTimeRange] = useState('7d');
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
      <SiteHeader title='URL Report' actions={<RangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <UrlSummaryCards />
        <div className='grid grid-cols-2 gap-6'>
          <CwvHistory data={cwvHistoryData} />
          <GradesRadial data={gradesData} />
        </div>
        <StableUrls data={data} />
        <TimeOfDay data={timeOfDayData} />
        <DataTable />
      </Flex>
    </>
  );
};

export default UrlDetail;
