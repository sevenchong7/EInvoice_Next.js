'use client';
import { ColumnDef } from '@tanstack/react-table';
// import StatusAction from './status-action';
import { CellAction } from './cell-action';
import { Merchant, Role, RoleInfo } from '@/constants/data';
import { GetRoleListContentParam } from '@/lib/interface/userInterface';

export const columns: ColumnDef<GetRoleListContentParam>[] = [
  {
    accessorKey: 'mupId',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'role',
    header: 'TAG_ROLE',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'merchantName',
    header: 'TAG_MERCHANT',
    // enableHiding: true
  },
  {
    accessorKey: 'roleQuantity',
    header: 'TAG_AMOUNT',
    enableColumnFilter: false,
  },
  {
    accessorKey: 'lastModify',
    header: 'TAG_LAST_UPDATE',
    enableColumnFilter: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
