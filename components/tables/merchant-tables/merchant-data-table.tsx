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
  useReactTable
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
import Paginator from './merchant-table-paging';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
    pageSize: 6,
  })
  const t = useTranslations()
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [checkboxStates, setCheckboxStates] = useState<any>({
    email: true,
    regNo: true,
    tinNo: true
  });

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
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,

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
      <div className='grid lg:grid-cols-5 gap-4'>
        <div className='lg:hidden'>
          <Accordion type="single" collapsible className="w-full" >
            <AccordionItem value='item1'>
              <AccordionTrigger></AccordionTrigger>
              <AccordionContent className='space-y-5'>
                {
                  table.getAllLeafColumns().map((column) => {
                    return (
                      column.id != 'id' && column.id != 'actions' && checkboxStates[column.id] ?
                        < div key={column.id} >
                          {
                            < Input
                              placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {
          table.getAllLeafColumns().map((column) => {
            return (
              column.id != 'id' && column.id != 'actions' && checkboxStates[column.id] ?
                < div key={column.id} className='hidden lg:inline-block'>
                  {
                    < Input
                      placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
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
              + {t('TAG_ADD_FILTER')}
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
                      {t(column.columnDef.header)}
                    </DropdownMenuCheckboxItem>
                  }
                </div>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div >
      <Separator />
      {/* <ScrollArea className=" h-[calc(80vh-210px)]"> */}
      <Table className="flex flex-col">
        <TableHeader className='flex'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='flex flex-auto min-w-screen bg-gray-300 rounded-lg '>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id} className={cn("flex items-center dark:text-black", index == 0 ? " flex-auto min-w-[70px] max-w-[100px] pl-[20px]" : "min-w-[200px]", header.id == 'status' && "pl-[40px] flex-auto w-[180px] md:sticky lg:right-[150px] lg:z-10 bg-gray-300 ", header.id == 'actions' && "flex-auto items-center justify-center  w-[100px] lg:sticky lg:right-0 bg-gray-300 rounded-tr rounded-br lg:z-10")} >
                    {header.isPlaceholder
                      ? null
                      : header.id == 'actions' ?
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className='text-blue-800'>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {table.getAllLeafColumns().map((column) => (
                              <div key={column.id}>
                                {
                                  column.id != 'id' && column.id != 'status' && column.id != 'actions' &&
                                  <DropdownMenuCheckboxItem

                                    checked={column.getIsVisible()}
                                    onCheckedChange={column.toggleVisibility}
                                  >
                                    {t(column.columnDef.header)}
                                  </DropdownMenuCheckboxItem>
                                }
                              </div>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        : header.id == 'actions' ? null :
                          <div
                            className={
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : ''
                            }
                            onClick={header.column.getToggleSortingHandler()}
                            title={
                              header.column.getCanSort()
                                ? header.column.getNextSortingOrder() === 'asc'
                                  ? 'Sort ascending'
                                  : header.column.getNextSortingOrder() === 'desc'
                                    ? 'Sort descending'
                                    : 'Clear sort'
                                : undefined
                            }
                          >
                            <div className='flex items-center'>
                              {
                                t(flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                ))}
                              {{
                                asc: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>,
                                desc: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></svg>,
                              }[header.column.getIsSorted() as string] ??
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>}
                            </div>
                          </div>
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
                className={cn('flex flex-row py-[5px]')}

              >
                {row.getVisibleCells().map((cell, index) => {
                  const data = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                  return (
                    <TableCell key={cell.id} className={cn("flex items-center border-b ", cell.column.id == 'merchantId' ? " min-w-[70px] max-w-[100px] pl-[20px]" : "min-w-[200px]", cell.column.id == 'status' && "flex-auto items-center justify-center w-[180px] lg:sticky lg:right-[150px] bg-white md:z-10 lg:shadow dark:bg-black dark:shadow-gray-400", cell.column.id == 'actions' && "flex-auto items-center justify-center  w-[100px] bg-white lg:sticky lg:right-0 lg:z-10 dark:bg-black")}>
                      {
                        // flexRender(
                        //   cell.column.columnDef.cell,
                        //   cell.getContext()
                        // )

                        data != null && data != undefined && data != '' ? data : "NA"
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
                {t('TAG_NO_RESULTS')}.
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
