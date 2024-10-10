'use client';
import { ColumnDef } from '@tanstack/react-table';
import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { Merchant } from '@/constants/data';

export const columns: ColumnDef<any>[] = [
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
    accessorKey: 'merchantId',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'companyName',
    header: 'TAG_USERNAME',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'registrationNo',
    header: 'TAG_REG_NO',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'businessTinNo',
    header: 'TAG_TIN_NO',
    enableColumnFilter: true,
  },
  {
    accessorKey: "sstRegNo",
    header: 'SST',
    enableGlobalFilter: true,
  },
  {
    accessorKey: "tourRegNo",
    header: 'tourRegNo',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'email',
    header: 'TAG_NAME',
    enableColumnFilter: false,
  },
  // {
  //   accessorKey: 'role',
  //   header: 'TAG_ROLE',
  //   enableColumnFilter: false,
  // },
  // {
  //   accessorKey: "contactPrefix" + "contact",
  //   header: 'contact',
  //   enableColumnFilter: false,
  // },
  {
    header: 'Contact',
    enableColumnFilter: false,
    cell: ({ row }) => `${row.original.contactPrefix} ${row.original.contact}`,
  },
  {
    accessorKey: "address",
    header: 'TAG_ADDRESS',
    enableColumnFilter: false,
  },
  {
    accessorKey: "city",
    header: 'city',
    enableColumnFilter: false,
  },
  {
    accessorKey: "stateId",
    header: 'state',
    enableColumnFilter: false,
  },
  {
    accessorKey: "country",
    header: 'country',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'joinDate',
    header: 'joinDate',
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