import BreadCrumb from "@/components/breadcrumb";
import UnsubscribeInformation from "@/components/profile/unsubscribe-Information";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_PROFILE'), link: '/dashboard/profile' },
        { title: t('TAG_SUBSCRIPTIONS'), link: '/dashboard/profile/subscription' },
        { title: t('TAG_INFORMATION'), link: '/dashboard/profile/subscription/information' }
    ];

    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <BreadCrumb items={breadcrumbItems} />
                <UnsubscribeInformation />
            </div>
        </ScrollArea>
    )
}