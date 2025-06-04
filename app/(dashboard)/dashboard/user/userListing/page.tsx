import { getUserList } from '@/lib/services/userService';
import UserListContent from '@/components/contentPage/userList_content';

export default async function page() {
    // const UserListData = await getUserList()

    return (<UserListContent data={[]} />)
}