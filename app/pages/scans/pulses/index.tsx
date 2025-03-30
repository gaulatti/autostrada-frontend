import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { StableUrls } from '~/components/dashboard/stable-urls';
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

const data = {
    desktop: [
        { name: 'example.com/home', score: 95, variation: 3, trend: [92, 94, 93, 95, 96, 94, 95] },
        { name: 'example.com/about', score: 89, variation: 5, trend: [85, 83, 86, 88, 90, 87, 89] },
        { name: 'example.com/products', score: 83, variation: 6, trend: [78, 76, 80, 82, 84, 81, 83] },
    ],
    mobile: [
        { name: 'example.com/home', score: 88, variation: 4, trend: [85, 86, 87, 89, 90, 88, 88] },
        { name: 'example.com/about', score: 82, variation: 6, trend: [78, 76, 80, 83, 85, 81, 82] },
        { name: 'example.com/products', score: 76, variation: 8, trend: [70, 68, 74, 76, 80, 75, 76] },
    ],
    comparison: [
        { name: 'example.com/home', desktop: 95, mobile: 88, diff: 7 },
        { name: 'example.com/about', desktop: 89, mobile: 82, diff: 7 },
        { name: 'example.com/products', desktop: 83, mobile: 76, diff: 7 },
    ],
};

const Page = () => {
    const [timeRange, setTimeRange] = useState('7d');
    return (
        <>
            <SiteHeader title='Pulses' actions={<RangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />} />
            <Flex className='m-6' gap='6' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <SummaryCards />
                <StableUrls data={data} />
                <DataTable />
            </Flex>
        </>
    );
};

export default Page;
