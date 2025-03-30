import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { SummaryCards } from '~/components/dashboard/summary';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';

export function meta() {
  return [{ title: 'Pulses - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
  {
    title: 'Home',
    link: '/',
  },
];

const Page = () => {
  const [timeRange, setTimeRange] = useState<DateRange>();
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `pulses/stats`, queryParams);

  return (
    <>
      <SiteHeader title='Pulses' actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <SummaryCards data={data} />
        <StableUrls data={data?.stability} />
        <DataTable timeRange={timeRange} />
      </Flex>
    </>
  );
};

export default Page;
