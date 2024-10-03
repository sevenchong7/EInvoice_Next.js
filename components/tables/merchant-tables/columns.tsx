'use client';
import { ColumnDef } from '@tanstack/react-table';
import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { Merchant } from '@/constants/data';

export const columns: ColumnDef<Merchant>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: 'id',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'username',
    header: 'TAG_USERNAME',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'role',
    header: 'TAG_ROLE',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'email',
    header: 'TAG_NAME',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'regNo',
    header: 'TAG_REG_NO',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'tinNo',
    header: 'TAG_TIN_NO',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'address',
    header: 'TAG_ADDRESS',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'status',
    header: 'TAG_STATUS',
    cell: ({ row }) => <StatusAction data={row.original} />,
    enableColumnFilter: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
