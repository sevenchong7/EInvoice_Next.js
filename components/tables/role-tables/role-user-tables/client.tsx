'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { merchantUserList, Role, User } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { DataTable } from './role-data-table';

interface ProductsClientProps {
  data: merchantUserList;
}

export const RoleUserClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      {/* <div className="flex items-start justify-between">
        <Heading
          title={`Roles (${data.length})`}
          description="Manage roles"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/userListing/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div> */}
      {/* <Separator /> */}
      <div className='space-y-5'>
        <DataTable columns={columns} data={data.content} />
      </div>
    </>
  );
};
