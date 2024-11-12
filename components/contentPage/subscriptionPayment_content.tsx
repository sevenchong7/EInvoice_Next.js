'use client';
import BreadCrumb from "@/components/breadcrumb";
import SubscriptionPayment from "@/components/profile/subscription-payment";
import { getPackageInfo } from "@/lib/services/userService";
import { useTaskStore } from "@/lib/store";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SubscriptionPaymentContent(
    {
        paymentMethodData,
        multipaymentData,
        eWalletBalanceData,
        packageListData

    }: {
        paymentMethodData: any,
        multipaymentData: any,
        eWalletBalanceData: any,
        packageListData: any
    }) {
    const t = useTranslations()
    const subPackage = useTaskStore((state) => state.packageId)
    const [packageInfoData, setPackageInfoData] = useState<any>()

    useEffect(() => {
        const packageInfo = async () => {
            const res = await getPackageInfo(subPackage)
            if (res != undefined) {
                console.log('getPackageInfo = ', res)
                setPackageInfoData(res)
            }
        }

        packageInfo()
    }, [])

    const breadcrumbItems = [
        { title: t('TAG_PROFILE'), link: '/dashboard/profile' },
        { title: t('TAG_SUBSCRIPTIONS'), link: '/dashboard/profile/subscription' },
        { title: t('TAG_PAYMENT'), link: '/dashboard/profile/subscription/payment' }
    ];

    return (
        <div className="h-full space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <SubscriptionPayment
                subPackage={Number(subPackage)}
                paymentMethodData={paymentMethodData}
                multipaymentData={multipaymentData}
                eWalletBalanceData={eWalletBalanceData}
                packageInfoData={packageInfoData}
                packageListData={packageListData}
            />
        </div>
    )
}