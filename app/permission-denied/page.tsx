"use client"
import { Button } from "@/components/ui/button";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yO0W5phoLw6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function PermissionDenied() {
  const router = useRouter();

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center space-y-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <LockIcon className="h-16 w-16 text-red-500" />
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Access Denied</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sorry, you do not have permission to access this page. Please contact the site administrator if you believe
            this is an error.
          </p>
        </div>
        <Button onClick={() => router.back()} variant="default" size="lg">
          Go back
        </Button>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="ghost"
          size="lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}