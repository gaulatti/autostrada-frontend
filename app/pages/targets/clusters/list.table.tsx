import { Link } from '@radix-ui/themes';
import { type ColumnDef, flexRender, getCoreRowModel, type SortingState, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { PaginationControls } from '~/components/pagination-controls';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useRandom } from '~/hooks/useRandom';

export type Cluster = {
  slug: string;
  name: string;
};

export const columns: ColumnDef<Cluster>[] = [
  {
    accessorKey: 'slug',
    header: ({ column }) => {
      const { t } = useTranslation();
      return t('ui.slug');
    },
    cell: ({ cell }) => {
      const value = cell.getValue();
      return (
        value && (
          <Link asChild>
            <NavLink to={`/clusters/${value}`}>
              <code>
                <>{value}</>
              </code>
            </NavLink>
          </Link>
        )
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const { t } = useTranslation();
      return t('ui.name');
    },
    cell: ({ cell, row }) => {
      const value = cell.getValue();
      return (
        value && (
          <Link asChild>
            <NavLink to={`/clusters/${row.original.slug}`}>
              <>{value}</>
            </NavLink>
          </Link>
        )
      );
    },
  },
];

const DataTable = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [random, randomize] = useRandom();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }]);
  const { t } = useTranslation();

  const sortingParams = useMemo(() => {
    if (sorting.length > 0) {
      return { sort: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' };
    }
    return {};
  }, [sorting]);

  const queryParams = useMemo(() => ({ page, pageSize, random, ...sortingParams }), [page, pageSize, sortingParams, random]);
  const { data } = useAPI(Method.GET, [], `clusters`, queryParams);

  const table = useReactTable({
    data: data?.rows ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true,
  });

  const totalPages = useMemo(() => Math.ceil((data?.count || 0) / pageSize), [data, pageSize]);

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {data?.rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  {t('ui.noResults')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-between space-x-2 py-4'>
        <PaginationControls currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export { DataTable };
