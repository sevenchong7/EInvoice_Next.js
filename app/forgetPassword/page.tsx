import { Metadata } from 'next';
import UserForgetPassword from '@/components/forms/user-forgetPassword-form';

export const metadata: Metadata = {
    title: 'ForgetPassword',
    description: 'Forget Password'
};

export default function AuthenticationPage() {

    return (
        <UserForgetPassword />
    );
}
