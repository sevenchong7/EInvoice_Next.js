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

export default function AddUser() {
    const router = useRouter();
    const [createDashboard, setCreateDashboard] = useState(false);
    const [removeDashboard, setRemoveDashboard] = useState(false);
    const [updateDashboard, setUpdateDashboard] = useState(false);
    const [viewDashboard, setViewDashboard] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [removeUser, setRemoveUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [viewUser, setViewUser] = useState(false);
    const [createProfile, setCreateProfile] = useState(false);
    const [removeProfile, setRemoveProfile] = useState(false);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [viewProfile, setViewProfile] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (checkAll) {
            setCreateDashboard(true)
            setRemoveDashboard(true)
            setUpdateDashboard(true)
            setViewDashboard(true)
            setCreateUser(true)
            setRemoveUser(true)
            setUpdateUser(true)
            setViewUser(true)
            setCreateProfile(true)
            setRemoveProfile(true)
            setUpdateProfile(true)
            setViewProfile(true)
        } else {
            setCreateDashboard(false)
            setRemoveDashboard(false)
            setUpdateDashboard(false)
            setViewDashboard(false)
            setCreateUser(false)
            setRemoveUser(false)
            setUpdateUser(false)
            setViewUser(false)
            setCreateProfile(false)
            setRemoveProfile(false)
            setUpdateProfile(false)
            setViewProfile(false)
        }
    }, [checkAll])

    const onConfirm = () => {

    }

    return (
        <>
            <div className="flex items-start justify-between">
                <Heading
                    title="Add Users"
                    description="Add new user to your workspace."
                />
            </div>
            <Separator />
            <div className='px-5'>
                <div className='flex flex-col items-center justify-center space-y-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                    <h1 className='text-3xl font-semibold'>Add Member to your workspace</h1>
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
                <div className='flex items-end justify-end w-full pt-[30px]'>
                    <div className='flex items-center space-x-2'>
                        <Checkbox id="chkAll" checked={checkAll} onCheckedChange={() => setCheckAll(!checkAll)} />
                        <label htmlFor='chkAll'>Check All</label>
                    </div>

                </div>
                <div className='gird grid-rows-4 pt-[30px]'>
                    <div className='grid grid-cols-4 bg-gray-200 w-full rounded-lg p-2'>
                        <div className='flex items-center justify-center'>
                            Module
                        </div>
                        <div className='col-span-2'>
                            Function
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b w-full py-3'>
                        <div className='flex items-center justify-center'>
                            Dashboard
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>Create Dashboard</div>
                                <div>Remove Dashboard</div>
                                <div>Update Dashboard</div>
                                <div>Delete Dashboard</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox checked={createDashboard} onCheckedChange={() => setCreateDashboard(!createDashboard)} />
                            <Checkbox checked={removeDashboard} onCheckedChange={() => setRemoveDashboard(!removeDashboard)} />
                            <Checkbox checked={updateDashboard} onCheckedChange={() => setUpdateDashboard(!updateDashboard)} />
                            <Checkbox checked={viewDashboard} onCheckedChange={() => setViewDashboard(!viewDashboard)} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b  w-full py-3'>
                        <div className='flex items-center justify-center'>
                            User
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>Create User</div>
                                <div>Remove User</div>
                                <div>Update User</div>
                                <div>Delete User</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox checked={createUser} onCheckedChange={() => setCreateUser(!createUser)} />
                            <Checkbox checked={removeUser} onCheckedChange={() => setRemoveUser(!removeUser)} />
                            <Checkbox checked={updateUser} onCheckedChange={() => setUpdateUser(!updateUser)} />
                            <Checkbox checked={viewUser} onCheckedChange={() => setViewUser(!viewUser)} />
                        </div>
                    </div>
                    <div className='grid grid-cols-4 border-b w-full py-3'>
                        <div className='flex items-center justify-center'>
                            Profile
                        </div>
                        <div className='col-span-2'>
                            <div className='flex grid grid-rows-4 items-end space-y-3'>
                                <div>Create Profile</div>
                                <div>Remove Profile</div>
                                <div>Update Profile</div>
                                <div>Delete Profile</div>
                            </div>
                        </div>
                        <div className='flex grid grid-rows-4 items-end space-y-3'>
                            <Checkbox checked={createProfile} onCheckedChange={() => setCreateProfile(!createProfile)} />
                            <Checkbox checked={removeProfile} onCheckedChange={() => setRemoveProfile(!removeProfile)} />
                            <Checkbox checked={updateProfile} onCheckedChange={() => setUpdateProfile(!updateProfile)} />
                            <Checkbox checked={viewProfile} onCheckedChange={() => setViewProfile(!viewProfile)} />
                        </div>
                    </div>
                </div>
                <div className='flex justify-between pt-[100px]'>
                    <Button className='bg-gray-300 hover:bg-gray-200' onClick={() => router.back()}>Back</Button>
                    <Button className='bg-blue-800 hover:bg-blue-700' onClick={() => setOpen(!open)}>Confirm</Button>
                </div>
            </div>
            <ConfirmModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
                title='Assign to new role?'
                content={
                    <div>
                        <div className='text-black text-center text-sm'>To confirm adding a new role,please enter the new role in the text input field provided</div> <br />
                        <div className='flex m-auto w-72'>
                            <Input value={role} placeholder="Example" onChange={(e) => setRole(e.target.value)} />
                        </div>
                        <br />
                        <p className='text-center text-sm text-gray-400'>Remider : If you do not want to create a new row , please ignore this input.</p>
                    </div>
                }
            />

        </>
    )
}
