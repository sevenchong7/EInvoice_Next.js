'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import bgImg from '@/public/bgImg.png'
import resetPwImage from '@/public/resetPassword.png'
import { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgetPasswordSchema, ForgetPasswordValues, resetPasswordSchema, ResetPasswordValues } from '@/lib/form-schema';
import { Input } from '../ui/input';
import { notFound, useParams, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { getVerifyLoginId, putActiveAccount, putPasswordReset } from '@/lib/services/userService';
import { useToast } from '../ui/use-toast';
import NotFound from '@/app/not-found';

export default function UserResetPassword() {
    // const { id } = useParams();
    const param = useSearchParams()
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast()
    const paramVar = 'encryptStr='
    const id = param.get('encryptStr')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string[]>()

    useEffect(() => {
        const verifyLoginId = getVerifyLoginId(paramVar + id)
        verifyLoginId.then((res) => {
            if (res.status === false) {
                router.replace('/not-found')
            } else {
                return
            }
        })
        console.log('id = ', id)
    }, [])

    const defaultValues = {
        password: '',
        confirmPw: '',
    }

    const steps = [
        {
            id: 'Step 1',
            name: 'Set New Password',
            button: 'Update Password',
            fields: ['password', 'confirmPw']
        },
        {
            id: 'Step 2',
            name: 'Password Updated',
            content: (<>The password for the account <span className='text-blue-900'>example@gmail.com</span> has successfully been reset.</>),
            button: 'Return to Login',

        },
    ]
    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues,
        mode: 'onChange'
    });

    const {
        control,
        formState: { errors }
    } = form;

    type FieldName = keyof ResetPasswordValues;

    const HandleButton = async () => {
        const verifyLoginId = await getVerifyLoginId(paramVar + id)
        if (verifyLoginId.status === false) {
            router.replace('/not-found')
        } else {
            return
        }

        const fields = steps[currentStep].fields;
        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true
        });

        if (!output) return;

        if (currentStep == 0) {
            setError(false)
            const passwordResetParam = {
                "password": form.getValues('password'),
                "confirmationPassword": form.getValues('confirmPw')
            }
            const passwordReset = await putPasswordReset(id, passwordResetParam)

            if (passwordReset.status) {
                setCurrentStep(currentStep + 1)
            } else {
                setError(true)
                setErrorMsg(passwordReset.error.errorMap.confirmPassword)
                // toast({
                //     variant: 'destructive',
                //     title: "Error",
                //     description: "Something went wrong when download Please conatact the developer !"
                // })
            }
        } else if (currentStep == 1) {
            router.replace("/")
        }
    }

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-cover bg-center ">
                    <Image
                        src={bgImg}
                        alt='bg-img'
                        fill
                        // layout="fill"
                        // objectFit="fill"
                        sizes='100%'
                        priority={true}
                    // objectPosition="center" 
                    />
                </div>
            </div>

            <div className="flex h-full items-center p-4 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center  sm:w-[405px]">
                    <div className="flex flex-col items-center justify-center">
                        <Image
                            src={resetPwImage}
                            alt='bg-img'
                            // layout="cover"
                            // objectFit="cover"
                            sizes='100%'
                            priority={true}
                        // objectPosition="center" 
                        />

                        {steps.map((step, index) => (
                            <div key={index} className='w-full'>
                                <h1 className="text-2xl font-semibold tracking-wide text-center">
                                    {currentStep == index && step.name}
                                </h1>

                                {currentStep == 1 && index == 1 &&
                                    < p className="text-sm text-center w-full pt-[5px]">
                                        {currentStep == index && step.content}
                                    </p >
                                }

                                {currentStep == 0 && index == 0 &&
                                    <div className='w-full pt-[20px]'>
                                        <Form {...form}>
                                            <form >
                                                <FormField
                                                    name='password'
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    disabled={loading}
                                                                    {...field}
                                                                    placeholder='Password*'
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className='pt-[10px]'>
                                                    <FormField
                                                        name='confirmPw'
                                                        control={form.control}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Input
                                                                        disabled={loading}
                                                                        {...field}
                                                                        placeholder='Confirm Password*'
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </form>
                                        </Form>
                                    </div>
                                }
                                {currentStep == index && error &&
                                    <div className='space-y-2'>
                                        {errorMsg?.map((res) =>
                                            <p className='text-red-500'>{res}</p>)}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}
