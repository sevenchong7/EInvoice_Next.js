'use client'
import BreadCrumb from "@/components/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { SubscriptionListClient } from "../tables/subscription-tables/client";
import { MerchantContent } from "@/constants/data";
import { useEffect, useState } from "react";
import { GetMerchantListParam, GetSubscriptionListingParam } from "@/lib/interface/userInterface";

export default function SubscriptionListContent(data: any) {
    const t = useTranslations()
    const [subList, setSubList] = useState<GetSubscriptionListingParam>()

    const breadcrumbItems = [
        { title: t('TAG_SUBSCRIPTION_LIST'), link: '/dashboard/subscriptionListing' },
    ];


    useEffect(() => {
        setSubList(data.data)
    }, [data])


    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <SubscriptionListClient data={subList} />

        </div>
    )
}