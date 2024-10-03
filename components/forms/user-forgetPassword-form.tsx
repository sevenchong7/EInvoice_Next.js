'use client';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from '@/components/forms/user-auth-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { url } from 'inspector';
import Image from 'next/image';
import bgImg from '@/public/bgImg.png'
import resetPwImage from '@/public/resetPassword.png'
import { useState } from 'react';
import { Span } from 'next/dist/trace';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema, ForgetPasswordValues } from '@/lib/form-schema';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function UserForgetPassword() {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const defaultValues = { email: '' }


    const steps = [
        {
            id: 'Step 1',
            name: 'Reset Password',
            content: "Enter your email address and we will send you instructions to reset your password",
            button: 'Send Password Reset Email',
            fields: ['email']
        },
        {
            id: 'Step 2',
            name: 'Check Your Email',
            content: (<>Please check <span className='text-blue-900'>example@gmail.com</span> for instructions to reset your password </>),
            button: 'Resent Email',
        },
    ]

    const form = useForm<ForgetPasswordValues>({
        resolver: zodResolver(forgetPasswordSchema),
        defaultValues,
        mode: 'onChange'
    });

    const {
        control,
        formState: { errors }
    } = form;

    type FieldName = keyof ForgetPasswordValues;

    const HandleButton = async () => {
        const fields = steps[currentStep].fields;
        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true
        });

        if (!output) return;

        if (currentStep == 0) {
            setCurrentStep(currentStep + 1)
        } else if (currentStep == 1) {
            router.push("/resetPassword")
        }
    }


    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-cover bg-center ">
                    <Image
                        src={bgImg}
                        alt='bg-img'
                        layout="fill"
                        objectFit="fill"
                        objectPosition="center" />
                </div>
            </div>

            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center  sm:w-[405px]">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={resetPwImage}
                            alt='bg-img'
                            layout="cover"
                            objectFit="cover"
                            objectPosition="center" />

                        {steps.map((step, index) => (
                            <>
                                <h1 className="text-2xl font-semibold tracking-wide">
                                    {currentStep == index && step.name}
                                </h1>

                                <p className="text-sm text-center w-4/5 pt-[5px]">
                                    {currentStep == index && step.content}
                                </p >

                                {currentStep == 0 && index == 0 &&
                                    <div className='w-full pt-[20px]'>
                                        <Form {...form}>
                                            <form >
                                                <FormField
                                                    name='email'
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    type="email"
                                                                    disabled={loading}
                                                                    {...field}
                                                                    placeholder='Email Address*'
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </form>
                                        </Form>
                                    </div>
                                }

                                {
                                    currentStep == index &&
                                    <div className='pt-[20px] w-full'>
                                        <Button className='w-full bg-blue-900 hover:bg-blue-600' onClick={HandleButton}>
                                            {step.button}
                                        </Button>
                                    </div>
                                }

                            </>
                        ))}

                        <Link href={"/"} className='hover:underline text-blue-900 pt-[10px]'>Back to Login</Link>

                    </div>
                </div>
            </div>
        </div>
    );
}
