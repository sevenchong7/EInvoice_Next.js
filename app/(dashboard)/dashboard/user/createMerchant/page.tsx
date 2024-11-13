import CreateMerchant from "@/components/contentPage/createMerchant_content";
import { getpaymentMethod, getSubscriptionDuration } from "@/lib/services/generalService";
import { getPaymentMethodType, getRegisterPackage } from "@/lib/services/userService";

export default async function page() {
    const registerPackage = getRegisterPackage()
    const paymentMethod = getpaymentMethod();
    const subscribeDuration = getSubscriptionDuration()
    const paymentType = getPaymentMethodType()
    const subscriptionDuration = getSubscriptionDuration();

    const [registerPackageData, paymentMethodData, subscribeDurationData, paymentTypeData, subscriptionDurationData] = await Promise.all([registerPackage, paymentMethod, subscribeDuration, paymentType, subscriptionDuration])

    return (
        <CreateMerchant packageData={registerPackageData} paymentMethodData={paymentMethodData} subscribeDurationData={subscribeDurationData} paymentTypeData={paymentTypeData} subscriptionDurationLisstData={subscriptionDurationData} />
    )
}