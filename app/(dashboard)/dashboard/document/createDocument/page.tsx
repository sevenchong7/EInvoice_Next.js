import BreadCrumb from '@/components/breadcrumb';
import { DocumentForm } from '@/components/forms/document-form/document-form';
import { useTranslations } from 'next-intl';
import React from 'react';

export default function page() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_DOCUMENT'), link: '/dashboard/document' },
        { title: t('TAG_CREATE_DOCUMENT'), link: '/dashboard/document/createDocument' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <DocumentForm initialData={undefined} categories={undefined} />
        </div>
    )
}