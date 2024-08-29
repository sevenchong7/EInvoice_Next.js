import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { RegisterUserStepperAdmin } from '@/components/forms/user-register-stepper-Admin/register-user-admin';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';

export default function page() {
    const breadcrumbItems = [
        { title: 'User', link: '/dashboard/user' },
        { title: 'User Listing', link: '/dashboard/user/userListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            {/* flex-1 space-y-4  p-4 pt-6 md:p-8 */}
            <BreadCrumb items={breadcrumbItems} />
            <UserClient data={users} />
        </div>
    )
}