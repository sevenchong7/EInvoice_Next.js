'use client';
import BreadCrumb from "@/components/breadcrumb";
import SubscriptionPayment from "@/components/profile/subscription-payment";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearchParams } from "next/navigation";


export default function page() {
    const param = useSearchParams()
    const subPackage = param.get('sub')
    const breadcrumbItems = [
        { title: 'Profile', link: '/dashboard/profile' },
        { title: 'Subscription', link: '/dashboard/profile/subscription' },
        { title: 'Payment', link: '/dashboard/profile/subscription/payment' }
    ];

    return (
        // <ScrollArea className="h-full">
        <div className="h-full space-y-4 p-4 pt-6 md:p-8">
            <BreadCrumb items={breadcrumbItems} />
            <SubscriptionPayment subPackage={subPackage} />
        </div>
        // </ScrollArea>
    )
}