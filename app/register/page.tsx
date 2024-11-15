import { Metadata } from 'next';
import RegisterUserForm from '@/components/forms/user-register-stepper/register-user';
import { getRegisterPackage } from '@/lib/services/userService';
import { getCountry, getpaymentMethod, getSubscriptionDuration } from '@/lib/services/generalService';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register User.'
};

export default async function AuthenticationPage() {
    const paymentMethod = getpaymentMethod();
    const registerPackage = getRegisterPackage();
    const subscriptionDuration = getSubscriptionDuration();
    const getCountryList = getCountry()

    const [registerPackageData, paymentMethodData, subscriptionDurationData, getCountryData] = await Promise.all([registerPackage, paymentMethod, subscriptionDuration, getCountryList])
    return (
        <RegisterUserForm packageData={registerPackageData} paymentMethodData={paymentMethodData} subscriptionDurationData={subscriptionDurationData} getCountryData={getCountryData} />
    );
}
