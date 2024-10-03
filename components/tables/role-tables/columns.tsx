'use client';
import { ColumnDef } from '@tanstack/react-table';
// import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { Merchant, Role } from '@/constants/data';

export const columns: ColumnDef<Role>[] = [
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
    accessorKey: 'role',
    header: 'TAG_ROLE',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'merchant',
    header: 'TAG_MERCHANT',
    // enableHiding: true,
  },
  {
    accessorKey: 'amount',
    header: 'TAG_AMOUNT',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastUpdate',
    header: 'TAG_LAST_UPDATE',
    enableColumnFilter: true,
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => <StatusAction data={row.original} />,
  //   enableColumnFilter: true,
  // },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
