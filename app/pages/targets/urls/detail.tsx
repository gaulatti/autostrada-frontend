import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { StableUrls } from '~/components/dashboard/stable-urls';
import { SiteHeader } from '~/components/header';
import { Button } from '~/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { DataTable } from './list.table';
export function meta() {
    return [{ title: 'Pulses - Autostrada' }];
}

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { UrlSummaryCards } from '~/components/dashboard/url.summary';

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

const UrlDetail = () => {
    const { slug } = useParams()
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
    ]
    return (
        <>
            <SiteHeader title='URL Report' actions={<RangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />} />
            <Flex className='m-6' gap='6' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <UrlSummaryCards />
                <StableUrls data={data} />
                <DataTable />
            </Flex>
        </>
    );
};

export default UrlDetail;
