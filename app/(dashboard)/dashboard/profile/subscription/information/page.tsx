import BreadCrumb from "@/components/breadcrumb";
import UnsubscribeInformation from "@/components/profile/unsubscribe-Information";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
    const breadcrumbItems = [
        { title: 'Profile', link: '/dashboard/profile' },
        { title: 'Subscription', link: '/dashboard/profile/subscription' },
        { title: 'Information', link: '/dashboard/profile/subscription/information' }
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