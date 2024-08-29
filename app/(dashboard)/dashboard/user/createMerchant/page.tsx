import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import { RegisterUserStepperAdmin } from '@/components/forms/user-register-stepper-Admin/register-user-admin';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

export default function page() {
    const breadcrumbItems = [
        { title: 'User', link: '/dashboard/user' },
        { title: 'Create Merchant', link: '/dashboard/user/createMerchant' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RegisterUserStepperAdmin initialData={undefined} categories={undefined} />
        </div>
    )
}