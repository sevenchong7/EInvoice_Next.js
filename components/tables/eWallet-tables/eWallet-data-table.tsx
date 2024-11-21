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
import React, { useEffect, useState } from 'react';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/customerAccordion';
import { useTranslations } from 'next-intl';
import { MerchantContent } from '@/constants/data';
import { useDataTaskStore } from '@/lib/store/dataStore';
import Paginator from './eWallet-table-paging';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  totalPage: number;
  currentPage: number;
  usePageCallback: any;
  resetAllSelectedTitle: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPage,
  currentPage,
  usePageCallback,
  resetAllSelectedTitle
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const t = useTranslations()
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [checkboxStates, setCheckboxStates] = useState<any>({
    trxType: true,
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
  const setEwalletFilterData = useDataTaskStore((state) => state.setEwalletFilterData)
  const removeEwalletFilterData = useDataTaskStore((state) => state.removeEwalletFilterData)
  const [statementStartDate, setStatementStartDate] = useState('')
  const [statementEndDate, setStatementEndDate] = useState('')



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
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'auto'

  });

  const handleCheckboxChange = (columnId: string) => {
    setCheckboxStates((prev: any) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const checkHeadersInData = (data: any, index: number, headers: string) => {
    // Get the keys of the data object
    const dataKeys = Object.keys(data[index]);

    // Check if any header exists in the dataKeys
    return dataKeys.includes(headers);
  };

  useEffect(() => {
    if (resetAllSelectedTitle) {
      table.getAllLeafColumns().map((column) => {
        column.setFilterValue('')
        removeEwalletFilterData()
      })
    }
  }, [resetAllSelectedTitle])

  useEffect(() => {
    removeEwalletFilterData()
  }, [])

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

  // Handle server-side pagination
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


  return (
    <>
      <div className='grid lg:grid-cols-2 gap-4 p-2 bg-[#dddddd] dark:bg-gray-700 rounded'>

        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button className='bg-gray-400 text-black hover:bg-gray-500 col-span-2 dark:text-white'>
              + {t('TAG_ADD_FILTER')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              {table.getAllLeafColumns().map((column) => (
                <div key={column.id}>
                  {
                    column.id !== 'id' && column.id !== 'actions' && column.id !== 'amountIn' && column.id !== 'amountOut' && column.id !== 'remark' &&
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

        <div className='lg:hidden col-span-2'>
          <Accordion type="single" collapsible className="" >
            <AccordionItem value='item1' className='flex flex-col flex-1  w-full'>
              <AccordionTrigger>Item</AccordionTrigger>
              <AccordionContent className='space-y-5'>
                {
                  table.getAllLeafColumns().map((column) => {
                    return (
                      column.id != 'id' && column.id != 'actions' && checkboxStates[column.id] ?
                        < div key={column.id} className='p-1'>
                          <div className='p-1 relative flex items-center'>
                            < Input
                              className='bg-white dark:text-black pr-10'
                              placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                              value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                              onChange={(event) => {
                                if (checkboxStates[column.id]) {
                                  column.setFilterValue(event.target.value);
                                  setEwalletFilterData(column.id, event.target.value)
                                }

                              }}
                            // className="flex flex-1 w-full md:max-w-sm"
                            />
                            <button className='absolute right-4 z-10' onClick={() => {
                              column.setFilterValue('');
                              setEwalletFilterData(column.id, '')
                            }}>
                              <svg className='text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            </button>
                          </div>
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
              column.id !== 'id' && column.id !== 'actions' && column.id !== 'amountIn' && column.id !== 'amountOut' && column.id !== 'remark' && checkboxStates[column.id] ?
                < div key={column.id} className={cn(column.id == 'statementDate' && 'col-span-2', 'hidden lg:inline-block')}>
                  <Accordion type="single" collapsible className="w-full bg-gray-400 rounded-md px-2" >
                    <AccordionItem value='item1'>
                      <AccordionTrigger><div >{t(column.columnDef.header)}</div></AccordionTrigger>
                      <AccordionContent className='space-y-5'>
                        {
                          column.id == 'statementDate' ?
                            <div className='p-1 grid grid-cols-2 gap-4'>
                              <div className='flex space-x-4 items-center'>
                                <p>{t('TAG_START_DATE')} :</p>
                                < Input
                                  type='date'
                                  className='bg-white dark:text-black pr-10'
                                  placeholder={t('TAG_START_DATE')}
                                  value={statementStartDate}
                                  onChange={(value) => {
                                    setStatementStartDate(value.target.value)
                                    setEwalletFilterData('statementStartDate', value.target.value)
                                    // if (checkboxStates[column.id]) {
                                    //   column.setFilterValue(event.target.value);
                                    //   setMerchantFilterData(column.id, event.target.value)
                                    // }

                                  }}
                                // className="flex flex-1 w-full md:max-w-sm"
                                />
                              </div>
                              <div className='flex space-x-4 items-center'>
                                <p>{t('TAG_END_DATE')} :</p>
                                < Input
                                  type='date'
                                  className='bg-white dark:text-black pr-10'
                                  placeholder={t('TAG_END_DATE')}
                                  value={statementEndDate}
                                  onChange={(value) => {
                                    setStatementEndDate(value.target.value)
                                    setEwalletFilterData('statementEndDate', value.target.value)
                                  }}
                                // className="flex flex-1 w-full md:max-w-sm"
                                />
                              </div>
                            </div> :
                            <div className='p-1 relative flex items-center'>
                              < Input
                                className='bg-white dark:text-black pr-10'
                                placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                                value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                onChange={(event) => {
                                  if (checkboxStates[column.id]) {
                                    column.setFilterValue(event.target.value);
                                    setEwalletFilterData(column.id, event.target.value)
                                  }

                                }}
                              // className="flex flex-1 w-full md:max-w-sm"
                              />
                              <button className='absolute right-4 z-10' onClick={() => {
                                column.setFilterValue('');
                                setEwalletFilterData(column.id, '')
                              }}>
                                <svg className='text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                              </button>
                            </div>
                        }

                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div> : ''
            )
          }
          )
        }

      </div >
      <Separator />
      <div className=' grid lg:grid-cols-2 gap-4 items-center'>
        <div></div>
        <Input
          type="text"
          value={globalFilter || ''} // Ensure it's not undefined
          onChange={(e) => setGlobalFilter(e.target.value)} // Update the globalFilter state
          placeholder="Search..."
        />
      </div>
      {/* <ScrollArea className=" h-[calc(80vh-210px)]"> */}
      <Table className="flex flex-col">
        <TableHeader className='flex'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='flex flex-auto min-w-screen bg-gray-300 rounded-lg '>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHead key={header.id}
                    className={cn("flex items-center dark:text-black overflow-hide",
                      index == 0 ? " flex-auto min-w-[70px] max-w-[100px] pl-[20px]" : header.id !== 'actions' && "min-w-[200px]",
                      header.id === 'email' && 'min-w-[300px]',
                      header.id == 'status' && "pl-[40px] flex-auto w-[180px] md:sticky lg:right-[150px] lg:z-10 bg-gray-300 ",
                      header.id == 'actions' && "flex-auto items-center justify-center  w-[30px] lg:sticky lg:right-0 bg-gray-300 rounded-lg lg:z-10")} >
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
                  const finaldata = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )
                  // Example usage
                  const hasValidHeader = checkHeadersInData(data, rowIndex, cell.column.id);

                  return (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "flex items-center border-b",
                        cell.column.id === 'id' ? "min-w-[70px] max-w-[100px] pl-[20px]" : cell.column.id !== 'actions' && "min-w-[200px]",
                        cell.column.id === 'email' && 'min-w-[300px]',
                        cell.column.id === 'status' && "flex-auto items-center justify-center w-[180px] lg:sticky lg:right-[150px] bg-white md:z-20  lg:z-20 lg:shadow dark:bg-black dark:shadow-gray-400",
                        cell.column.id === 'actions' && "flex-auto items-center justify-center w-[30px] bg-white lg:sticky lg:right-0 lg:z-10 md:z-10 dark:bg-black"
                      )}
                    >
                      {cell.column.id == "id" ? <p>{rowIndex + 1}</p> :
                        // Show 'NA' if the cell's column ID does not exist in the headers
                        hasValidHeader || cell.column.id === 'actions' ? finaldata : 'NA'
                      }
                    </TableCell>
                  )
                })}
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

      <div className="flex items-center justify-center space-x-2 py-4">

        <div className="space-x-2">
          <Paginator
            currentPage={currentPage + 1}
            // table.getState().pagination.pageIndex + 1
            totalPages={totalPage}
            // table.getPageCount()
            onPageChange={(pageNumber: number) => { table.setPageIndex(pageNumber - 1); usePageCallback(pageNumber - 1) }}
            showPreviousNext
          />

        </div>
      </div>
    </>
  );
}
