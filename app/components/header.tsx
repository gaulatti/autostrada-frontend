import { Button } from '@radix-ui/themes';
import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

/**
 * A functional component that renders the site's header with a title, optional button, and additional actions.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to display in the header.
 * @param {Object} [props.button] - An optional button configuration.
 * @param {() => void} props.button.action - The callback function to execute when the button is clicked.
 * @param {JSX.Element} props.button.icon - The icon to display inside the button.
 * @param {JSX.Element} props.actions - Additional actions or elements to display in the header.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const SiteHeader = ({ title, button, actions }: { title: string; button?: { action: () => void; icon: JSX.Element }; actions?: JSX.Element }): JSX.Element => {
  const { t } = useTranslation();

  return (
    <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear'>
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 justify-between'>
        <section className='flex'>
          <SidebarTrigger className='-ml-1' />
          <Separator orientation='vertical' className='mx-2 data-[orientation=vertical]:h-4' />
          <h1 className='text-base font-medium'>{t(title)}</h1>
        </section>
        {actions}
        {button && <Button onClick={button.action}>{button.icon}</Button>}
      </div>
    </header>
  );
};

export { SiteHeader };
