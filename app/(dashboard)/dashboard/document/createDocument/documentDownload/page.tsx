import DocumentDownload from "@/components/forms/document-form/document-form-download";
import React from 'react';

export default function page() {
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <DocumentDownload />
        </div>
    )
}