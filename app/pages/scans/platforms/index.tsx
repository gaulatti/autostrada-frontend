import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';

export function meta() {
    return [{ title: 'Platforms - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Platforms',
        link: '/platforms',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Platforms' />
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <DataTable />
            </Flex>
        </>
    );
};

export default Page;
