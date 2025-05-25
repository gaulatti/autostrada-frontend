import { Button } from '@radix-ui/themes';
import { type ColumnDef, flexRender, getCoreRowModel, type SortingState, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';
import { Method, useAPI } from '~/clients/api';
import { PaginationControls } from '~/components/pagination-controls';
import { RenderNavLink } from '~/components/ui/render.navlink';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip';
import { useRandom } from '~/hooks/useRandom';
import type { 
  PulseData, 
  StabilityData, 
  PlatformDifference, 
  TimeOfDayEntry, 
  HistoryEntry, 
  UrlStats 
} from '~/models/api.types';
export type Url = {
  slug: string;
  url: { slug: string; url: string };
};

const useColumns = (): ColumnDef<PulseData>[] => {
  const { t } = useTranslation();
  return [
    {
      accessorKey: 'slug',
      header: () => t('ui.slug'),
      cell: ({ cell }) => {
        const value = cell.getValue() as string;
        return (
          value && (
            <RenderNavLink to={`/pulses/${value}`}>
              <code>{value}</code>
            </RenderNavLink>
          )
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {t('ui.created')}
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ cell }) => {
        const value = cell.getValue();
        return value ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{moment().diff(value, 'hours') < 24 ? moment(value).fromNow() : moment(value).format('MMM D, YYYY [at] HH:mm')}</TooltipTrigger>
              <TooltipContent>
                <>{value}</>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          ''
        );
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          {t('ui.updated')}
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      ),
      cell: ({ cell }) => {
        const value = cell.getValue();
        return value ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{moment().diff(value, 'hours') < 24 ? moment(value).fromNow() : moment(value).format('MMM D, YYYY [at] HH:mm')}</TooltipTrigger>
              <TooltipContent>
                <>{value}</>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          ''
        );
      },
    },
  ];
};

interface DataTableProps {
  slug: string; 
  timeRange?: DateRange;
  platform?: string;
  provider?: string;
}

const DataTable = ({ slug, timeRange, platform, provider }: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [random, randomize] = useRandom();
  const [sorting, setSorting] = useState<SortingState>([{ id: 'updatedAt', desc: true }]);
  const { t } = useTranslation();
  const columns = useColumns();

  const sortingParams = useMemo(() => {
    if (sorting.length > 0) {
      return { sort: sorting[0].id, order: sorting[0].desc ? 'desc' : 'asc' };
    }
    return {};
  }, [sorting]);

  const queryParams = useMemo(() => {
    const params: Record<string, any> = {};
    
    // Add time range parameters if they exist and are valid
    if (timeRange?.from && timeRange?.to) {
      // Ensure from date is before or equal to to date
      const fromDate = new Date(timeRange.from);
      const toDate = new Date(timeRange.to);
      
      if (fromDate <= toDate) {
        // Valid range: use ISO strings for API
        params.from = fromDate.toISOString();
        params.to = toDate.toISOString();
      }
    }
    
    // Add platform and provider if they exist
    if (platform) params.platform = platform;
    if (provider) params.provider = provider;
    
    // Note: pagination and sorting parameters have been removed as per requirements
    
    return params;
  }, [timeRange, platform, provider]);
  
  const { data } = useAPI(Method.GET, [queryParams], `urls/${slug}/stats`, queryParams);

  // Using the UrlStats interface from the API types module

  // Map the new stats response to the format expected by the table
  const mappedData = useMemo(() => {
    // If no data is available or pulses are not included, return empty dataset
    if (!data || !data.pulses) return { rows: [], count: 0 };
    
    // Extract pulses data from the stats response
    return {
      rows: data.pulses.rows || [],
      count: data.pulses.count || 0
    };
  }, [data]);

  const table = useReactTable({
    data: mappedData.rows as PulseData[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true,
  });

  const totalPages = useMemo(() => Math.ceil((mappedData.count || 0) / pageSize), [mappedData, pageSize]);

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
            {mappedData.rows.length ? (
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
