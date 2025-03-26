import { Link } from '@radix-ui/themes';
import { type ColumnDef, flexRender, getCoreRowModel, type SortingState, useReactTable } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { NavLink } from 'react-router';
import { Method, useAPI } from '~/clients/api';
import { PaginationControls } from '~/components/pagination-controls';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { useRandom } from '~/hooks/useRandom';

export type Provider = {
  slug: string;
  url: { slug: string; url: string };
};

export const columns: ColumnDef<Provider>[] = [
  {
    accessorKey: 'slug',
    header: 'Slug',
    cell: ({ cell }) => {
      const value = cell.getValue();
      return (
        value && (
          <Link asChild>
            <NavLink to={`/scans/providers/${value}`}>
              <code><>{value}</></code>
            </NavLink>
          </Link>
        )
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ cell }) => {
      const value = cell.getValue() as { slug: string, url: string };
      return (
        value && (
          <Link asChild>
            <NavLink to={`/scans/providers/${value.slug}`}>
              <>{value.url}</>
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

  const sortingParams = useMemo(() => {
    if (sorting.length > 0) {
      return { sort: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' };
    }
    return {};
  }, [sorting]);

  const queryParams = useMemo(() => ({ page, pageSize, random, ...sortingParams }), [page, pageSize, sortingParams, random]);
  const { data } = useAPI(Method.GET, [], `providers`, queryParams);

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
    <div className='m-4'>
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
                  No results.
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
