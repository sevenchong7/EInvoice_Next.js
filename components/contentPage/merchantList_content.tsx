'use client';
import { MerchantContent } from "@/constants/data";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import BreadCrumb from "../breadcrumb";
import { MerchantClient } from "../tables/merchant-tables/client";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { GetMerchantListContentParam, GetMerchantListParam } from "@/lib/interface/userInterface";


export default function MerchantListContent({ merchantListData, getCountryListData }: { merchantListData: GetMerchantListParam, getCountryListData: any }) {
    const t = useTranslations()
    const setCountryList = useGeneralTaskStore((state) => state.setCountryList)
    const [merchantData, setMerchantData] = useState<GetMerchantListContentParam[]>([])

    useEffect(() => {
        setCountryList(getCountryListData)

    }, [])


    useEffect(() => {
        // console.log('merchantListData = ', merchantListData.content)
        setMerchantData(merchantListData.content)

    }, [merchantListData])



    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '' },
        { title: t('TAG_MERCHANT_LISTING'), link: '/dashboard/user/merchantListing' }
    ];

    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <MerchantClient data={merchantData} />
        </div>
    )
}