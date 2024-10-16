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
import { useState } from 'react';
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
  rmbMe: z.boolean().default(false).optional()
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { data: session } = useSession()
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


  const onSubmit = async (data: UserFormValue) => {

    // const signInStatus = await signIn('credentials', {
    //   email: data.email,
    //   password: data.password,
    //   callbackUrl: callbackUrl ?? '/dashboard',
    //   redirect: false
    // })

    const signInStatus = await login(data.username, data.password);

    // console.log("signInStatus ", signInStatus);

    if (signInStatus?.error) {
      toast({
        title: 'Invalid Credentials',
        variant: 'destructive',
        description: `Your username or password is incorrect.`
      });
    } else {
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
