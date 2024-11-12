'use client'
import { useTranslations } from "next-intl";
import BreadCrumb from "../breadcrumb";
import { DocumentForm } from "../forms/document-form/document-form";


export default function DocumentContent() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_DOCUMENT'), link: '' },
        { title: t('TAG_CREATE_DOCUMENT'), link: '/dashboard/document/createDocument' }
    ];
    return (
        <div className="flex flex-col flex-1 h-full space-y-1 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <DocumentForm initialData={undefined} categories={undefined} />
        </div>
    )
}