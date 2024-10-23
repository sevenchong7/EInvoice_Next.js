'use client';
import { MerchantContent } from "@/constants/data";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import BreadCrumb from "../breadcrumb";
import { MerchantClient } from "../tables/merchant-tables/client";


export default function MerchantListContent(data: any) {
    const t = useTranslations()
    const [merchantData, setMerchantData] = useState<MerchantContent[]>([])

    useEffect(() => {
        setMerchantData(data.data.content)

        console.log('merchant List = ', data)
    }, [data])



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