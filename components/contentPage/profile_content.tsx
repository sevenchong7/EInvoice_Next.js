'use client'
import BreadCrumb from '@/components/breadcrumb';
import UserProfile from '@/components/profile/userProfile';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';

export default function ProfileContent({ subscriptionData, merchantInfoData, countryData }: { subscriptionData: any, merchantInfoData: any, countryData: any }) {
    const t = useTranslations()
    const breadcrumbItems = [{ title: t('TAG_PROFILE'), link: '/dashboard/profile' }];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 h-full space-y-4 p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} />
                <UserProfile subscriptionData={subscriptionData} merchantInfoData={merchantInfoData} countryData={countryData} />
            </div>
        </ScrollArea>
    );
}
