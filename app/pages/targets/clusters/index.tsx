import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';
import { Plus } from 'lucide-react';

export function meta() {
    return [{ title: 'Clusters - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Scans',
    },
    {
        title: 'Clusters',
        link: '/targets/clusters',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Clusters' button={{ action: () => alert('lala'), icon: <Plus /> }}/>
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <DataTable />
            </Flex>
        </>
    );
};

export default Page;
