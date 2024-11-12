import { Metadata } from 'next';
import RegisterUserForm from '@/components/forms/user-register-stepper/register-user';
import { getRegisterPackage } from '@/lib/services/userService';
import { getpaymentMethod, getSubscriptionDuration } from '@/lib/services/generalService';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register User.'
};

export default async function AuthenticationPage() {
    const registerPackage = getRegisterPackage();
    const paymentMethod = getpaymentMethod();
    const subscriptionDuration = getSubscriptionDuration();

    const [registerPackageData, paymentMethodData, subscriptionDurationData] = await Promise.all([registerPackage, paymentMethod, subscriptionDuration])

    console.log('registerPackageData = ', registerPackageData)
    return (
        <RegisterUserForm packageData={registerPackageData} paymentMethodData={paymentMethodData} subscriptionDurationData={subscriptionDurationData} />
    );
}
