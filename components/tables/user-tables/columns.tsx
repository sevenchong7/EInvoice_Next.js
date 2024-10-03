'use client';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';
import StatusAction from './status-action';
// import { useTranslations } from 'next-intl';

// const t = useTranslations();

export const columns: ColumnDef<User>[] = [

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
    header: 'TAG_NO'
  },
  {
    accessorKey: 'name',
    header: 'TAG_NAME'
  },
  {
    accessorKey: 'merchant',
    header: 'TAG_MERCHANT',
    // enableHiding: true,
  },
  {
    accessorKey: 'role',
    header: 'TAG_ROLE'
  },
  {
    accessorKey: 'status',
    header: 'TAG_STATUS',
    cell: ({ row }) => <StatusAction data={row.original} />
    // cell: (status: CellContext<User, any>) => {

    //   return (
    //     <div className='flex text-white'>
    //       {
    //         status.getValue() == "Active" ?
    //           <div className='flex items-center justify-center rounded-lg bg-blue-800 px-5 p-2 space-x-2 w-[120px]'>
    //             <div>{status.getValue()}</div>
    //             <div className='bg-white rounded-full w-5 h-5' /></div> :
    //           status.getValue() == "Inactive" ?
    //             <div className='flex items-center rounded-lg bg-black px-5 p-2 space-x-2 w-[120px]'>
    //               <div className='bg-white rounded-full w-5 h-5' />
    //               <div>{status.getValue()}</div>
    //             </div> :
    //             <div className='text-yellow-600'>{status.getValue()}</div>
    //       }
    //     </div>
    //   )
    // }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
