'use client';
import { ColumnDef } from '@tanstack/react-table';
// import StatusAction from './status-action';
import { Merchant, merchantUserList, Role, User } from '@/constants/data';

interface merchatUserList {

}

interface roleInfo {
  mupId: string,
  currentPackageId: number,
  roleQuantity: number,
  merchantUserList: [],
  permissionList: permissionList[]
}

interface permissionList {
  Function: Function[],
  Route: string,
  selected: boolean
}

interface Function {
  FunctionName: string,
  selected: boolean
  subFunctions: subFunction[]
  value: string
}

interface subFunction {
  FunctionName: string,
  selected: boolean,
  value: string
}

interface content {
  muId: number,
  username: string,
  role: string,
  status: string
}

export const columns: ColumnDef<content>[] = [
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
    accessorKey: 'muId',
    header: 'TAG_NO',
  },
  {
    accessorKey: 'username',
    header: 'TAG_USERNAME',
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => <StatusAction data={row.original} />,
  //   enableColumnFilter: true,
  // },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
