'use client'
import BreadCrumb from '@/components/breadcrumb';
import UserProfile from '@/components/profile/userProfile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGeneralTaskStore } from '@/lib/store/generalStore';
import { useUserTaskStore } from '@/lib/store/userStore';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function ProfileContent({ subscriptionData, merchantInfoData, countryData }: { subscriptionData: any, merchantInfoData: any, countryData: any }) {
    const t = useTranslations()
    const setCountry = useGeneralTaskStore((state) => state.setCountryList)
    const setSubscription = useUserTaskStore((state) => state.setSubscriptionList)
    const setMerchant = useUserTaskStore((state) => state.setMerchantInfoList)

    useEffect(() => {
        setSubscription(subscriptionData)
        setMerchant(merchantInfoData)
        setCountry(countryData)
    }, [])

    const breadcrumbItems = [{ title: t('TAG_PROFILE'), link: '/dashboard/profile' }];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 h-full space-y-4 p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} />
                <UserProfile />
            </div>
        </ScrollArea>
    );
}
