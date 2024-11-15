import CreateMerchant from "@/components/contentPage/createMerchant_content";
import { getCountry, getpaymentMethod, getSubscriptionDuration } from "@/lib/services/generalService";
import { getPaymentMethodType, getRegisterPackage } from "@/lib/services/userService";

export default async function page() {
    const registerPackage = getRegisterPackage()
    const paymentMethod = getpaymentMethod();
    const subscribeDuration = getSubscriptionDuration()
    const paymentType = getPaymentMethodType()
    const subscriptionDuration = getSubscriptionDuration();
    const getCountryList = getCountry()

    const [registerPackageData, paymentMethodData, subscribeDurationData, paymentTypeData, subscriptionDurationData, getCountryListData] = await Promise.all([registerPackage, paymentMethod, subscribeDuration, paymentType, subscriptionDuration, getCountryList])

    return (
        <CreateMerchant packageData={registerPackageData} paymentMethodData={paymentMethodData} subscribeDurationData={subscribeDurationData} paymentTypeData={paymentTypeData} subscriptionDurationLisstData={subscriptionDurationData} getCountryListData={getCountryListData} />
    )
}