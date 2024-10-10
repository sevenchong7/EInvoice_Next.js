'use client';
import BreadCrumb from '@/components/breadcrumb';
import React, { useEffect, useState } from 'react';
import { merchants } from '@/constants/data';
import { MerchantClient } from '@/components/tables/merchant-tables/client';
import { useTranslations } from 'next-intl';
import { getMerchantList } from '@/lib/services/userService';

export default function page() {
    const t = useTranslations()
    const [merchantData, setMerchantData] = useState([])

    const GetMerchantList = async () => {
        return await getMerchantList()
    }

    useEffect(() => {
        GetMerchantList().then((data) => setMerchantData(data.content))
    }, [])

    useEffect(() => {
        console.log('merchantData = ', merchantData)
    }, [merchantData])

    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_MERCHANT_LISTING'), link: '/dashboard/user/merchantListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <MerchantClient data={merchantData} />
        </div>
    )
}