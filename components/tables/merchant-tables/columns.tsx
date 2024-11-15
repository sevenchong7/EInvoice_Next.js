'use client';
import { ColumnDef } from '@tanstack/react-table';
import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { MerchantContent } from '@/constants/data';
import { GetMerchantListContentParam } from '@/lib/interface/userInterface';

export const columns: ColumnDef<GetMerchantListContentParam>[] = [
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
    header: 'TAG_SST_REG_NO',
    enableGlobalFilter: true,
  },
  {
    accessorKey: "tourRegNo",
    header: 'TAG_TOUR_REG_NO',
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
    header: 'TAG_CONTACT_NO',
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
    header: 'TAG_CITY',
    enableColumnFilter: false,
  },
  {
    accessorKey: "stateId",
    header: 'TAG_STATE',
    enableColumnFilter: false,
  },
  {
    accessorKey: "country",
    header: 'TAG_COUNTRY',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'joinDate',
    header: 'TAG_JOIN_DATE',
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