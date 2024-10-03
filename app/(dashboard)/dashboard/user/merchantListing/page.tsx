import BreadCrumb from '@/components/breadcrumb';
import React from 'react';
import { merchants } from '@/constants/data';
import { MerchantClient } from '@/components/tables/merchant-tables/client';
import { useTranslations } from 'next-intl';

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_MERCHANT_LISTING'), link: '/dashboard/user/merchantListing' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <MerchantClient data={merchants} />
        </div>
    )
}