import { getMerchantList, getRoles } from '@/lib/services/userService';
import RoleContent from '@/components/role_content';

export default async function Page() {
    const roleData = getRoles()
    const merchantData = getMerchantList()

    const [role, merchant] = await Promise.all([roleData, merchantData])

    return (
        <RoleContent roleData={role} merchantData={merchant} />
    );

}