'use client'
import { useTranslations } from "next-intl";
import BreadCrumb from "../breadcrumb";
import { RegisterUserStepperAdmin } from "../forms/user-register-stepper-Admin/register-user-admin";

export default function CreateMerchant({ packageData, paymentMethodData, subscribeDurationData, paymentTypeData, subscriptionDurationLisstData }: { packageData: any, paymentMethodData: any, subscribeDurationData: any, paymentTypeData: any, subscriptionDurationLisstData: any }) {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '' },
        { title: t('TAG_CREATE_MERCHANT'), link: '/dashboard/user/createMerchant' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RegisterUserStepperAdmin initialData={undefined} categories={undefined} packageData={packageData} paymentMethodData={paymentMethodData} subscribeDurationData={subscribeDurationData} paymentTypeData={paymentTypeData} subscriptionDurationLisstData={subscriptionDurationLisstData} />
        </div>
    )
}