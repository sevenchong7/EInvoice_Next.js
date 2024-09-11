import BreadCrumb from "@/components/breadcrumb";
import Subscriptions from "@/components/profile/subscription";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function page() {
    const breadcrumbItems = [
        { title: 'Profile', link: '/dashboard/profile' },
        { title: 'Subscription', link: '/dashboard/profile/subscription' }
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