'use client'
import { useEffect, useState } from "react"
import BreadCrumb from "./breadcrumb"
import { useTranslations } from "next-intl"
import { RoleClient } from "./tables/role-tables/client"
import { getRoles } from "@/lib/services/userService"
import { MerchantContent, Role } from "@/constants/data"

export default function RoleContent({ roleData, merchantData }: { roleData: any, merchantData: any }) {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '/dashboard/user' },
        { title: t('TAG_ROLE_LISTING'), link: '/dashboard/user/roleListing' }
    ];
    const [roleList, setRoleList] = useState<Role[]>([])
    const [merchantList, setMerchantList] = useState<MerchantContent[]>([])

    useEffect(() => {
        setRoleList(roleData.content)
        setMerchantList(merchantData.content)
    }, [roleData, merchantData])

    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RoleClient roleData={roleList} merchantData={merchantList} />
        </div>
    )
}
