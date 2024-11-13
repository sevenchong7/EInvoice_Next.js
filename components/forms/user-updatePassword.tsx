'use client';
import { UpdateFormValues, updatePasswordFormSchema } from "@/lib/form-schema";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from 'react';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import approve from '@/public/Approval.png';
import Image from 'next/image';
import Required from "../ui/required";
import { useTranslations } from "next-intl";
import { updatePassword } from "@/lib/services/userService";
import { PasswordInput } from "../ui/passwordInput";

export default function UpdatePassword() {
    const [data, setData] = useState({});
    const t = useTranslations()
    const [pwUpdated, setPwUpdated] = useState(false);

    const defaultValues = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const form = useForm<UpdateFormValues>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues,
        mode: 'onChange'
    });

    const {
        control,
        formState: { errors }
    } = form;

    const processForm: SubmitHandler<UpdateFormValues> = (data) => {
        console.log('data ==>', data);
        setData(data);
        // api call and reset
        // form.reset();
    };

    const handleSubmit = async () => {
        try {
            const output = await form.trigger(['currentPassword', 'newPassword', 'confirmPassword'], {
                shouldFocus: true
            });
            if (!output) return;

            const updatePasswordParam = {
                'oldPassword': form.getValues('currentPassword'),
                'password': form.getValues('newPassword'),
                'confirmationPassword': form.getValues('confirmPassword')
            }

            updatePassword(updatePasswordParam).then(
                () => {
                    setPwUpdated(true)
                }
            )
        } catch (error: any) {
        }
    }

    return (
        <div className='flex flex-col h-full overflow-y-scroll p-1'>
            <div className='flex flex-col flex-1 h-full '>
                <div className="flex items-center justify-between mb-[10px]">
                    <Heading title={t('TAG_CREATE_NEW_PASSWORD')} description={t('TAG_UPDATE_PASSWORD')} />
                </div>
                <Separator />
                {
                    !pwUpdated ?
                        < div className="flex flex-col h-screen justify-center ">
                            <Form {...form}>
                                <form
                                    onSubmit={form.handleSubmit(processForm)}
                                >
                                    <div className="grid md:grid-cols-3">
                                        <div></div>
                                        <div className="grid grid-rows-none space-y-10">
                                            <FormField
                                                control={form.control}
                                                name="currentPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_CURRENT_PASSWORD')} <Required /></FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                // disabled={loading}
                                                                // placeholder="johndoe@gmail.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="newPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_NEW_PASSWORD')} </FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                // disabled={loading}
                                                                // placeholder="johndoe@gmail.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t('TAG_CONFIRM_PASSWORD')} </FormLabel>
                                                        <FormControl>
                                                            <PasswordInput
                                                                // disabled={loading}
                                                                // placeholder="johndoe@gmail.com"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex items-center justify-between">
                                                <Button variant={'outline'} className="bg-gray-300 dark:bg-gray-500">{t('TAG_CANCEL')}</Button>
                                                <Button onClick={() => handleSubmit()} className="bg-blue-900 hover:bg-blue-800 dark:text-white">{t('TAG_SUBMIT')}</Button>
                                            </div>
                                        </div>
                                        <div></div>
                                    </div>
                                </form>
                            </Form>
                        </div> :
                        <div className="flex flex-col h-screen  items-center justify-center space-y-10">
                            <Image src={approve} alt='approve' />
                            <h1 className="text-2xl font-semibold">{t('TAG_PASSWORD_UPDATE')}</h1>
                            <p className="text-gray-400 font-light">{t('TAG_PASSWORD_UPDATE_DESC')}.</p>
                        </div>
                }

            </div>
        </div >
    )
}