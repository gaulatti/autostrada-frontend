import { Flex } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';

export function meta() {
    return [{ title: 'Projects - Autostrada' }];
}

const breadcrumbItems: BreadcrumbItem[] = [
    {
        title: 'Home',
        link: '/',
    },
    {
        title: 'Projects',
        link: '/projects',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Projects' button={{ action: () => alert('lala'), icon: <Plus /> }} />
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <DataTable />
            </Flex>
        </>
    );
};

export default Page;
