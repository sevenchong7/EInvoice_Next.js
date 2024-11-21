'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getSwitchRole, getSwitchRoleList } from "@/lib/services/userService";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export function MerchantSelection({ getSwitchRoleListData }: { getSwitchRoleListData: any }) {
    const t = useTranslations();
    const router = useRouter();
    const { data: session, update } = useSession();
    const [selectedRole, setSelectedRole] = useState<any>()
    const [open, setOpen] = useState(false)

    useEffect(() => {

        getSwitchRoleListData.map((data: any) => {
            if (data.mid == session?.user.merchantId) {
                setSelectedRole(data.mid)
            }
        })

    }, [getSwitchRoleListData])

    useEffect(() => {
    }, [selectedRole])

    const HandleSelectRole = async (value: any) => {
        setSelectedRole(value)

        await update({ merchantId: value })

        RefreshPermission()
    }

    const RefreshPermission = async () => {

        const getSwitchRoleData = await getSwitchRole();

        //update the permission into the session the when session change it will also change the middleware JWT Token session
        await update({ permissions: getSwitchRoleData.permission })

        router.refresh()
    }

    return (
        <Select
            open={open}
            onOpenChange={setOpen}
            value={selectedRole}
            onValueChange={(value) => HandleSelectRole(value)}
        >
            <SelectTrigger className="lg:min-w-[250px] flex-auto">
                <SelectValue placeholder={t('TAG_SELECT_MERCHANT')} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{t('TAG_SELECT_MERCHANT')} </SelectLabel>
                    {
                        getSwitchRoleListData?.map((data: any, index: number) => (
                            <SelectItem key={index} value={data.mid}>{data.merchantName}</SelectItem>
                        ))
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
