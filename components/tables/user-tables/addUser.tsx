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
import { useEffect, useRef, useState } from 'react';
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
import React from 'react';
import { getLoginIdValidation, getRoleValidation, mechantUserInviteNewUser, roleSelectionList, roleSelectionPermission } from '@/lib/services/userService';
import { cn } from '@/lib/utils';
import { boolean } from 'zod';
import { set } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';
import { ConfirmButton } from '@/components/ui/confirmButton';


interface rolePermission {
    currentPackageId: number,
    mupId: number,
    permissionList: permissionList[],
    roleQuantity: number
}

interface permissionList {
    Function: Function[],
    Route: string,
    selected: boolean
}

interface Function {
    FunctionName: string,
    selected: boolean,
    subFunctions: subFunction[],
    value: string
}

interface subFunction {
    FunctionName: string,
    selected: boolean,
    value: string
}

export default function AddUser() {
    const router = useRouter();
    const t = useTranslations()
    const [checkAll, setCheckAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [roleModal, setRole] = useState('')
    const [username, setUsername] = useState('')
    const [edit, setEdit] = useState(true);
    const [roleSelection, setRoleSelection] = useState<any>();
    const [rolePermission, setRolePermission] = useState<rolePermission>();
    const [selectedRole, setSelectedRole] = useState<any>();
    const [permissionList, setPermissionList] = useState<string[]>([])
    const permissionListRef = useRef<string[]>([]);
    const [checkboxStates, setCheckboxStates] = useState<boolean[][][]>(
        rolePermission?.permissionList
            ? rolePermission.permissionList.map((data) =>
                data.Function.map((value) => value.subFunctions.map(() => false))
            )
            : []
    );
    const [UsernameError, setUsernameError] = useState(true);
    const [UsernameErrorMessage, setUsernameErrorMessage] = useState<string[]>()
    const [roleError, setRoleError] = useState(true);
    const [roleErrorMessage, setRoleErrorMessage] = useState<string[]>()
    const [roleModalError, setRoleModalError] = useState(true)
    const [roleModalErrorMessage, setRoleModalErrorMessage] = useState<string[]>()
    const { toast } = useToast()
    const session = useSession()


    const GetRoleSelectionList = async () => {
        return await roleSelectionList();
    }

    const GetRoleSelectionPermission = async (body: any) => {
        return await roleSelectionPermission(body)
    }

    useEffect(() => {
        GetRoleSelectionList().then((res) => {
            setRoleSelection(res)
        })
    }, [])

    useEffect(() => {
        if (selectedRole !== '' && selectedRole !== undefined && selectedRole !== null) {
            GetRoleSelectionPermission(selectedRole.mupId).then((res) => {
                setRolePermission(res.data)
            })
        }
    }, [selectedRole])

    useEffect(() => {
        if (rolePermission?.permissionList) {
            setCheckboxStates(
                rolePermission.permissionList.map((data) =>
                    data.Function.map((value) => value.subFunctions.map((res) => res.selected))
                )
            );
        }
        setPermissionList([]);
    }, [rolePermission]);

    const handleCheckedChange = (routeIndex: number, funcIndex: number, subFuncIndex: number) => {
        setCheckboxStates((prevState) =>
            prevState.map((route, rIndex) =>
                rIndex === routeIndex
                    ? route.map((checked, fIndex) => fIndex === funcIndex ?
                        checked.map((res, subIndex) => subIndex === subFuncIndex ? !res : res)
                        : checked
                    )
                    : route
            )
        );
    };

    const handleCheckAll = (check: boolean) => {
        setCheckAll(check);
        if (check) {
            if (rolePermission?.permissionList) {
                setCheckboxStates(
                    rolePermission.permissionList.map((data) =>
                        data.Function.map((value) => value.subFunctions.map(() => true))
                    )
                );
            }
        } else {
            if (rolePermission?.permissionList) {
                setCheckboxStates(
                    rolePermission.permissionList.map((data) =>
                        data.Function.map((value) => value.subFunctions.map(() => false))
                    )
                );
            }
        }
    }

    useEffect(() => {
        if (rolePermission?.permissionList) {
            const hasAnyUnchecked = checkboxStates.some(row =>
                row.some(state => state.some(res => res === false))
            );
            setCheckAll(!hasAnyUnchecked); // If no unchecked boxes, set to true
        }
    }, [checkboxStates])

    const setUserPermissionList = (res: any) => {
        setPermissionList((prevList) => {
            if (!prevList.includes(res.value)) {
                return [...prevList, res.value];
            }
            return prevList;
        })
    }

    const checkDuplicateName = () => {
        return false
    }

    const checkDuplicateRole = () => {
        return false
    }

    const onConfirm = async () => {
        const { tempPermissionList } = checkChange();
        if (roleModal == null || roleModal == undefined || roleModal == '') {
            setRoleModalError(false)
            setRoleModalErrorMessage(['Please enter a new role'])
            return
        }
        else {
            const checkRole = await getRoleValidation(roleModal, session.data?.user.merchantId)
            if (checkRole.status == false) {
                setRoleError(false)
                setRoleErrorMessage(checkRole.error.errorMap.role)
                return
            } else {
                setRoleError(true)
            }
        }

        HandleSubmit(tempPermissionList);

    }

    const checkChange = () => {
        let check = true;
        let tempPermissionList: any[] = [];

        if (rolePermission?.permissionList) {
            for (let i = 0; i < rolePermission.permissionList.length; i++) {
                const data = rolePermission.permissionList[i];
                for (let j = 0; j < data.Function.length; j++) {
                    const func = data.Function[j];
                    for (let k = 0; k < func.subFunctions.length; k++) {
                        const res = func.subFunctions[k];
                        if (res.selected !== checkboxStates[i][j][k]) {
                            if (checkboxStates[i][j][k] === true) {
                                tempPermissionList.push(res.value);
                            }
                            check = false;
                        } else {
                            tempPermissionList.push(res.value);
                        }
                    }
                }
            }
        }

        return { check, tempPermissionList };
    };

    const HandleSubmit = (permissionListToSubmit: any[]) => {

        const mechantUserInviteNewUserParam = {
            "loginId": username,
            "role": roleModal != null && roleModal != undefined && roleModal != '' ? roleModal : selectedRole.role,
            "permissionList": permissionListToSubmit,
        };

        const addNewUser = mechantUserInviteNewUser(mechantUserInviteNewUserParam)

        addNewUser.then((res) => {
            if (res.status === true) {
                toast({
                    title: "Success",
                    description: "New User has been added successfully!",
                });
                router.refresh()
            } else {
                setRoleError(false)
                setRoleErrorMessage(res.error.errorMap.role)
                toast({
                    variant: 'destructive',
                    title: "Error",
                    description: res.error.errorMap.role
                });
            }

        })

    };

    async function HandleConfirm() {

        if (selectedRole == undefined || selectedRole == null) {
            setRoleError(false)
            setRoleErrorMessage(['Please select a role !'])
            return;
        } else {
            setRoleError(true)
        }

        if (username == null || username == undefined || username == '') {
            setUsernameError(false)
            setUsernameErrorMessage(['Plese enter the user name'])
            return
        } else {
            setUsernameError(true)

            // const loginIdCheck = await getLoginIdValidation(username)

            // if (loginIdCheck.status == false) {
            //     setUsernameError(false)
            //     setUsernameErrorMessage(loginIdCheck.error.errorMap.username)
            //     return
            // } else {
            //     setUsernameError(true)
            // }
        }

        const { check, tempPermissionList } = checkChange();

        if (!check) {
            setOpen(!open);
            return;
        }

        HandleSubmit(tempPermissionList);
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
                <div className='flex flex-col items-center justify-center space-y-5 '>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                    <h1 className='text-3xl font-semibold'>{t('TAG_ADD_USER_DESC')}</h1>
                    <div className='flex justify-center items-center lg:w-1/2 space-x-5'>
                        <div>
                            <div className=' flex flex-1'>
                                <Input value={username.trim()} placeholder="test@gmail.com" type='email' onChange={(e) => setUsername(e.target.value.trim())} />
                            </div>
                            {
                                UsernameError == false && <p className='text-red-500'>{UsernameErrorMessage}</p>
                            }
                        </div>
                        <div >
                            <Select
                                disabled={loading}
                                value={selectedRole} // Make sure this reflects the selected value
                                onValueChange={(v) => setSelectedRole(v)} // Update the state when a new value is selected
                            >
                                <SelectTrigger className="min-w-[150px]">
                                    <SelectValue placeholder={"Select a Role"} /> {/* Display selected value or placeholder */}
                                </SelectTrigger>
                                <SelectContent className="max-h-[300px] overflow-y-scroll">
                                    {roleSelection?.map((role: any) => (
                                        <SelectItem key={role.mupId} value={role}>
                                            {role.role}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {
                                roleError == false && <p className='text-red-500'>{roleErrorMessage}</p>
                            }
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
                <div className='gird grid-rows-4 pt-[30px] lg:text-base md:text-base sm:text-xs text-xs'>
                    <div className='grid grid-cols-4 bg-gray-200 w-full rounded-t-lg  border-x border-t dark:text-black'>
                        <div className='flex items-center justify-center border-r '>
                            <p className=' my-2'>
                                {t('TAG_MODULE')}
                            </p>
                        </div>
                        <div className='col-span-2 ml-4'>
                            <p className=' my-2'>
                                {t('TAG_FUNCTION')}
                            </p>
                        </div>
                        <div>
                        </div>
                    </div>
                    {rolePermission?.permissionList ?
                        rolePermission.permissionList.map((data, index) => {
                            return <div key={index}>
                                <div className={cn(index % 2 !== 0 && 'bg-blue-100/30', 'grid grid-cols-4 border-x  w-full  border-b ')}>
                                    <div className='flex items-center justify-center border-r'>
                                        {data.Route}
                                    </div>

                                    <div className='col-span-3 '>
                                        {data.Function.map((value, valueIndex) => {
                                            return <div key={valueIndex} className={cn(valueIndex != data.Function.length - 1 && 'pb-1', valueIndex != data.Function.length && valueIndex != 0 && 'pt-1', 'flex flex-cols grid grid-rows-none items-center auto-rows-min grid grid-cols-3 gap-4 ')}>
                                                <div className='flex items-center ml-4'>
                                                    {value.FunctionName}
                                                </div>
                                                <div className='col-span-2'>
                                                    {
                                                        value?.subFunctions.map((sub, subIndex) => {
                                                            return <div key={subIndex} className='flex items-center w-full py-2 grid grid-cols-2 pl-5 justify-between'>
                                                                <div>
                                                                    {sub.FunctionName}
                                                                </div>
                                                                <div className='flex items-center justify-end pr-5'>
                                                                    <Checkbox disabled={edit} checked={checkboxStates[index]?.[valueIndex]?.[subIndex]} onCheckedChange={() => handleCheckedChange(index, valueIndex, subIndex)} />
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                        }) :
                        <div>
                            <div className='grid grid-cols-4  w-full rounded-b-lg  border'>
                                <div className='flex col-span-4 ml-4 items-center justify-center'>
                                    <p className='my-2'>
                                        {t('TAG_SELECT_ROLE')}
                                    </p>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='flex justify-between pt-[100px]'>
                    <Button className='bg-gray-300 hover:bg-gray-200' onClick={() => router.back()}>{t('TAG_BACK')}</Button>
                    <ConfirmButton className='bg-blue-800 hover:bg-blue-700' onClick={() => HandleConfirm()}>{t('TAG_CONFIRM')}</ConfirmButton>
                </div>
            </div >
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
                            <Input value={roleModal} placeholder="Example" onChange={(e) => setRole(e.target.value)} />
                        </div>
                        {
                            roleError == false && <p className='text-red-500'>{roleErrorMessage}</p>
                        }
                        <br />
                        <p className='text-center text-sm text-gray-400'>{t('TAG_ADD_USER_CONFIM_MODAL_REMIDER')}.</p>
                    </div>
                }
            />

        </>
    )
}
