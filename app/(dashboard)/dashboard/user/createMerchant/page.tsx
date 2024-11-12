import CreateMerchant from "@/components/contentPage/createMerchant_content";
import { getpaymentMethod, getSubscriptionDuration } from "@/lib/services/generalService";
import { getRegisterPackage } from "@/lib/services/userService";

export default async function page() {
    const registerPackage = getRegisterPackage()
    const paymentMethod = getpaymentMethod();
    const subscribeDuration = getSubscriptionDuration()
    const [registerPackageData, paymentMethodData, subscribeDurationData] = await Promise.all([registerPackage, paymentMethod, subscribeDuration])

    return (
        <CreateMerchant packageData={registerPackageData} paymentMethodData={paymentMethodData} subscribeDurationData={subscribeDurationData} />
    )
}