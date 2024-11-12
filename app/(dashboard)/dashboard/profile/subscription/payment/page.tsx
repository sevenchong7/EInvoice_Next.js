import { auth } from "@/auth";
import SubscriptionPaymentContent from "@/components/contentPage/subscriptionPayment_content";
import { getpaymentMethod } from "@/lib/services/generalService";
import { getEwalletBalance, getMultiPayment, getRegisterPackage } from "@/lib/services/userService";

export default async function page() {
    const session = await auth()
    const paymentMethod = await getpaymentMethod();
    const multipayment = await getMultiPayment();
    const eWalletBalance = await getEwalletBalance(session?.user.merchantId)
    const packageList = await getRegisterPackage()

    const [paymentMethodData, multipaymentData, eWalletBalanceData, packageListData] = await Promise.all([paymentMethod, multipayment, eWalletBalance, packageList])

    return (
        <SubscriptionPaymentContent paymentMethodData={paymentMethodData} multipaymentData={multipaymentData} eWalletBalanceData={eWalletBalanceData} packageListData={packageListData} />
    )
}