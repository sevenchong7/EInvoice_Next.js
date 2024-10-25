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
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import GoogleSignInButton from '../github-auth-button';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { PasswordInput } from '../ui/passwordInput';
import { useToast } from '../ui/use-toast';
import { login } from '@/action/auth';
import React from 'react';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter the Username' }),
  password: z.string().min(1, { message: "Please enter the Password" }),
  rmbMe: z.boolean().default(false)
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    username: '',
    password: ''
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const checkRemeberMe = () => {
    const storedRmbMe = localStorage.getItem('rmbMe');
    const rememberMe = storedRmbMe ? JSON.parse(storedRmbMe) : null;
    console.log('[checkRemeberMe] rememberMe= ', rememberMe)
    // if (session != undefined || session != null) {
    if (rememberMe === true) {
      const storeSession = localStorage.getItem('session')
      const sessionData = storeSession ? JSON.parse(storeSession) : null
      const username = localStorage.getItem('username')

      if (sessionData != null) {
        const currentDate = new Date;
        const compareDate = new Date(sessionData.user.accessTokenExpiry);

        if (currentDate > compareDate) {
          localStorage.removeItem('username')
          localStorage.removeItem('rmbMe')
          localStorage.removeItem('session')
          // router.replace('/')
        } else if (currentDate < compareDate) {
          const sessionUpdate = update({
            loginId: username,
            permission: sessionData.user.permissions,
            accessToken: sessionData.user.accessToken,
            accessTokenExpiry: sessionData.user.accessTokenExpiry,
            refreshToken: sessionData.user.refreshToken,
            refreshTokenExpiry: sessionData.user.refreshTokenExpiry,
            merchantId: sessionData.user.merchantId,
            xAcceptLanguage: sessionData.user.xAcceptLanguage,
            emailDisplay: sessionData.user.emailDisplay
          })

          sessionUpdate.then(() => {
            router.replace('/dashboard')
          })
        }
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('rmbMe')
        localStorage.removeItem('session')
      }
    } else {
      localStorage.removeItem('username')
      localStorage.removeItem('rmbMe')
      localStorage.removeItem('session')
      // router.replace('/')
    }
    // } else {
    //   localStorage.removeItem('username')
    //   localStorage.removeItem('rmbMe')
    //   localStorage.removeItem('session')
    // }
  }

  useEffect(() => {
    checkRemeberMe()
  }, [])


  const onSubmit = async (data: UserFormValue) => {

    // const signInStatus = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: callbackUrl ?? '/dashboard',
    //   redirect: false
    // })
    const signInStatus = await login(data.username, data.password);

    if (signInStatus?.error) {
      toast({
        title: 'Invalid Credentials',
        variant: 'destructive',
        description: `Your username or password is incorrect.`
      });
    } else {
      const checkRmbMe = form.getValues('rmbMe');
      if (checkRmbMe === true) {
        const rememberMe = form.getValues('rmbMe')
        const username = form.getValues('username')


        localStorage.setItem('rmbMe', JSON.stringify(rememberMe))
        localStorage.setItem('username', username)
        // localStorage.setItem('session', JSON.stringify(session))
      }
      //  else {
      //   localStorage.removeItem('username')
      //   localStorage.removeItem('rmbMe')
      //   localStorage.removeItem('session')
      // }
      // window.history.pushState(null, '', window.location.href);
      // window.history.replaceState(null, '', '/dashboard');

      router.replace('/dashboard');

    }


    // toast({
    //   variant: 'destructive',
    //   title: signInStatus?.error,
    //   description: 'There was a problem with your request.'
    // });
  };



  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full "
        >

          <div className='pt-[20px]'>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>

          <div className='pt-[20px]'>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      placeholder='Password'
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-row pt-[10px] '>
            <div className='flex-1'>
              <FormField
                control={form.control}
                name='rmbMe'
                render={({ field }) => (
                  <FormItem className='flex flex-row space-x-1 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className='text-sm font-normal'>
                      Remember Me
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <Link href='/forgetPassword' className='text-sm text-blue-800 hover:underline'>Forget Password</Link>
          </div>

          <div className='pt-[50px] flex-1'>
            <Button disabled={loading} className="ml-auto w-full bg-blue-900 hover:bg-blue-800" type="submit">
              Sign In
            </Button>
          </div>

        </form>
      </Form>
      <div className='pt-[50px]'>
        <div className="relative ">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or
            </span>
          </div>
        </div>
      </div>

      <div className='pt-[50px]'>
        <GoogleSignInButton />
      </div>
    </>
  );
}
