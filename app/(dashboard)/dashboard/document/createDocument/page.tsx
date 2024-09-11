import BreadCrumb from '@/components/breadcrumb';
import { DocumentForm } from '@/components/forms/document-form/document-form';
import React from 'react';

export default function page() {
    const breadcrumbItems = [
        { title: 'Document', link: '/dashboard/document' },
        { title: 'Create Document', link: '/dashboard/document/createDocument' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <DocumentForm initialData={undefined} categories={undefined} />
        </div>
    )
}