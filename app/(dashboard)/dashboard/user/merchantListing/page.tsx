import MerchantListContent from '@/components/contentPage/merchantList_content';
import { getMerchantList } from '@/lib/services/userService';

export default async function page() {
    const merchantListData = await getMerchantList();

    return (
        <MerchantListContent data={merchantListData} />
    )
}