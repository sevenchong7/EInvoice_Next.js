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
import { Plus } from 'lucide-react';
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
import { boolean } from 'zod';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/customerAccordion';
import { useTranslations } from 'next-intl';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { useUserTaskStore } from '@/lib/store/userStore';
import { getRoleSelectionList } from '@/lib/services/userService';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  totalPage: number;
  currentPage: number;
  usePageCallback: any;
  resetAllSelectedTitle: boolean;
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
  });
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    //using the accessKey in column
    merchantName: false
  });

  const [checkboxStates, setCheckboxStates] = useState<any>({
    username: true,
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
  const setUserFilterData = useDataTaskStore((state) => state.setUserFilterData)
  const removeUserFilterData = useDataTaskStore((state) => state.removeUserFilterData)
  const setRoleSelection = useUserTaskStore((state) => state.setRoleSelectionList)
  const roleSelectionList = useUserTaskStore((state) => state.roleSelectionList)


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
      globalFilter,

    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'auto'

  });

  const handleCheckboxChange = (columnId: string) => {
    setCheckboxStates((prev: any) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  useEffect(() => {
    if (resetAllSelectedTitle) {
      table.getAllLeafColumns().map((column) => {
        column.setFilterValue('')
        removeUserFilterData()
      })
    }
  }, [resetAllSelectedTitle])

  useEffect(() => {
    removeUserFilterData()
    const GetRoleSelection = async () => {
      const getRoleSelectionData = await getRoleSelectionList()
      setRoleSelection(getRoleSelectionData)
    }

    GetRoleSelection()
  }, []);

  const handlePermissionGranted = useCallback(() => {
    setColumnVisibility(prev => ({
      ...prev,
      //using the accessKey in column
      merchantName: true,
    }));
  }, []);


  return (
    <>
      <PermissionCheck
        permission="userList.su.read"
        onPermissionGranted={handlePermissionGranted}
      />
      <div className='grid lg:grid-cols-2 gap-4 p-2 bg-[#dddddd] dark:bg-gray-700  rounded'>

        <DropdownMenu>
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
                    column.id != 'muId' && column.id != 'actions' && column.id == 'merchant' ?
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
                      : column.id != 'muId' && column.id != 'actions' &&
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
          <Accordion type="single" collapsible className="w-full" >
            <AccordionItem value='item1'>
              <AccordionTrigger>Item</AccordionTrigger>
              <AccordionContent className='space-y-5'>
                {
                  table.getAllLeafColumns().map((column) => {
                    return (
                      column.id != 'muId' && column.id != 'actions' && checkboxStates[column.id] ?
                        < div key={column.id} >
                          {
                            column.id === 'role' ?
                              <div className='p-1'>
                                <Select
                                  value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                  onValueChange={(value) => {
                                    if (checkboxStates[column.id]) {
                                      column.setFilterValue(value);
                                      setUserFilterData(column.id, value)
                                    }
                                  }}
                                >
                                  <SelectTrigger className='bg-white'>
                                    <SelectValue placeholder={t('TAG_SELECT_ROLE')} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value=''>{t('TAG_SELECT_ROLE')} </SelectItem>
                                      {
                                        roleSelectionList.map((res) => (
                                          <SelectItem value={res.role}>
                                            {res.role}
                                          </SelectItem>
                                        ))
                                      }
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              : column.id === 'status' ?
                                <div className='p-1'>
                                  <Select
                                    value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                    onValueChange={(value) => {
                                      if (checkboxStates[column.id]) {
                                        column.setFilterValue(value);
                                        setUserFilterData(column.id, value)
                                      }
                                    }}
                                  >
                                    <SelectTrigger className='bg-white'>
                                      <SelectValue placeholder={t('TAG_SELECT_STATUS')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value=''>{t('TAG_SELECT_STATUS')} </SelectItem>
                                        <SelectItem value='Y'>{t('TAG_ACTIVE')} </SelectItem>
                                        <SelectItem value='N'>{t('TAG_INACTIVE')} </SelectItem>
                                        <SelectItem value='Pending'>{t('TAG_PENDING')} </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                </div> : <div className='p-1 relative flex items-center'>
                                  < Input
                                    placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                                    value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                    onChange={(event) => {
                                      if (checkboxStates[column.id]) {
                                        column.setFilterValue(event.target.value);
                                        setUserFilterData(column.id, event.target.value)
                                      }
                                    }}
                                    className='flex flex-1 bg-white dark:text-black pr-10'
                                  />
                                  <button className='absolute right-4 z-10 dark' onClick={() => {
                                    column.setFilterValue('');
                                    setUserFilterData(column.id, '')
                                  }}>
                                    <svg className='dark:text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                  </button>
                                </div>
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
          table.getAllLeafColumns().map((column: any) => {
            return (
              column.id != 'muId' && column.id != 'actions' && checkboxStates[column.id] ?
                < div key={column.id} className='hidden lg:inline-block'>
                  <Accordion type="single" collapsible className="w-full bg-gray-400 rounded-md px-2" >
                    <AccordionItem value='item1'>
                      <AccordionTrigger><div >{t(column.columnDef.header)}</div></AccordionTrigger>
                      <AccordionContent className='space-y-5'>
                        {
                          column.id === 'role' ?
                            <div className='p-1'>
                              <Select
                                value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                onValueChange={(value) => {
                                  if (checkboxStates[column.id]) {
                                    column.setFilterValue(value);
                                    setUserFilterData(column.id, value)
                                  }
                                }}
                              >
                                <SelectTrigger className='bg-white'>
                                  <SelectValue placeholder={t('TAG_SELECT_ROLE')} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value=''>{t('TAG_SELECT_ROLE')} </SelectItem>
                                    {
                                      roleSelectionList.map((res) => (
                                        <SelectItem value={res.role}>
                                          {res.role}
                                        </SelectItem>
                                      ))
                                    }
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                            : column.id === 'status' ?
                              <div className='p-1'>
                                <Select
                                  value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                  onValueChange={(value) => {
                                    if (checkboxStates[column.id]) {
                                      column.setFilterValue(value);
                                      setUserFilterData(column.id, value)
                                    }
                                  }}
                                >
                                  <SelectTrigger className='bg-white'>
                                    <SelectValue placeholder={t('TAG_SELECT_STATUS')} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value=''>{t('TAG_SELECT_STATUS')} </SelectItem>
                                      <SelectItem value='Y'>{t('TAG_ACTIVE')} </SelectItem>
                                      <SelectItem value='N'>{t('TAG_INACTIVE')} </SelectItem>
                                      <SelectItem value='Pending'>{t('TAG_PENDING')} </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div> : <div className='p-1 relative flex items-center'>
                                < Input
                                  placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                                  value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                  onChange={(event) => {
                                    if (checkboxStates[column.id]) {
                                      column.setFilterValue(event.target.value);
                                      setUserFilterData(column.id, event.target.value)
                                    }
                                  }}
                                  className='flex flex-1 bg-white dark:text-black pr-10'
                                />
                                <button className='absolute right-4 z-10 dark' onClick={() => {
                                  column.setFilterValue('');
                                  setUserFilterData(column.id, '')
                                }}>
                                  <svg className='dark:text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
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
      <div className='flex grid grid-cols-2 gap-4 items-center justify-between'>
        <Input
          type="text"
          value={globalFilter || ''} // Ensure it's not undefined
          onChange={(e) => setGlobalFilter(e.target.value)} // Update the globalFilter state
          placeholder="Search..."
        />
        <div className='flex flex-1 w-full justify-end'>
          <Button
            className="text-xs md:text-sm"
            onClick={() => router.push(`/dashboard/user/userListing/new`)}
          >
            <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
          </Button>
        </div>
      </div>
      <ScrollArea className=" h-[calc(80vh-210px)]">
        <Table className="flex flex-col">
          <TableHeader className='flex bg-gray-300 rounded-lg '>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='flex flex-row w-full py-[10px]'>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} className={cn("flex  items-center dark:text-black", index == 0 ? " flex-auto max-w-[100px] pl-[20px]" : "flex-1 md:w-full w-[200px]", header.id == 'status' && " flex-auto max-w-[200px]", header.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")} >
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
          <TableBody className=''>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('flex flex-row  py-[5px]')}

                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell key={cell.id} className={cn("flex flex-row items-center border-b", index == 0 ? " flex-auto min-w-[100px] max-w-[100px] pl-[30px]" : "flex-1 md:w-full w-[200px]", cell.column.id == 'status' && "flex flex-auto  max-w-[200px] ", cell.column.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")
                      }>
                        {
                          cell.column.id == "muId" ? <p>{rowIndex + 1}</p> :
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
      </ScrollArea >
      <div className="flex items-center justify-center space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Paginator
            currentPage={currentPage + 1}
            totalPages={totalPage}
            onPageChange={(pageNumber: number) => { table.setPageIndex(pageNumber - 1); usePageCallback(pageNumber - 1) }}
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

