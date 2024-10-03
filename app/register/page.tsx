import { Metadata } from 'next';
import RegisterUserForm from '@/components/forms/user-register-stepper/register-user';

export const metadata: Metadata = {
    title: 'Register',
    description: 'Register User.'
};

export default function AuthenticationPage() {
    return (
        <RegisterUserForm />
    );
}
