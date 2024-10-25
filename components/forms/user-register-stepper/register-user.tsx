'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { registerSchema, type RegisterFormValues } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterUserStepper from './register-user-stepper';
import RegisterUserStep1 from './register-user-step1';
import RegisterUserStep2 from './register-user-step2';
import RegisterUserStep3 from './register-user-step3';
import RegisterUserStep4 from './register-user-step4';
import RegisterUserStep5 from './register-user-step5';
import approve from '@/public/Approval.png'
import React from 'react';
import { getLoginIdValidation, getValidateEmail, register } from '@/lib/services/userService';
import { useToast } from '@/components/ui/use-toast';

export default function RegisterUserForm({ packageData }: { packageData: any }) {
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState({});
    const router = useRouter();
    const { toast } = useToast();

    const defaultValues = {
        username: '',
        email: '',
        companyName: '',
        businessRegisterNo: '',
        businessTinNo: "",
        password: "",
        confirmPw: "",
        streetAddress: "",
        aptSuite: '',
        zipCode: "",
        townCity: "",
        contactNo: "",
        // package: '',
        paymentMethod: '',
    }

    const steps = [
        {
            id: 'Step 1',
            name: 'Personal Information:',
            fields: ['username', 'email', 'companyName', 'businessRegisterNo', 'businessTinNo', 'password', 'confirmPw']
        },
        {
            id: 'Step 2',
            name: 'Company Information:',
            fields: ['streetAddress', 'aptSuite', 'zipCode', 'townCity', 'state', 'country', 'contactNo']
        },
        {
            id: 'Step 3',
            name: 'Package Selection:',
            fields: ['package']
        },
        {
            id: 'Step 4',
            name: 'Payment:',
            fields: ['paymentMethod'],
        },
        {
            id: 'Step 5',
            name: 'Complete'
        }
    ]

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues,
        mode: 'onChange'
    });

    const {
        control,
        formState: { errors }
    } = form;

    const processForm: SubmitHandler<RegisterFormValues> = (data) => {
        let skip = true;
        if (data.password !== data.confirmPw) {
            form.setError("confirmPw", {
                type: "manual",
                message: "Password and Confirm Password didn't match!",
            });
            return;
        }

        console.log('data ==>', data);
        setData(data);
        // api call and reset
        // if (form.getValues('streetAddress') != null || undefined) {
        //     skip = false
        // }

        const registerParam = {
            "loginId": form.getValues('username'),
            "password": form.getValues('password'),
            "companyName": form.getValues('companyName'),
            "registrationNo": form.getValues('businessRegisterNo'),
            "busTinNo": form.getValues('businessTinNo'),
            "skipCompanyInfo": skip,
            "streetAddress": form.getValues('streetAddress'),
            // "addressOpt": form.getValues('aptSuite'),
            "postCode": form.getValues('zipCode'),
            "city": form.getValues('townCity'),
            "state": form.getValues('state'),
            "country": form.getValues('country'),
            "contactPrefix": form.getValues('contactPrefix'),
            "contact": form.getValues('contactNo'),
            "email": form.getValues('email'),
            "systemPackageId": form.getValues('package')
        }

        const registerData = register(registerParam)

        registerData.then((res) => {
            if (res.status === true) {
                toast({
                    title: "Success",
                    description: "The new Merchant has been create sucessfully !"
                })
            } else {
                toast({
                    variant: 'destructive',
                    title: "Error",
                    description: "Something went wrong!"
                })
            }
        })
        form.reset();
    };

    type FieldName = keyof RegisterFormValues;

    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await form.trigger(fields as FieldName[], {
            shouldFocus: true
        });

        if (!output) return;

        const checkLoginIdDuplicate = await getLoginIdValidation(form.getValues('username'))
        const checkEmailDuplicate = await getValidateEmail(form.getValues('email'))


        if (checkLoginIdDuplicate.status === false || checkEmailDuplicate.status === false) {
            if (checkLoginIdDuplicate.status === false) {
                form.setError('username', { message: checkLoginIdDuplicate.error.errorMap.username })
            }

            if (checkEmailDuplicate.status === false) {
                form.setError('email', { message: checkEmailDuplicate.error.errorMap.companyEmail })
            }
            return
        }

        if (currentStep < steps.length - 1) {

            setPreviousStep(currentStep);
            setCurrentStep((step) => step + 1);
        }

        if (currentStep === steps.length - 2) {
            await form.handleSubmit(processForm)();
        }
    };

    const prev = () => {
        if (currentStep == 0) {
            router.back();
        }

        if (currentStep > 0) {
            setPreviousStep(currentStep);
            setCurrentStep((step) => step - 1);
        }
    };

    const HandleLogin = async () => {
        // await form.handleSubmit(processForm)();
        router.push('/');
    }

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-5 lg:px-0">
            <RegisterUserStepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />

            <div className="flex h-full items-center p-4 lg:p-8 col-span-3">
                <div className={`mx-auto flex w-full flex-col justify-center items-center  ${currentStep != 2 && "sm:w-[620px] "}`}>
                    <div className="flex-col relative z-20 flex items-center text-lg font-medium space-y-2 w-full">
                        {steps.map((step, index) => (
                            <div key={step.id}>
                                {currentStep === 1 ?
                                    <div className='flex flex-row w-full'>
                                        <div className='flex flex-col flex-1'>
                                            <h1 className='text-2xl'>
                                                {currentStep == index && step.name}
                                            </h1>
                                            <p className='text-base font-light '>{currentStep == index && "Required field *"}</p>
                                        </div>
                                        {/* <div>
                                            {currentStep == index &&
                                                <Button className='w-[100px]'>
                                                    Skip
                                                </Button>
                                            }
                                        </div> */}
                                    </div> : currentStep == 4 ?
                                        <div className='flex flex-col items-center justify-center w-full space-y-5'>
                                            {currentStep == index && <Image src={approve} alt='approve' />}
                                            <h1 className={`text-3xl font-semibold tracking-tight item-center`}>
                                                {currentStep == index && "You are now registered."}
                                            </h1>
                                        </div> :
                                        <h1 className={`text-3xl font-semibold tracking-tight item-center `}>
                                            {currentStep == index && step.name}
                                        </h1>
                                }
                            </div>
                        ))}
                    </div>
                    <div className='pt-[30px] w-full'>
                        <Form {...form}>
                            <form onSubmit={
                                form.handleSubmit(processForm)
                            }>
                                {currentStep == 0 &&
                                    <RegisterUserStep1 form={form} />
                                }
                                {
                                    currentStep == 1 &&
                                    <RegisterUserStep2 form={form} />
                                }
                                {
                                    currentStep == 2 &&
                                    <RegisterUserStep3 form={form} packageData={packageData} />
                                }
                                {
                                    currentStep == 3 &&
                                    <RegisterUserStep4 form={form} />
                                }
                                {
                                    currentStep == 4 &&
                                    <RegisterUserStep5 />
                                }
                            </form>
                        </Form>
                    </div>
                    < div className=" pt-5 w-full" >
                        {currentStep != 4 ?
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="rounded bg-slate-600 px-5 py-1 text-base font-semibold text-white shadow-sm hover:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 w-[100px]"
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={currentStep === steps.length - 1}
                                    className="rounded bg-blue-900 px-2 py-1 text-sm font-semibold text-white shadow-sm  hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 min-w-[100px]"
                                >
                                    {
                                        currentStep === 3 ? form.getValues('package') === 1 ? "register" : "Continue to Payment" : currentStep === 1 ? "Skip" : "Next"
                                    }
                                </button>
                            </div> :
                            <div className='flex justify-center'>
                                <Button className='bg-blue-900 hover:bg-blue-600' onClick={HandleLogin}>Login</Button>
                            </div>
                        }
                    </div >
                </div>
            </div>
        </div >
    )

}