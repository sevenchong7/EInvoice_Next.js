import BreadCrumb from '@/components/breadcrumb';
import { RegisterUserStepperAdmin } from '@/components/forms/user-register-stepper-Admin/register-user-admin';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_CREATE_MERCHANT'), link: '/dashboard/user/createMerchant' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RegisterUserStepperAdmin initialData={undefined} categories={undefined} />
        </div>
    )
}