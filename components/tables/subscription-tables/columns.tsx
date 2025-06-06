'use client';
import { ColumnDef } from '@tanstack/react-table';
import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { MerchantContent } from '@/constants/data';
import { GetSubscriptionListingContentParam } from '@/lib/interface/userInterface';

export const columns: ColumnDef<GetSubscriptionListingContentParam>[] = [
  {
    accessorKey: 'id',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'packageName',
    header: 'TAG_PACKAGE_NAME',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'subPeriod',
    header: 'TAG_SUBSCRIPTION_PERIOD',
    enableColumnFilter: true,
  },

  {
    accessorKey: "durationInMonths",
    header: 'TAG_DURATION_MONTH',
    enableGlobalFilter: true,
  },
  {
    accessorKey: 'packageAmount',
    header: 'TAG_AMOUNT',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'subStartDate',
    header: 'TAG_START_DATE',
    enableColumnFilter: true,
  },
  {
    accessorKey: "subEndDate",
    header: 'TAG_END_DATE',
    enableGlobalFilter: true,
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
  // {
  //   header: 'TAG_CONTACT_NO',
  //   enableColumnFilter: false,
  //   cell: ({ row }) => `${row.original.contactPrefix} ${row.original.contact}`,
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
  {
    accessorKey: 'subStatus',
    header: 'TAG_STATUS',
    cell: ({ row }) => <StatusAction data={row.original} />,
    enableColumnFilter: true,
  },
  {
    id: 'actions',
    // cell: ({ row }) => <CellAction data={row.original} />
  }
];