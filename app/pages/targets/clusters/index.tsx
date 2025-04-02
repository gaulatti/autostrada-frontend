import { Flex } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Breadcrumbs, type BreadcrumbItem } from '~/components/breadcrumbs';
import { SiteHeader } from '~/components/header';
import { DataTable } from './list.table';

export function meta() {
  return [{ title: 'Clusters - Autostrada' }];
}

const Clusters = () => {
  const { t } = useTranslation();
  const breadcrumbItems: BreadcrumbItem[] = [
    {
      title: t('navigation.home'),
      link: '/',
    },
    {
      title: t('targets.clusters'),
      link: '/clusters',
    },
  ];
  return (
    <>
      <SiteHeader title={t('targets.clusters')} button={{ action: () => alert('lala'), icon: <Plus /> }} />
      <Flex className='m-6' gap='3' direction='column'>
        <Breadcrumbs items={breadcrumbItems} />
        <DataTable />
      </Flex>
    </>
  );
};

export default Clusters;
