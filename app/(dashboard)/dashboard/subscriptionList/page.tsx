import SubscriptionListContent from "@/components/contentPage/subscriptionList_conten";
import { getMerchantList } from "@/lib/services/userService";

export default async function page() {
    const merchantListData = await getMerchantList();

    return <SubscriptionListContent data={merchantListData} />
}