'use client';

import {
  ColumnDef,
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
import React, { useCallback, useEffect, useState } from 'react';
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
// import { Checkbox } from '@radix-ui/react-checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Paginator from './user-table-paging';
import PermissionCheck from '@/components/permission-check';
import { merchants } from '@/constants/data';
import { boolean } from 'zod';
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
  });
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    merchant: false
  });
  const [checkboxStates, setCheckboxStates] = useState<any>({
    name: true,
    role: true
  });

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
      columnVisibility
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

  // const createQueryString = React.useCallback(
  //   (params: Record<string, string | number | null>) => {
  //     const newSearchParams = new URLSearchParams(searchParams?.toString());

  //     for (const [key, value] of Object.entries(params)) {
  //       if (value === null) {
  //         newSearchParams.delete(key);
  //       } else {
  //         newSearchParams.set(key, String(value));
  //       }
  //     }

  //     return newSearchParams.toString();
  //   },
  //   [searchParams]
  // );

  // // Handle server-side pagination
  // const [{ pageIndex, pageSize }, setPaginations] =
  //   React.useState<PaginationState>({
  //     pageIndex: fallbackPage - 1,
  //     pageSize: fallbackPerPage
  //   });

  // React.useEffect(() => {
  //   router.push(
  //     `${pathname}?${createQueryString({
  //       page: pageIndex + 1,
  //       limit: pageSize
  //     })}`,
  //     {
  //       scroll: false
  //     }
  //   );

  // }, [pageIndex, pageSize]);


  // React.useEffect(() => {
  //   if (searchValue?.length > 0) {
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         page: null,
  //         limit: null,
  //         search: searchValue
  //       })}`,
  //       {
  //         scroll: false
  //       }
  //     );
  //   }
  //   if (searchValue?.length === 0 || searchValue === undefined) {
  //     router.push(
  //       `${pathname}?${createQueryString({
  //         page: null,
  //         limit: null,
  //         search: null
  //       })}`,
  //       {
  //         scroll: false
  //       }
  //     );
  //   }

  //   setPaginations((prev) => ({ ...prev, pageIndex: 0 }));

  // }, [searchValue]);

  // useEffect(() => {

  // }, []);

  const handlePermissionGranted = useCallback(() => {
    setColumnVisibility(prev => ({
      ...prev,
      merchant: true,
    }));
  }, []);


  return (
    <>
      <PermissionCheck
        permission="userList.su.read"
        onPermissionGranted={handlePermissionGranted}
      >
        <></>
      </PermissionCheck>
      <div className='grid lg:grid-cols-5 gap-4 '>

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
                    column.id != 'id' && column.id != 'actions' && column.id == 'merchant' ?
                      <PermissionCheck permission='user.view_merchant'>
                        <DropdownMenuCheckboxItem
                          checked={checkboxStates['merchant'] || false}
                          onCheckedChange={() => {
                            handleCheckboxChange('merchant');
                          }}
                        >
                          {t('TAG_MERCHANT')}
                        </DropdownMenuCheckboxItem>
                      </PermissionCheck>
                      : column.id != 'id' && column.id != 'actions' &&
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

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className='bg-gray-300 text-black hover:bg-gray-400'>
              + Add Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={searchName}
                onCheckedChange={setSearchName}
              >
                Name
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={searchRole}
                onCheckedChange={setSearchRole}
              >
                Role
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={searchStatus}
                onCheckedChange={setSearchStatus}
              >
                Status
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <Separator />
      <ScrollArea className=" h-[calc(80vh-210px)]">
        <Table className="flex flex-col">
          <TableHeader className='flex bg-gray-300 rounded-lg '>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='flex flex-row w-full py-[10px]'>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} className={cn("flex  items-center dark:text-black", index == 0 ? " flex-auto max-w-[100px] pl-[20px]" : "flex-1 md:w-full min-w-[100px]", header.id == 'status' && " flex-auto max-w-[200px]", header.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")} >
                      {header.isPlaceholder
                        ? null
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
                              {t(flexRender(
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
          <TableBody className=' -col '>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('flex flex-row  py-[5px]')}

                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell key={cell.id} className={cn("flex flex-row items-center border-b", index == 0 ? " flex-auto min-w-[100px] max-w-[100px] pl-[30px]" : "flex-1 md:w-full min-w-[100px]", cell.column.id == 'status' && "flex flex-auto  max-w-[200px] ", cell.column.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")}>
                        {
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
                  {t('TAG_NO_RESULTS')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
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

