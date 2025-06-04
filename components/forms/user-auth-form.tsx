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
import { PasswordInput } from '../ui/passwordInput';
import { useToast } from '../ui/use-toast';
import { login } from '@/action/auth';
import React from 'react';
import { useTheme } from 'next-themes';
import LoadingOverlay from '../loading';

//auth zod
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
  const { setTheme } = useTheme();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    username: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  // const checkRemeberMe = () => {
  //   const storedRmbMe = localStorage.getItem('rmbMe');
  //   const sessionExpiry = localStorage.getItem('sessionExpiry');
  //   const accessExpiry = sessionExpiry ? JSON.parse(sessionExpiry) : null
  //   const rememberMe = storedRmbMe ? JSON.parse(storedRmbMe) : null

  //   //check the rmb me 
  //   if (rememberMe === true) {
  //     setLoading(true)
  //     const storeSession = localStorage.getItem('session')
  //     const sessionData = storeSession ? JSON.parse(storeSession) : null
  //     const username = localStorage.getItem('username')

  //     //if the localStorage 'session' is not null
  //     if (sessionData != null) {
  //       const currentDate = new Date;
  //       const compareDate = new Date(sessionData.user.accessTokenExpiry);

  //       if (currentDate > compareDate) {
  //         //if the accessToken is expiry remove all the localStorage and session and reset the theme
  //         localStorage.removeItem('username')
  //         localStorage.removeItem('rmbMe')
  //         localStorage.removeItem('session')
  //         localStorage.removeItem('theme')
  //         setTheme('light')

  //       } else if (currentDate < compareDate) {
  //         //if the accessToken still valid update the session using the localStorage
  //         const sessionUpdate = update({
  //           loginId: username,
  //           permission: sessionData.user.permissions,
  //           accessToken: sessionData.user.accessToken,
  //           accessTokenExpiry: sessionData.user.accessTokenExpiry,
  //           refreshToken: sessionData.user.refreshToken,
  //           refreshTokenExpiry: sessionData.user.refreshTokenExpiry,
  //           merchantId: sessionData.user.merchantId,
  //           xAcceptLanguage: sessionData.user.xAcceptLanguage,
  //           emailDisplay: sessionData.user.emailDisplay
  //         })

  //         //then redirect to main page
  //         sessionUpdate.then(() => {
  //           router.replace('/dashboard')
  //         })
  //       }
  //     } else {
  //       //remove and reset all localStorage and theme
  //       setLoading(false)
  //       localStorage.removeItem('username')
  //       localStorage.removeItem('rmbMe')
  //       localStorage.removeItem('session')
  //       localStorage.removeItem('theme')
  //       setTheme('light')
  //     }
  //   }
  //   else if (sessionExpiry != null) {
  //     setLoading(true)
  //     const currentDate = new Date;
  //     const compareDate = new Date(accessExpiry);

  //     if (compareDate > currentDate) {
  //       router.replace('/dashboard')
  //     } else {
  //       localStorage.removeItem('sessionExpiry')
  //     }
  //     setLoading(false)
  //   }
  //   else {
  //     setLoading(false)
  //     localStorage.removeItem('username')
  //     localStorage.removeItem('rmbMe')
  //     localStorage.removeItem('session')
  //     localStorage.removeItem('theme')
  //     localStorage.removeItem('sessionExpiry')
  //     setTheme('light')
  //   }
  // }

  useEffect(() => {
    // localStorage.removeItem('username')
    // localStorage.removeItem('rmbMe')
    // localStorage.removeItem('session')
    // localStorage.removeItem('theme')
    // setTheme('light')
    // setLoading(true)
    // checkRemeberMe()
  }, [])

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true)
    const signInStatus = await login(data.username, data.password);
    console.log("signInStatus = ", signInStatus)


    if (signInStatus?.error) {
      setLoading(false)
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
      }

      //if no delay redirect the middleware will redirect to /?rsc=*** 
      setTimeout(() => {
        router.replace('/dashboard');
      }, 500);
      // setLoading(false)
      // Delay of 500 milliseconds
    }
  };

  return (
    <>

      {
        //Loading screen
        loading && <LoadingOverlay />
      }
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
            <button className='text-sm text-blue-800 hover:underline' onClick={() => { router.push('/forgetPassword') }}>Forget Password</button>
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


      {
        //wait to link the Google sign in api or service.
      /* <div className='pt-[50px]'>
        <GoogleSignInButton />
      </div> */}
    </>
  );
}