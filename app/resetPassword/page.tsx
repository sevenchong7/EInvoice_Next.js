import { Metadata } from 'next';
import UserResetPassword from '@/components/forms/user-resetPassword-form';

export const metadata: Metadata = {
    title: 'ResetPassword',
    description: 'Forget Password'
};

export default function AuthenticationPage() {

    return (
        <UserResetPassword />
    );
}
