'use client';
import BreadCrumb from '@/components/breadcrumb';
import React, { useEffect, useState } from 'react';
import { UserClient } from '@/components/tables/user-tables/client';
import { Users, users } from '@/constants/data';
import { useTranslations } from 'next-intl';
import { getUserList } from '@/lib/services/userService';

export default function page() {
    const t = useTranslations()
    const [data, setData] = useState<Users>({} as Users)

    const GetUserList = async () => {
        return await getUserList()
    }

    useEffect(() => {
        GetUserList().then((res) => setData(res))
    }, [])

    useEffect(() => {
        console.log('data = ', data)
    }, [data])

    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_USER_LISTING'), link: '/dashboard/user/userListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <UserClient data={data.content} />
        </div>
    )
}