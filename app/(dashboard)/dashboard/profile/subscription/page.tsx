import SubscriptionContent from "@/components/contentPage/subscription_content";
import { getSubscription } from "@/lib/services/userService";

export default async function page() {
    const getSubscriptionData = await getSubscription()
    return (
        <SubscriptionContent getSubscriptionData={getSubscriptionData} />
    )
}