import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Method, useAPI } from '~/clients/api';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { PerformantUrls } from '~/components/dashboard/performant.urls';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { OverlaySpinner } from '~/components/spinners';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';
import { DataTable } from './list.table';

export function meta() {
  return [{ title: 'Urls - Autostrada' }];
}

const Urls = () => {
  const [timeRange, setTimeRange] = useState<DateRange>();
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `urls/stats`, queryParams);
  const featureFlags = useFeatureFlags();

  const { t } = useTranslation();

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: t('navigation.home'),
      link: '/',
    },
    {
      title: t('targets.urls'),
      link: '/urls',
    },
  ];

  /**
   * Phased opening
   */
  if (!featureFlags('mdYDhWgQMjgxHstc2O0mG').isEnabled()) {
    return <Forbidden />;
  }

  return (
    <>
      <SiteHeader title={t('targets.urls')} actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='3' direction='column'>
        {data ? (
          <>
            <Breadcrumbs items={breadcrumbItems} />
            <PerformantUrls data={data?.stability} />
            <DataTable />
          </>
        ) : (
          <OverlaySpinner />
        )}
      </Flex>
    </>
  );
};

export default Urls;
