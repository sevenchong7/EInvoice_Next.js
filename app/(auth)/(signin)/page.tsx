import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { url } from 'inspector';
import Image from 'next/image';
import img from '@/public/bgImg.png'
import image from '@/public/Group28.png'


export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function AuthenticationPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-cover bg-center ">
          <Image
            src={img}
            alt='bg-img'
            layout="fill"
            objectFit="fill"
            objectPosition="center" />
        </div>
      </div>

      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center  sm:w-[405px]">
          <div className="flex flex-col  ">
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign In
            </h1>
            <p className="text-sm pt-[5px] text-nowrap">
              Enter your email and password below to sign in your account.
            </p>
          </div>
          <UserAuthForm />
          <p className='text-center text-sm pt-[50px]'>New to EInvoice? <Link href='/register' className='text-blue-800 hover:underline'>Join Now</Link></p>
        </div>
      </div>
    </div>
  );
}
