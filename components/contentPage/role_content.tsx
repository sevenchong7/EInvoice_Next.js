'use client'
import { Role, MerchantContent } from "@/constants/data";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import BreadCrumb from "../breadcrumb";
import { RoleClient } from "../tables/role-tables/client";


export default function RoleContent({ roleData }: { roleData: any }) {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '' },
        { title: t('TAG_ROLE_LISTING'), link: '/dashboard/user/roleListing' }
    ];
    const [roleList, setRoleList] = useState<Role[]>([])

    useEffect(() => {
        setRoleList(roleData.content)
    }, [roleData])

    return (
        <div className="flex flex-col flex-1 h-full space-y-3 p-5">
            <BreadCrumb items={breadcrumbItems} />
            <RoleClient roleData={roleList} />
        </div>
    )
}
