import MerchantListContent from '@/components/contentPage/merchantList_content';
import { getCountry } from '@/lib/services/generalService';
import { getMerchantList } from '@/lib/services/userService';

export default async function page() {
    const merchantList = await getMerchantList();
    const getCountryList = await getCountry()

    const [merchantListData, getCountryListData] = await Promise.all([merchantList, getCountryList])

    return (
        <MerchantListContent merchantListData={merchantListData} getCountryListData={getCountryListData} />
    )
}