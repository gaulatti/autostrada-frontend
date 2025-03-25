import { Flex } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';

export function meta() {
    return [{ title: 'Projects - Autostrada' }];
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
        title: 'Projects',
        link: '/scans/projects',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Projects'  button={{ action: () => alert('lala'), icon: <Plus /> }}/>
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <div>lala</div>
            </Flex>
        </>
    );
};

export default Page;
