'use client'
import { useTranslations } from "next-intl";
import BreadCrumb from "../breadcrumb";
import { EwalletListClient } from "../tables/eWallet-tables/client";
import { useEffect } from "react";

export default function EwalletContent(data: any) {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_EWALLET_LIST'), link: '/dashboard/eWalletListing' }
    ];
    useEffect(() => {
        // console.log("EwalletContent = ", data)
    }, [])
    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <EwalletListClient data={data.data} />
        </div>
    )
}