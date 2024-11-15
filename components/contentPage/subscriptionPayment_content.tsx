'use client';
import BreadCrumb from "@/components/breadcrumb";
import SubscriptionPayment from "@/components/profile/subscription-payment";
import { getPackageInfo } from "@/lib/services/userService";
import { useDataTaskStore } from "@/lib/store/dataStore";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { useUserTaskStore } from "@/lib/store/userStore";
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
    const subPackage = useDataTaskStore((state) => state.packageId)
    const setPaymentMethod = useGeneralTaskStore((state) => state.setPaymentMethodList)
    const setPackageInfo = useUserTaskStore((state) => state.setPackageInfoList)
    const setMultiPayment = useUserTaskStore((state) => state.setMultiPaymentList)
    const setEwalletBalance = useUserTaskStore((state) => state.setEWalletBalanceList)
    const setPackageList = useUserTaskStore((state) => state.setRegisterPackageList)

    useEffect(() => {
        setPaymentMethod(paymentMethodData)
        setMultiPayment(multipaymentData)
        setEwalletBalance(eWalletBalanceData)
        setPackageList(packageListData)

        const packageInfo = async () => {
            const res = await getPackageInfo(subPackage)
            if (res != undefined) {
                setPackageInfo(res)
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
            <SubscriptionPayment />
        </div>
    )
}