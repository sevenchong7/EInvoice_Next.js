'use client';
import BreadCrumb from "@/components/breadcrumb";
import SubscriptionPayment from "@/components/profile/subscription-payment";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function SubscriptionPaymentContent() {
    const param = useSearchParams()
    const t = useTranslations()
    const subPackage = param.get('sub')
    const breadcrumbItems = [
        { title: t('TAG_PROFILE'), link: '/dashboard/profile' },
        { title: t('TAG_SUBSCRIPTIONS'), link: '/dashboard/profile/subscription' },
        { title: t('TAG_PAYMENT'), link: '/dashboard/profile/subscription/payment' }
    ];

    return (
        <div className="h-full space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <SubscriptionPayment subPackage={subPackage} />
        </div>
    )
}