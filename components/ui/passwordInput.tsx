import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPw, setShowPw] = React.useState(false);
        return (
            <div className='flex relative w-full items-center'>
                <input
                    type={showPw ? "text" : "password"}
                    className={cn(
                        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <button onClick={() => setShowPw(!showPw)} className='flex right-3 absolute '>
                    {
                        showPw ?
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1657" width="24" height="24"><path d="M787.6864 393.8304H236.3136A118.2208 118.2208 0 0 0 118.144 512v393.8304A118.2208 118.2208 0 0 0 236.3136 1024h551.3728a118.2208 118.2208 0 0 0 118.0672-118.1696V512a118.2208 118.2208 0 0 0-118.0672-118.1696zM551.3984 737.28v89.7024a39.3728 39.3728 0 0 1-78.7456 0V737.28a78.7456 78.7456 0 1 1 78.7456 0zM512.0256 0C344.5504 0 236.3136 122.368 236.3136 311.808v121.4464h118.1696V311.808c0-58.2656 15.36-193.6384 157.5424-193.6384 123.4944 0 152.3712 98.5088 156.8256 170.9056h118.272C778.8288 112.64 672.6912 0 512.0256 0z" p-id="1658"></path></svg>
                            :
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1510" width="24" height="24"><path d="M490.04 0h44c2.56 0.6 5.12 1.44 7.72 1.72 138.12 14.6 245.12 129.76 248.52 268.6 1.16 46.96 0.36 93.96 0.44 140.96v12.76h34.84c41.76 0 65.68 23.88 65.68 65.8 0.04 156.32 0.04 312.64 0 468.92 0 41.24-24.08 65.16-65.24 65.16h-344.96c-95.32 0-190.64-0.08-285.96 0.08-16.8 0-31.48-4.84-43.72-16.4-14.04-13.24-18.64-30-18.6-48.88 0.16-106.64 0.08-213.32 0.08-319.96 0-50-0.08-100 0-149.96 0.08-40.52 24.36-64.72 64.68-64.76h35.84c0-6.6-0.08-12.2 0-17.76 0.8-54.6-3.44-109.88 3.48-163.72 14.28-111 78.12-186.36 182.48-226.12 22.4-8.52 47.08-11.12 70.72-16.44z m200.92 423.52c0.2-2.76 0.56-5 0.56-7.24 0-45.96 0.12-91.92-0.12-137.88-0.04-9.28-0.76-18.68-2.4-27.84-17.88-100.04-105.6-163.16-206.12-148.6-77.56 11.24-144.08 80.16-148.52 158.2-3.04 53.44-1.24 107.16-1.56 160.76 0 0.88 0.72 1.76 1.12 2.6h357.04z m-116.68 423.12c-0.56-3.56-0.84-6.16-1.36-8.68-6.16-29.28-12.2-58.6-18.6-87.8-1.48-6.76-0.84-11.08 5.28-15.96 19.4-15.48 28.96-36.4 27.72-61.2-1.8-35.64-27.4-64.72-61.04-70.8-34.64-6.24-68.68 11.48-82.96 43.2-14.48 32.12-5.36 67.64 22.68 90.68 2.56 2.08 4.48 7.16 3.96 10.4-2.52 15.08-6.04 29.96-9.12 44.96-3.76 18.12-7.48 36.28-11.4 55.24h124.88z" p-id="1511"></path></svg>
                    }
                </button>
            </div>

        );
    }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
