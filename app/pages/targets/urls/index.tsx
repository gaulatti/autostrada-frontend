import { Flex } from '@radix-ui/themes';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';

export function meta() {
    return [{ title: 'Urls - Autostrada' }];
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
        title: 'Urls',
        link: '/targets/urls',
    },
]


const Page = () => {
    return (
        <>
            <SiteHeader title='Urls' />
            <Flex className='m-6' gap='3' direction='column'>
                <Breadcrumbs items={breadcrumbItems} />
                <div>lala</div>
            </Flex>
        </>
    );
};

export default Page;
