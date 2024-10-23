'use client'
import { contents } from "@/constants/data"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import BreadCrumb from "../breadcrumb"
import { UserClient } from "../tables/user-tables/client"


export default function UserListContent(data: any) {
    const t = useTranslations()
    const [userList, setUserList] = useState<contents[]>([])

    useEffect(() => {
        setUserList(data.data.content)
    }, [data])

    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_USER_LISTING'), link: '/dashboard/user/userListing' }
    ];

    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <UserClient data={userList} />
        </div>
    )
}