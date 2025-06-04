'use client'
import { useTranslations } from "next-intl";
import BreadCrumb from "../breadcrumb";
import { DocumentForm } from "../forms/document-form/document-form";
import { useGeneralTaskStore } from "@/lib/store/generalStore";
import { useEffect } from "react";


export default function DocumentContent({ getCountryData }: { getCountryData: any }) {
    const t = useTranslations()
    // const setCountryList = useGeneralTaskStore((state) => state.setCountryList)

    useEffect(() => {
        // setCountryList(getCountryData)
    }, [])

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