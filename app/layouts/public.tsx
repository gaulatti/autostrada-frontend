import { Outlet } from 'react-router';
import { AppSidebar } from '~/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { useFeatureFlags } from '~/hooks/useFeatureFlags';
import { Forbidden } from '~/pages/403';

const PublicLayout = () => {
  const featureEnabled = useFeatureFlags();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{featureEnabled('NjAifRCOjQn6XL8n1oI3E').isEnabled() ? <Outlet /> : <Forbidden />}</SidebarInset>
    </SidebarProvider>
  );
};

export default PublicLayout;
