import { Flex } from '@radix-ui/themes';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';

export function meta() {
  return [{ title: 'Providers - Autostrada' }];
}

const Page = () => {
  const { t } = useTranslation();
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: t('navigation.home'),
      link: '/',
    },
    {
      title: t('scans.providers'),
      link: '/providers',
    },
  ];

  return (
    <>
      <SiteHeader title={t('scans.providers')} />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <DataTable />
      </Flex>
    </>
  );
};

export default Page;
