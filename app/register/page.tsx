import { Metadata } from 'next';
import RegisterUserForm from '@/components/forms/user-register-stepper/register-user';
import { getRegisterPackage } from '@/lib/services/userService';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register User.'
};

export default async function AuthenticationPage() {
    const packageData = await getRegisterPackage()
    return (
        <RegisterUserForm packageData={packageData} />
    );
}
