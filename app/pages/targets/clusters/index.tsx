import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';
import { DataTable } from './list.table';
import { PerformantUrls } from '~/components/dashboard/performant.urls';
import { PerformantClusters } from '~/components/dashboard/performant.clusters';

export function meta() {
  return [{ title: 'Clusters - Autostrada' }];
}

const Clusters = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState<DateRange>();
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `clusters/stats`, queryParams);

  const featureFlags = useFeatureFlags();
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: t('navigation.home'),
      link: '/',
    },
    {
      title: t('targets.clusters'),
      link: '/clusters',
    },
  ];

  /**
   * Phased opening
   */
  if (!featureFlags('6jraJ9xFy3nFzAYQzb40f').isEnabled()) {
    return <Forbidden />;
  }

  return (
    <>
      <SiteHeader title={t('targets.clusters')} actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <PerformantClusters data={data?.stability} />
        <DataTable />
      </Flex>
    </>
  );
};

export default Clusters;
