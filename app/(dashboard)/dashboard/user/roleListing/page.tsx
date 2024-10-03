import BreadCrumb from '@/components/breadcrumb';
import React from 'react';
import { roles, } from '@/constants/data';
import { RoleClient } from '@/components/tables/role-tables/client';
import { useTranslations } from 'next-intl';

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_ROLE_LISTING'), link: '/dashboard/user/roleListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RoleClient data={roles} />
        </div>
    )
}