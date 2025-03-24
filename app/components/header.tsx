import type { JSX } from 'react';
import { Separator } from './ui/separator';
import { SidebarTrigger } from './ui/sidebar';

/**
 * A functional component that renders the site header.
 *
 * @param {Object} props - The props object.
 * @param {string} props.title - The title to be displayed in the header.
 * @returns {JSX.Element} The rendered header component.
 *
 * @example
 * ```tsx
 * <SiteHeader title="Dashboard" />
 * ```
 */
const SiteHeader = ({ title }: { title: string }): JSX.Element => {
    return (
        <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mx-2 data-[orientation=vertical]:h-4"
                />
                <h1 className="text-base font-medium">{title}</h1>
            </div>
        </header>
    )
}

export { SiteHeader };
