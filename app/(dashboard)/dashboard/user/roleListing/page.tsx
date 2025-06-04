import { getMerchantList, getRoles } from '@/lib/services/userService';
import RoleContent from '@/components/contentPage/role_content';

export default async function Page() {
    // const roleData = await getRoles()

    return (
        <RoleContent roleData={[]} />
    );

}