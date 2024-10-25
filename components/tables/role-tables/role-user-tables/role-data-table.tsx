'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { View } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from '@radix-ui/react-checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Paginator from './role-table-paging';
import PermissionCheck from '@/components/permission-check';
import { useTranslations } from 'next-intl';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 3,
  })

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    merchant: false
  });
  const [checkboxStates, setCheckboxStates] = useState<any>({});
  const t = useTranslations()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Search params
  const page = searchParams?.get('page') ?? '1';
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  const per_page = searchParams?.get('limit') ?? '10';
  const perPageAsNumber = Number(per_page);
  const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

  });

  const handleCheckboxChange = (columnId: string) => {
    setCheckboxStates((prev: any) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPaginations] =
    React.useState<PaginationState>({
      pageIndex: fallbackPage - 1,
      pageSize: fallbackPerPage
    });

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize
      })}`,
      {
        scroll: false
      }
    );

  }, [pageIndex, pageSize]);


  return (
    <>
      <PermissionCheck permission="role.view_merchant" onPermissionGranted={() => setColumnVisibility({ merchant: true })}>
        <></>
      </PermissionCheck>
      {/* <div className='grid grid-cols-5 gap-4'>
        {
          table.getAllLeafColumns().map((column) => {
            return (
              column.id != 'id' && column.id != 'actions' && checkboxStates[column.id] ?
                < div key={column.id} >
                  {

                    < Input
                      placeholder={`Search ${column.id}...`}
                      value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                      onChange={(event) => {
                        if (checkboxStates[column.id]) {
                          column.setFilterValue(event.target.value);
                        }
                      }}
                      className="w-full md:max-w-sm"
                    />
                  }
                </div> : ''
            )

          }

          )
        }
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-gray-300 text-black hover:bg-gray-400'>
              + Add Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {table.getAllLeafColumns().map((column) => (
                <div key={column.id}>
                  {
                    column.id != 'id' && column.id != 'actions' &&
                    <DropdownMenuCheckboxItem
                      checked={checkboxStates[column.id] || false}
                      onCheckedChange={() => {
                        handleCheckboxChange(column.id);
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  }
                </div>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div > */}
      <Separator />
      {/* <ScrollArea className=" h-[calc(80vh-210px)]"> */}
      <Table className="flex flex-col">
        <TableHeader className='flex'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='flex flex-auto min-w-screen bg-gray-300 rounded-lg '>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id} className={cn("flex items-center dark:text-black", index == 0 ? " flex-auto min-w-[50px] max-w-[100px] pl-[20px]" : "flex-1 w-full ", header.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")} >
                    {header.isPlaceholder
                      ? null
                      :
                      t(flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ))
                    }
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=''>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn('flex flex-row py-[5px]', rowIndex == data.length - 1 && "items-center justify-center")}

              >
                {row.getVisibleCells().map((cell, index) => {
                  return (
                    <TableCell key={cell.id} className={cn("flex items-center border-b ", index == 0 ? " flex-auto min-w-[50px] max-w-[100px] pl-[20px]" : "flex-1 w-full", cell.column.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")}>
                      {
                        cell.column.id === 'muId' ?
                          <p>{cell.row.index + 1}</p>
                          :
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                      }
                    </TableCell>
                  )
                }
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
      {/* <ScrollBar orientation="horizontal" /> */}
      {/* </ScrollArea> */}
      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Paginator
            currentPage={table.getState().pagination.pageIndex + 1}
            totalPages={table.getPageCount()}
            onPageChange={(pageNumber: number) => table.setPageIndex(pageNumber - 1)}
            showPreviousNext
          />
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
        </div>
      </div>
    </>
  );
}
