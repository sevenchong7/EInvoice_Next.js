'use client';
import { ColumnDef } from '@tanstack/react-table';
import { MerchantContent } from '@/constants/data';
import { GetEwalletListContentParam, GetMerchantListContentParam } from '@/lib/interface/userInterface';

export const columns: ColumnDef<GetEwalletListContentParam>[] = [
  {
    accessorKey: 'id',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'trxType',
    header: 'TAG_TRANSACTION_TYPE',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'statementDate',
    header: 'TAG_STATEMENT_DATE',
    enableColumnFilter: true,
  },
  {
    accessorKey: 'amountIn',
    header: 'TAG_AMOUNT_IN',
    enableColumnFilter: true,
  },
  {
    accessorKey: "amountOut",
    header: 'TAG_AMOUNT_OUT',
    enableGlobalFilter: true,
  },
  {
    accessorKey: "remark",
    header: 'TAG_REMARK',
    enableGlobalFilter: true,
  },
  // {
  //   accessorKey: 'email',
  //   header: 'TAG_NAME',
  //   enableColumnFilter: false,
  // },
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
  // {
  //   header: 'TAG_CONTACT_NO',
  //   enableColumnFilter: false,
  //   // cell: ({ row }) => `${row.original.contactPrefix} ${row.original.contact}`,
  // },
  // {
  //   accessorKey: "address",
  //   header: 'TAG_ADDRESS',
  //   enableColumnFilter: false,
  // },
  // {
  //   accessorKey: "city",
  //   header: 'TAG_CITY',
  //   enableColumnFilter: false,
  // },
  // {
  //   accessorKey: "stateId",
  //   header: 'TAG_STATE',
  //   enableColumnFilter: false,
  // },
  // {
  //   accessorKey: "country",
  //   header: 'TAG_COUNTRY',
  //   enableColumnFilter: false,
  // },
  // {
  //   accessorKey: 'joinDate',
  //   header: 'TAG_JOIN_DATE',
  //   enableColumnFilter: true,
  // },
  // {
  //   accessorKey: 'status',
  //   header: 'TAG_STATUS',
  //   cell: ({ row }) => <StatusAction data={row.original} />,
  //   enableColumnFilter: true,
  // },
  {
    id: 'actions',
    // cell: ({ row }) => <CellAction data={row.original} />
  }
];