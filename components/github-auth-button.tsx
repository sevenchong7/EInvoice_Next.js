'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button } from './ui/button';
import { Icons } from './icons';

export default function GoogleSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn('github', { callbackUrl: callbackUrl ?? '/dashboard' })
      }
    >
      <div className='rounded-full border bg-stone-100 p-1'>
        <Icons.gmail className="mr-2 h-4 w-4 " />
      </div>
      <div className='flex-1'>
        Continue with Gmail
      </div>
    </Button>
  );
}
