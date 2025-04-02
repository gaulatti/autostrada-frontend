import { Flex } from '@radix-ui/themes';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Method, useAPI } from '~/clients/api';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { SummaryCards } from '~/components/dashboard/summary';
import { DatePickerWithRange } from '~/components/date-picker-with-range';
import { SiteHeader } from '~/components/header';
import { OverlaySpinner } from '~/components/spinners';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';
import { DataTable } from './list.table';
import i18n from '~/i18n';

export function meta() {
  return [{ title: i18n.t('scans.pulses') }];
}

/**
 * The t('navigation.page') component represents the main view for displaying pulse statistics.
 * It includes a header, a date range picker, and various data visualizations.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * - Utilizes the `useState` hook to manage the selected date range (`timeRange`).
 * - Uses the `useMemo` hook to create query parameters based on the selected date range.
 * - Fetches data from the `pulses/stats` API endpoint using the `useAPI` hook.
 * - Displays a loading spinner (`OverlaySpinner`) while data is being fetched.
 * - Renders summary cards, stability URLs, and a data table when data is available.
 *
 * @dependencies
 * - `SiteHeader`: Displays the page title and actions (e.g., date picker).
 * - `DatePickerWithRange`: Allows the user to select a date range.
 * - `SummaryCards`: Displays summary statistics based on the fetched data.
 * - `StableUrls`: Displays stability-related URLs from the fetched data.
 * - `DataTable`: Displays detailed data within the selected time range.
 * - `OverlaySpinner`: Displays a loading spinner while data is being fetched.
 *
 * @example
 * ```tsx
 * <Page />
 * ```
 */
const Page = () => {
  const [timeRange, setTimeRange] = useState<DateRange>();
  const featureEnabled = useFeatureFlags();
  const queryParams = useMemo(() => ({ ...timeRange }), [timeRange]);
  const { data } = useAPI(Method.GET, [], `pulses/stats`, queryParams);
  const { t } = useTranslation();

  /**
   * Phased opening
   */
  if (!featureEnabled('O55KuRrIodma8kTP2Ium7').isEnabled()) {
    return <Forbidden />;
  }

  return (
    <>
      <SiteHeader title={t('scans.pulses')} actions={<DatePickerWithRange onUpdate={setTimeRange} />} />
      <Flex className='m-6' gap='6' direction='column'>
        {data ? (
          <>
            <SummaryCards data={data} />
            <StableUrls data={data?.stability} />
            <DataTable timeRange={timeRange} />
          </>
        ) : (
          <OverlaySpinner />
        )}
      </Flex>
    </>
  );
};

export default Page;
