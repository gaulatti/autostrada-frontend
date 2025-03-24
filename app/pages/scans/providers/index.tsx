import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';

export function meta() {
    return [{ title: 'Providers - Autostrada' }];
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
        title: 'Providers',
        link: '/scans/providers',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Providers' />
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <div>lala</div>
            </Flex>
        </>
    );
};

export default Page;
