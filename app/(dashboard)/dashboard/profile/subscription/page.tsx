import SubscriptionContent from "@/components/contentPage/subscription_content";
import { getSubscription } from "@/lib/services/userService";

export default async function page() {
    let subscriptionData = null;

    try {
        subscriptionData = await getSubscription();
    } catch (error) {
        console.error("Failed to fetch subscription data:", error);
    }

    return (
        <SubscriptionContent getSubscriptionData={subscriptionData} />
    )
}