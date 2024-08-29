import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { url } from 'inspector';
import Image from 'next/image';
import img from '@/public/bgImg.png'
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
