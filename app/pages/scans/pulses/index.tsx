import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { MostStableUrls } from '~/components/dashboard/stable-urls';
import { SummaryCards } from '~/components/dashboard/summary';
import { SiteHeader } from '~/components/header';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
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

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

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

const Page = () => {
    const [timeRange, setTimeRange] = useState('7d');
    return (
        <>
            <SiteHeader title='Pulses' actions={<RangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />} />
            <Flex className='m-6' gap='6' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <SummaryCards />
                <MostStableUrls />
                <DataTable />
            </Flex>
        </>
    );
};

export default Page;
