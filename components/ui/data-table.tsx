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
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
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
import Paginator from '../tables/user-tables/user-table-paging';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKeyName: string;
  searchKeyRole: string;
  searchKeyStatus: string;
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKeyName,
  searchKeyRole,
  searchKeyStatus,
}: DataTableProps<TData, TValue>) {

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  })

  const [searchName, setSearchName] = useState(true);
  const [searchRole, setSearchRole] = useState(true);
  const [searchStatus, setSearchStatus] = useState(false);
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
      sorting
    },
    onSortingChange: setSorting

  });
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

  const searchValue = table.getColumn(searchKeyName)?.getFilterValue() as string;

  React.useEffect(() => {
    if (searchValue?.length > 0) {
      router.push(
        `${pathname}?${createQueryString({
          page: null,
          limit: null,
          search: searchValue
        })}`,
        {
          scroll: false
        }
      );
    }
    if (searchValue?.length === 0 || searchValue === undefined) {
      router.push(
        `${pathname}?${createQueryString({
          page: null,
          limit: null,
          search: null
        })}`,
        {
          scroll: false
        }
      );
    }

    setPaginations((prev) => ({ ...prev, pageIndex: 0 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);


  return (
    <>
      <div className='flex flex-row space-x-3'>
        {searchName &&
          <Input
            placeholder={`Search ${searchKeyName}...`}
            value={(table.getColumn(searchKeyName)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchKeyName)?.setFilterValue(event.target.value)
            }
            className="w-fit md:max-w-sm"
          />
        }
        {searchRole &&
          <Input
            placeholder={`Search ${searchKeyRole}...`}
            value={(table.getColumn(searchKeyRole)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchKeyRole)?.setFilterValue(event.target.value)
            }
            className="w-fit md:max-w-sm"
          />
        }
        {
          searchStatus &&
          <Input
            placeholder={`Search ${searchKeyStatus}...`}
            value={(table.getColumn(searchKeyStatus)?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn(searchKeyStatus)?.setFilterValue(event.target.value)
            }
            className="w-fit md:max-w-sm"
          />
        }
        <DropdownMenu>
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
        </DropdownMenu>
      </div>
      <Separator />
      <ScrollArea className=" h-[calc(80vh-210px)]">
        <Table className="flex flex-col">
          <TableHeader className='flex bg-gray-300 rounded-lg '>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='flex flex-row w-full py-[10px]'>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id} className={cn("flex  items-center", index == 0 ? " flex-auto max-w-[100px] pl-[20px]" : "flex-1", index == columns.length - 2 && "flex-auto max-w-[100px]", index == columns.length - 1 && " items-center justify-center flex-auto max-w-[250px]")} >
                      {header.isPlaceholder
                        ? null
                        :
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
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
                  className={cn('flex flex-row  py-[5px]', rowIndex == data.length - 1 && "items-center justify-center")}

                >
                  {row.getVisibleCells().map((cell, index) => {
                    return (
                      <TableCell key={cell.id} className={cn("flex flex-row items-center border-b", index == 0 ? "pl-[20px] flex-auto max-w-[100px]" : "flex-1", index == columns.length - 2 && "flex-auto max-w-[100px]", index == columns.length - 1 && " items-center justify-center flex-auto max-w-[250px]")}>
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
                  No results.
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
