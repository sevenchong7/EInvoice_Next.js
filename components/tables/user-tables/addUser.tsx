'use client';
import { ProductForm } from '@/components/forms/product-form';
import { ConfirmModal } from '@/components/modal/confirm-moal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';

export default function AddUser() {
    const router = useRouter();
    const t = useTranslations()
    const [createDashboard, setCreateDashboard] = useState(false);
    const [removeDashboard, setRemoveDashboard] = useState(false);
    const [updateDashboard, setUpdateDashboard] = useState(false);
    const [deleteDashboard, setDeleteDashboard] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [removeUser, setRemoveUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [removeProfile, setRemoveProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const [edit, setEdit] = useState(true);

    const handleCheckAll = (check: boolean) => {
        setCheckAll(check);
        if (check) {
            setCreateDashboard(true)
            setRemoveDashboard(true)
            setUpdateDashboard(true)
            setDeleteDashboard(true)
            setCreateUser(true)
            setRemoveUser(true)
            setUpdateUser(true)
            setDeleteUser(true)
            setCreateProfile(true)
            setRemoveProfile(true)
            setUpdateProfile(true)
            setDeleteProfile(true)
        } else {
            setCreateDashboard(false)
            setRemoveDashboard(false)
            setUpdateDashboard(false)
            setDeleteDashboard(false)
            setCreateUser(false)
            setRemoveUser(false)
            setUpdateUser(false)
            setDeleteUser(false)
            setCreateProfile(false)
            setRemoveProfile(false)
            setUpdateProfile(false)
            setDeleteProfile(false)
        }
    }

    useEffect(() => {
        if (
            createDashboard &&
            removeDashboard &&
            updateDashboard &&
            deleteDashboard &&
            createUser &&
            removeUser &&
            updateUser &&
            deleteUser &&
            createProfile &&
            removeProfile &&
            updateProfile &&
            deleteProfile
        ) {
            setCheckAll(true)
        } else {
            setCheckAll(false)
        }
    }, [
        createDashboard,
        removeDashboard,
        updateDashboard,
        deleteDashboard,
        createUser,
        removeUser,
        updateUser,
        deleteUser,
        createProfile,
        removeProfile,
        updateProfile,
        deleteProfile
    ])

    const onConfirm = () => {

    }

    const HandleConfirm = () => {
        setOpen(!open)
    }

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title={t('TAG_ADD_USER')}
                    description={t('TAG_ADD_USER_DESC')}
                />
            </div>
            <Separator />
            <div className='px-5'>
                <div className='flex flex-col items-center justify-center space-y-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                    <h1 className='text-3xl font-semibold'>{t('TAG_ADD_USER_DESC')}</h1>
                    <div className='flex justify-center items-center w-1/2 space-x-5'>
                        <div className=' flex flex-1'>
                            <Input value={email} placeholder="test@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div >
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='flex items-end justify-end w-full pt-[30px] space-x-5'>
                    <div className='flex items-center space-x-2'>
                        <Checkbox disabled={edit} id="chkAll" checked={checkAll} onCheckedChange={() => handleCheckAll(!checkAll)} />
                        <label htmlFor='chkAll'>{t('TAG_CHECK_ALL')}</label>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <Switch checked={!edit} onCheckedChange={() => setEdit(!edit)} id="edit" />
                        <label htmlFor='edit'>{t('TAG_EDIT')}</label>
                    </div>
                </div>
                <div className='gird grid-rows-4 pt-[30px]'>
                    <div className='grid grid-cols-4 bg-gray-200 w-full rounded-lg p-2'>
                        <div className='flex items-center justify-center'>
                            {t('TAG_MODULE')}
                        </div>
                        <div className='col-span-2'>
                            {t('TAG_FUNCTION')}
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b w-full py-3'>
                        <div className='flex items-center justify-center'>
                            {t('TAG_DASHBOARD')}
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>{t('TAG_CREATE')} {t('TAG_DASHBOARD')}</div>
                                <div>{t('TAG_REMOVE')} {t('TAG_DASHBOARD')}</div>
                                <div>{t('TAG_UPDATE')} {t('TAG_DASHBOARD')}</div>
                                <div>{t('TAG_DELETE')} {t('TAG_DASHBOARD')}</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox disabled={edit} checked={createDashboard} onCheckedChange={() => setCreateDashboard(!createDashboard)} />
                            <Checkbox disabled={edit} checked={removeDashboard} onCheckedChange={() => setRemoveDashboard(!removeDashboard)} />
                            <Checkbox disabled={edit} checked={updateDashboard} onCheckedChange={() => setUpdateDashboard(!updateDashboard)} />
                            <Checkbox disabled={edit} checked={deleteDashboard} onCheckedChange={() => setDeleteDashboard(!deleteDashboard)} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b  w-full py-3'>
                        <div className='flex items-center justify-center'>
                            {t('TAG_USER')}
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>{t('TAG_CREATE')} {t('TAG_USER')}</div>
                                <div>{t('TAG_REMOVE')} {t('TAG_USER')}</div>
                                <div>{t('TAG_UPDATE')} {t('TAG_USER')}</div>
                                <div>{t('TAG_DELETE')} {t('TAG_USER')}</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox disabled={edit} checked={createUser} onCheckedChange={() => setCreateUser(!createUser)} />
                            <Checkbox disabled={edit} checked={removeUser} onCheckedChange={() => setRemoveUser(!removeUser)} />
                            <Checkbox disabled={edit} checked={updateUser} onCheckedChange={() => setUpdateUser(!updateUser)} />
                            <Checkbox disabled={edit} checked={deleteUser} onCheckedChange={() => setDeleteUser(!deleteUser)} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b w-full py-3'>
                        <div className='flex items-center justify-center'>
                            {t('TAG_PROFILE')}
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>{t('TAG_CREATE')} {t('TAG_PROFILE')}</div>
                                <div>{t('TAG_REMOVE')} {t('TAG_PROFILE')}</div>
                                <div>{t('TAG_UPDATE')} {t('TAG_PROFILE')}</div>
                                <div>{t('TAG_DELETE')} {t('TAG_PROFILE')}</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox disabled={edit} checked={createProfile} onCheckedChange={() => setCreateProfile(!createProfile)} />
                            <Checkbox disabled={edit} checked={removeProfile} onCheckedChange={() => setRemoveProfile(!removeProfile)} />
                            <Checkbox disabled={edit} checked={updateProfile} onCheckedChange={() => setUpdateProfile(!updateProfile)} />
                            <Checkbox disabled={edit} checked={deleteProfile} onCheckedChange={() => setDeleteProfile(!deleteProfile)} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between pt-[100px]'>
                    <Button className='bg-gray-300 hover:bg-gray-200' onClick={() => router.back()}>{t('TAG_BACK')}</Button>
                    <Button className='bg-blue-800 hover:bg-blue-700' onClick={() => HandleConfirm()}>{t('TAG_CONFIRM')}</Button>
                </div>
            </div>
            <ConfirmModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
                title={`${t('TAG_ADD_USER_CONFIM_MODAL_TITLE')} ?`}
                content={
                    <div>
                        <div className='text-black text-center text-sm'>{t('TAG_ADD_USER_CONFIM_MODAL_DESC')}</div> <br />
                        <div className='flex m-auto w-72'>
                            <Input value={role} placeholder="Example" onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <br />
                        <p className='text-center text-sm text-gray-400'>{t('TAG_ADD_USER_CONFIM_MODAL_REMIDER')}.</p>
                    </div>
                }
            />

        </>
    )
}
