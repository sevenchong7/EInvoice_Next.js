import ProfileContent from "@/components/contentPage/profile_content";
import { getCountry } from "@/lib/services/generalService";
import { getMerchantInfo, getSubscription } from "@/lib/services/userService";

export default async function page() {
  // const getSubscriptionData = getSubscription();
  // const getMerchantInfoData = getMerchantInfo();
  // const getCountryData = getCountry();

  // const [subscriptionData, merchantInfoData, countryData] = await Promise.all([getSubscriptionData, getMerchantInfoData, getCountryData])


  return (
    <ProfileContent subscriptionData={[]} merchantInfoData={null} countryData={[]} />
  );
}
