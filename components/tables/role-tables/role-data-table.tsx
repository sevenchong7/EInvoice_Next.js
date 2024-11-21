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
import React, { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plus, View } from 'lucide-react';
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
import Paginator from './role-table-paging';
import PermissionCheck from '@/components/permission-check';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/customerAccordion';
import { useTranslations } from 'next-intl';
import { useDataTaskStore } from '@/lib/store/dataStore';
import { Sheet } from '@/components/ui/sheet';
import AddRole from './addRole';
import { getRoleSelectionList } from '@/lib/services/userService';
import { useUserTaskStore } from '@/lib/store/userStore';
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
  open: boolean;
  setOpen: any;
  permissionList: any;
  setSelectUserModal: any;
  HandlePermission: any;
  mId: any
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPage,
  currentPage,
  usePageCallback,
  resetAllSelectedTitle,
  open,
  setOpen,
  permissionList,
  setSelectUserModal,
  HandlePermission,
  mId

}: DataTableProps<TData, TValue>) {

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    merchantName: false
  });
  const [checkboxStates, setCheckboxStates] = useState<any>({
    role: true,
    roleQuantity: true
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
  const removeRoleFilterData = useDataTaskStore((state) => state.removeRoleFilterData)
  const setRoleFilterData = useDataTaskStore((state) => state.setRoleFilterData)
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
      columnVisibility,
      pagination,
      sorting,
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

  // Handle server - side pagination
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

  const handlePermissionGranted = useCallback(() => {
    setColumnVisibility(prev => ({
      ...prev,
      merchantName: true,
    }));
  }, []);

  useEffect(() => {
    if (resetAllSelectedTitle) {
      table.getAllLeafColumns().map((column) => {
        column.setFilterValue('')
        removeRoleFilterData()
      })
    }
  }, [resetAllSelectedTitle])

  useEffect(() => {
    removeRoleFilterData()
    const GetRoleSelection = async () => {
      const getRoleSelectionData = await getRoleSelectionList()
      setRoleSelection(getRoleSelectionData)
    }

    GetRoleSelection()
  }, [])


  return (
    <>
      <PermissionCheck
        permission="roleList.su.read"
        onPermissionGranted={handlePermissionGranted}
      />

      <div className='grid lg:grid-cols-2 gap-4 p-2 bg-[#dddddd] dark:bg-gray-700 rounded'>
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
                    column.id != 'mupId' && column.id != 'actions' && column.id != "lastModify" &&
                    < DropdownMenuCheckboxItem
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

        <div className='lg:hidden'>
          <Accordion type="single" collapsible className="w-full" >
            <AccordionItem value='item1'>
              <AccordionTrigger></AccordionTrigger>
              <AccordionContent className='space-y-5'>
                {
                  table.getAllLeafColumns().map((column) => {
                    return (
                      column.id != 'mupId' && column.id != 'actions' && column.id != "lastModify" && checkboxStates[column.id] ?
                        < div key={column.id} >
                          <div className='p-1 relative flex items-center'>
                            < Input
                              className='bg-white dark:text-black pr-10'
                              placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                              value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                              onChange={(event) => {
                                if (checkboxStates[column.id]) {
                                  column.setFilterValue(event.target.value);
                                  // setMerchantFilterData(column.id, event.target.value)
                                }

                              }}
                            // className="flex flex-1 w-full md:max-w-sm"
                            />
                            <button className='absolute right-4 z-10' onClick={() => {
                              column.setFilterValue('');
                              // setMerchantFilterData(column.id, '')
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
              column.id != 'mupId' && column.id != 'actions' && column.id != "lastModify" && checkboxStates[column.id] ?
                < div key={column.id} className='hidden lg:inline-block'>
                  {
                    <Accordion type="single" collapsible className="w-full bg-gray-400 rounded-md px-2" >
                      <AccordionItem value='item1'>
                        <AccordionTrigger><div >{t(column.columnDef.header)}</div></AccordionTrigger>
                        <AccordionContent className='space-y-5'>
                          {
                            column.id == 'roleQuantity' ?
                              <div className='p-1 relative flex items-center'>
                                <Input
                                  type='number'
                                  className='bg-white dark:text-black pr-10'
                                  placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                                  value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                  onChange={(event) => {
                                    if (checkboxStates[column.id]) {
                                      column.setFilterValue(event.target.value);
                                      setRoleFilterData(column.id, event.target.value)
                                    }

                                  }}
                                // className="flex flex-1 w-full md:max-w-sm"
                                />
                                <button className='absolute right-4 z-10' onClick={() => {
                                  column.setFilterValue('');
                                  setRoleFilterData(column.id, '')
                                }}>
                                  <svg className='text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                </button>
                              </div> : column.id === 'role' ?
                                <div className='p-1'>
                                  <Select
                                    value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                    onValueChange={(value) => {
                                      if (checkboxStates[column.id]) {
                                        column.setFilterValue(value);
                                        setRoleFilterData(column.id, value)
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
                                </div> :
                                <div className='p-1 relative flex items-center'>

                                  < Input
                                    className='bg-white dark:text-black pr-10'
                                    placeholder={`${t('TAG_SEARCH')} ${t(column.columnDef.header)}...`}
                                    value={checkboxStates[column.id] ? (column.getFilterValue() as string) ?? '' : ''}
                                    onChange={(event) => {
                                      if (checkboxStates[column.id]) {
                                        column.setFilterValue(event.target.value);
                                        setRoleFilterData(column.id, event.target.value)
                                      }

                                    }}
                                  // className="flex flex-1 w-full md:max-w-sm"
                                  />
                                  <button className='absolute right-4 z-10' onClick={() => {
                                    column.setFilterValue('');
                                    setRoleFilterData(column.id, '')
                                  }}>
                                    <svg className='text-black' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                  </button>
                                </div>
                          }

                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  }
                </div> : ''
            )

          }

          )
        }




      </div >
      <Separator />
      <div className='flex grid lg:grid-cols-2 gap-4 items-center justify-between'>
        <Input
          type="text"
          value={globalFilter || ''} // Ensure it's not undefined
          onChange={(e) => setGlobalFilter(e.target.value)} // Update the globalFilter state
          placeholder="Search..."
        />
        <div className='flex flex-1 w-full justify-end'>
          <Sheet open={open} onOpenChange={setOpen}>

            <Button
              onClick={() => HandlePermission()}
              className="text-xs md:text-sm"
            // disabled={loading}
            >
              <Plus className="mr-2 h-4 w-4" /> {t('TAG_ADD_NEW')}
            </Button>
            <AddRole openSheet={open} permissionListData={permissionList} setOpen={setOpen} setSelectUserModal={setSelectUserModal} mId={mId} />
          </Sheet>
        </div>
      </div>
      <ScrollArea className=" h-[calc(80vh-210px)]">
        <Table className="flex flex-col">
          <TableHeader className='flex bg-gray-300 rounded-lg '>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='flex flex-row w-full py-[10px] '>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} className={cn("flex  items-center dark:text-black", index == 0 ? " flex-auto max-w-[100px] pl-[20px]" : "flex-1 md:w-full w-[150px]", header.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")} >
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
          <TableBody className='flex flex-col min-w-screen'>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, rowIndex) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={cn('flex flex-row  py-[5px]')}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell key={cell.id} className={cn("flex items-center", index == 0 ? " flex-auto min-w-[50px] max-w-[100px] pl-[20px]" : "flex-1 w-full  w-[150px]", cell.column.id == 'actions' && " items-center justify-center flex-auto max-w-[100px]")}>
                        {cell.column.id == "mupId" ? <p>{rowIndex + 1}</p> :
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* <div className="flex items-center justify-center space-x-2 py-4"> */}
      {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
      <div className="space-x-2">
        <Paginator
          currentPage={currentPage + 1}
          totalPages={totalPage}
          // table.getPageCount()
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
      {/* </div > */}
    </>
  );
}
