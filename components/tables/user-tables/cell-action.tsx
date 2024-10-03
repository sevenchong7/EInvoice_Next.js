'use client';
import { AlertModal } from '@/components/modal/alert-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/left-accordion"
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { User } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [effect, setEffect] = useState(false);
  const t = useTranslations()
  // const router = useRouter();
  // router.push(`/dashboard/user/userListing/${data.id}`)
  const onConfirm = async () => { };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        title={`${t('TAG_DELETE_USER_MODAL_TITLE')}?`}
        description={t('TAG_DELETE_USER_MODAL_DESC')}
      />
      <div className='flex flex-row space-x-5'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='border-2 border-blue-800 text-blue-800 rounded-lg p-1 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
            </button>
          </SheetTrigger>
          <EditUser data={data} />
        </Sheet>

        <button onClick={() => setOpen(true)} className='border-2 border-black rounded-lg p-1 hover:bg-gray-200'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
        </button>
      </div>


      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/user/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </>
  );
};


const EditUser = ({ data }: { data: User }) => {
  const t = useTranslations()
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(data.role);
  const [status, setStatus] = useState(data.status)
  const [dashboardCheck, setDashboardCheck] = useState(false);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [user, setUser] = useState(false);
  const [merchant, setMerchant] = useState(false);
  const [createMerchant, setCreatMerchant] = useState(false);
  const [uploadDocument, setUploadDocument] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [userListing, setUserListing] = useState(false)
  const [viewUser, setViewUser] = useState(false)
  const [updateUser, setUpdateUser] = useState(false)
  const [deleteUser, setDeleteUser] = useState(false)
  const [textVisible, setTextVisible] = useState(true);

  const handleDashboardChange = (checked: boolean) => {
    setDashboardCheck(checked);
    if (checked) {
      setAdd(true);
      setEdit(true);
      setView(true);
    } else if (!checked) {
      setAdd(false)
      setEdit(false)
      setView(false)
    }
  };

  const handleMerchant = (checked: boolean) => {
    setMerchant(checked);
    if (checked) {
      setCreatMerchant(true)
      setUploadDocument(true)
      setPaymentMethod(true)
    } else {
      setCreatMerchant(false)
      setUploadDocument(false)
      setPaymentMethod(false)
    }
  }

  const handleUserListing = (checked: boolean) => {
    setUserListing(checked);
    if (checked) {
      setViewUser(true);
      setUpdateUser(true);
      setDeleteUser(true);
    } else {
      setViewUser(false);
      setUpdateUser(false);
      setDeleteUser(false);
    }
  }

  const handleUser = (checked: boolean) => {
    setUser(checked)
    if (checked) {
      handleMerchant(checked)
      handleUserListing(checked)
    }
    else {
      handleMerchant(checked)
      handleUserListing(checked)
    }
  }

  useEffect(() => {

    if (add) {
      setAdd(true)
    }
    if (edit) {
      setEdit(true)
    }
    if (view) {
      setView(true)
    }

    if (add && edit && view) {
      setDashboardCheck(true)
    } else {
      setDashboardCheck(false)
    }

  }, [edit, add, view])

  useEffect(() => {

    if (createMerchant) {
      setCreatMerchant(true)
    }
    if (uploadDocument) {
      setUploadDocument(true)
    }
    if (paymentMethod) {
      setPaymentMethod(true)
    }

    if (createMerchant && uploadDocument && paymentMethod) {
      setMerchant(true)
    } else {
      setMerchant(false)
    }

  }, [createMerchant, uploadDocument, paymentMethod])

  useEffect(() => {

    if (viewUser) {
      setViewUser(true)
    }
    if (updateUser) {
      setUpdateUser(true)
    }
    if (deleteUser) {
      setDeleteUser(true)
    }

    if (viewUser && updateUser && deleteUser) {
      setUserListing(true)
    } else {
      setUserListing(false)
    }

  }, [viewUser, updateUser, deleteUser])

  useEffect(() => {
    if (merchant && userListing) { setUser(true) } else { setUser(false) }
  }, [merchant, userListing])

  const CustomeCheckBox = ({ id, title, checked, onCheckedChange }: { id: string, title: string, checked: boolean, onCheckedChange: () => void }) => {
    return (
      <div className='flex flex-row space-x-2 items-center'>
        <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
        <label htmlFor={id} id={id} className='text-sm'>{title}</label>
      </div>
    )
  }

  const HandleStatus = () => {
    if (status == 'Active') {
      setStatus('Inactive')
    } else {
      setStatus('Active')
    }

    setTextVisible(false);

    setTimeout(() => {
      setTextVisible(true);
    }, 300);

  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className='text-2xl'>{t('TAG_EDIT_USER_INFORMATION')}</SheetTitle>
        {/* <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription> */}
      </SheetHeader>
      <div className="grid gap-4 py-4">
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" >
            Name
          </Label>
          <Input id="name" value={name} placeholder={data.name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
        </div> */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" >
            {t('TAG_EMAIL')}
          </Label>
          <Input id="email" value={data.email} disabled={true} type='email' onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="role">
            {t('TAG_ROLE')}
          </Label>
          <Input id="role" type='text' value={role} placeholder={data.role} onChange={(e) => setRole(e.target.value)} className="col-span-3" />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="status" className='col-span-2'>
            {t('TAG_STATUS')}
          </Label>
          {
            data.status == 'Pending Verification' ? <p className='text-orange-500 text-center text-sm'>{data.status}</p> :

              <Button
                onClick={HandleStatus}
                className={cn(
                  "relative flex items-center transition-all duration-300",
                  status === "Active" ? "bg-blue-800 hover:bg-blue-700 justify-start" : "justify-end text-right",
                  "rounded-lg"
                )}
              >
                <div
                  className={cn(
                    "absolute rounded-full bg-white w-5 h-5 transition-all duration-300",
                    status === "Active" ? "translate-x-14 ease-linear" : "-translate-x-14 ease-linear"
                  )}
                />
                <p
                  className={cn(
                    textVisible ? "opacity-100 " : "opacity-0"
                  )}
                >
                  {status}
                </p>
              </Button>


            // <Button onClick={() => setStatus("Active")} className='col-span-2'>  <div className='rounded-full bg-white w-5 h-5 mr-[10px] ' /> {status} </Button>
          }
          {/* <Input id="role" type='text' placeholder={data.role} className="col-span-3" /> */}
        </div>

        <div className="">
          <Label htmlFor="status">
            {t('TAG_ACCESS_CONTROL')}:
          </Label>
          <Separator />
          <Accordion type='multiple' defaultValue={['item-1', 'user', 'merchant', 'listing']}>
            <AccordionItem value="item-1" className='border-white pt-4'>
              <div className='flex flex-row items-center space-x-2'>
                <AccordionTrigger className='justify-start '></AccordionTrigger>
                <CustomeCheckBox id='dashboard' title={t('TAG_DASHBOARD')} checked={dashboardCheck} onCheckedChange={() => handleDashboardChange(!dashboardCheck)} />
              </div>
              <div className='pl-[50px] pt-2'>
                <AccordionContent>
                  <CustomeCheckBox id='add' title={t('TAG_ADD')} checked={add} onCheckedChange={() => setAdd(!add)} />
                </AccordionContent>
                <AccordionContent>
                  <CustomeCheckBox id='edit' title={t('TAG_EDIT')} checked={edit} onCheckedChange={() => setEdit(!edit)} />
                </AccordionContent>
                <AccordionContent>
                  <CustomeCheckBox id='view' title={t('TAG_VIEW')} checked={view} onCheckedChange={() => setView(!view)} />
                </AccordionContent>
              </div>
            </AccordionItem>
            <AccordionItem value='user'>
              <div className='flex flex-row items-center space-x-2'>
                <AccordionTrigger className='justify-start'></AccordionTrigger>
                <CustomeCheckBox id='user' title={t('TAG_USER')} checked={user} onCheckedChange={() => handleUser(!user)} />
              </div>
              <div className='pt-2 pl-[50px]'>
                <AccordionContent >
                  <AccordionItem value='merchant'>
                    <div className='flex flex-row items-center space-x-2'>
                      <AccordionTrigger className='justify-start'></AccordionTrigger>
                      <CustomeCheckBox id='merchant' title={t('TAG_MERCHANT')} checked={merchant} onCheckedChange={() => handleMerchant(!merchant)} />
                    </div>
                    <div className='pl-[50px] pt-2'>
                      <AccordionContent >
                        <CustomeCheckBox id='createMerchant' title={t('TAG_CREATE_MERCHANT')} checked={createMerchant} onCheckedChange={() => setCreatMerchant(!createMerchant)} />
                      </AccordionContent>
                      <AccordionContent>
                        <CustomeCheckBox id='uploadDocument' title={t('TAG_UPLOAD_DOCUMENT')} checked={uploadDocument} onCheckedChange={() => setUploadDocument(!uploadDocument)} />
                      </AccordionContent>
                      <AccordionContent>
                        <CustomeCheckBox id='paymentMethod' title={t('TAG_MULTI_PAYMENT_METHOD')} checked={paymentMethod} onCheckedChange={() => setPaymentMethod(!paymentMethod)} />
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </AccordionContent>
                <AccordionContent>
                  <AccordionItem value='listing'>
                    <div className='flex flex-row items-center space-x-2'>
                      <AccordionTrigger className='justify-start'></AccordionTrigger>
                      <CustomeCheckBox id='userListing' title={t('TAG_USER_LISTING')} checked={userListing} onCheckedChange={() => handleUserListing(!userListing)} />
                    </div>
                    <div className='pl-[50px] pt-2'>
                      <AccordionContent>
                        <CustomeCheckBox id='viewUser' title={t('TAG_VIEW_USER')} checked={viewUser} onCheckedChange={() => setViewUser(!viewUser)} />
                      </AccordionContent>
                      <AccordionContent>
                        <CustomeCheckBox id='updateUser' title={t('TAG_UPDATE_USER_INFO')} checked={updateUser} onCheckedChange={() => setUpdateUser(!updateUser)} />
                      </AccordionContent>
                      <AccordionContent>
                        <CustomeCheckBox id='deleteUser' title={t('TAG_DELETE_USER')} checked={deleteUser} onCheckedChange={() => setDeleteUser(!deleteUser)} />
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button type="submit" className='bg-blue-800 hover:bg-blue-700'>{t('TAG_CONFIRM')}</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  )
}

