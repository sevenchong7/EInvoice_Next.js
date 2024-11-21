// import DocumentDownload from "@/components/forms/document-form/document-form-download";
import React from 'react';
import dynamic from 'next/dynamic';

//to prevent server side rendering
const DocumentDownload = dynamic(() => import('@/components/forms/document-form/document-form-download'), { ssr: false });

export default function page() {
    return (
        <>
            <div className="flex flex-col flex-1 h-full space-y-1 p-4 w-full overscroll-y-scroll overscroll-x-scroll">
                <DocumentDownload />
            </div>
        </>
    )
}