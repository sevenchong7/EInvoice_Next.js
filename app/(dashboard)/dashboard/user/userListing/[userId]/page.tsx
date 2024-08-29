import BreadCrumb from '@/components/breadcrumb';
import { ProductForm } from '@/components/forms/product-form';
import AddUser from '@/components/tables/user-tables/addUser';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';


export default function Page() {
    const breadcrumbItems = [
        { title: 'User', link: '/dashboard/user' },
        { title: 'User Listing', link: '/dashboard/user/userListing' },
        { title: 'Add Users', link: '/dashboard/user/userListing/addUser' }
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
