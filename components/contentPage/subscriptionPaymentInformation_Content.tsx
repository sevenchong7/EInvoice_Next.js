'use client'
import BreadCrumb from "@/components/breadcrumb";
import SubscribeInformation from "@/components/profile/subscribe-information";
import { useTranslations } from "next-intl";


export default function SubscriptionPaymentInformationContent() {

    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_PROFILE'), link: '/dashboard/profile' },
        { title: t('TAG_SUBSCRIPTIONS'), link: '/dashboard/profile/subscription' },
        { title: t('TAG_PAYMENT'), link: '/dashboard/profile/subscription/payment' },
        { title: t('TAG_INFORMATION'), link: '/dashboard/profile/subscription/payment/information' },
    ];

    return (
        <div className="flex-1 h-full space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <SubscribeInformation />
        </div>
    )
}