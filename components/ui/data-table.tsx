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
import React from 'react';
import { cn } from '@/lib/utils';
import UserPaginator from '../tables/user-tables/user-table-paging';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey
}: DataTableProps<TData, TValue>) {

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  })

  const [sorting, setSorting] = React.useState<SortingState>([])

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

  /* this can be used to get the selectedrows 
  console.log("value", table.getFilteredSelectedRowModel()); */

  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn(searchKey)?.setFilterValue(event.target.value)
        }
        className="w-full md:max-w-sm"
      />
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
          <UserPaginator
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
