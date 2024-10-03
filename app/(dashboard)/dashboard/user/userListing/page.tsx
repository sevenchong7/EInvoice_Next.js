import BreadCrumb from '@/components/breadcrumb';
import React from 'react';
import { UserClient } from '@/components/tables/user-tables/client';
import { users } from '@/constants/data';
import { useTranslations } from 'next-intl';

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_USER_LISTING'), link: '/dashboard/user/userListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <UserClient data={users} />
        </div>
    )
}