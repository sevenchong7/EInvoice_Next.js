import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { url } from 'inspector';
import Image from 'next/image';
import bgImg from '@/public/bgImg.png'
import resetPwImage from '@/public/resetPassword.png'
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
