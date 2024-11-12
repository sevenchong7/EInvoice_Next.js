'use client'
import BreadCrumb from '@/components/breadcrumb';
import AddUser from '@/components/tables/user-tables/addUser';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslations } from 'next-intl';


export default function AddNewUserContent() {
    const t = useTranslations()
    const breadcrumbItems = [
        { title: t('TAG_USER'), link: '' },
        { title: t('TAG_USER_LISTING'), link: '/dashboard/user/userListing' },
        { title: t('TAG_ADD_USER'), link: '/dashboard/user/userListing/addUser' }
    ];
    return (
        <ScrollArea className="h-full">
            <div className="flex-1 space-y-4 p-5">
                <BreadCrumb items={breadcrumbItems} />
                <AddUser />
            </div>
        </ScrollArea>
    );
}
