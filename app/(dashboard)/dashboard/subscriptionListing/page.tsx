import SubscriptionListContent from "@/components/contentPage/subscriptionList_conten";
import { getSubscriptionList } from "@/lib/services/userService";

export default async function page() {
    const subscriptionListData = await getSubscriptionList();

    return <SubscriptionListContent data={subscriptionListData} />
}