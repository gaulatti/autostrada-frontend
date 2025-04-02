import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from './ui/breadcrumb';

/**
 * Represents an individual breadcrumb item as a record of string key-value pairs.
 *
 * This type can be used to define the structure of breadcrumb items, where each
 * key-value pair represents a property of the breadcrumb (e.g., `label`, `url`, etc.).
 */
export type BreadcrumbItem = Record<string, string>;

/**
 * A React component that renders a breadcrumb navigation bar.
 *
 * @param {Object} props - The props object.
 * @param {BreadcrumbItem[]} props.items - An array of breadcrumb items to display.
 * Each item should contain a `title` and optionally a `link`.
 *
 * @returns {JSX.Element} The rendered breadcrumb navigation component.
 *
 * @example
 * ```tsx
 * const items = [
 *   { title: t('navigation.home'), link: "/" },
 *   { title: "Products", link: "/products" },
 *   { title: "Electronics" }
 * ];
 *
 * <Breadcrumbs items={items} />
 * ```
 */
const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <>
            <BreadcrumbItem className='hidden md:block'>
              {item.link ? (
                <BreadcrumbLink asChild>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </BreadcrumbLink>
              ) : (
                item.title
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { Breadcrumbs };
