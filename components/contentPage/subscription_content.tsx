'use client'
import BreadCrumb from "@/components/breadcrumb";
import Subscriptions from "@/components/profile/subscription";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

export default function SubscriptionContent() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_PROFILE'), link: '/dashboard/profile' },
        { title: t('TAG_SUBSCRIPTIONS'), link: '/dashboard/profile / subscription' }
    ];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 h-full space-y-4 p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} />
                <Subscriptions />
            </div>
        </ScrollArea>
    )
}