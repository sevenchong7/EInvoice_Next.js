'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/left-accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getDefaultPermission, getRoleValidation, postAddRole } from "@/lib/services/userService";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { permissionList } from "@/constants/data";
import { Toast, ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ConfirmButton } from "@/components/ui/confirmButton";




//Todo
export default function AddRole({ openSheet, permissionListData, setOpen, setSelectUserModal, mId }: { openSheet: boolean, permissionListData: any, setOpen: any, setSelectUserModal: any, mId: any }) {
    const t = useTranslations()
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const onConfirm = async () => { };
    const [permissionListing, setPermissionListiong] = useState<permissionList[]>()
    const [permissionListCheckboxState, setPermissionListCheckboxState] = useState<boolean[]>()
    const [functionCheckboxState, setFunctionCheckboxState] = useState<boolean[][]>()
    const [subFunctionCheckboxStates, setSubFuntionCheckboxStates] = useState<boolean[][][]>();
    // const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const session = useSession()
    const { toast } = useToast()
    const [roleError, setRoleError] = useState(true);
    const [roleErrorMessage, setRoleErrorMessage] = useState<string[]>()
    const [permissionError, setPermissionError] = useState(true)
    const [permissionErrorMessage, setPermissionErrorMessage] = useState<string[]>()



    useEffect(() => {
        if (openSheet) {
            setPermissionListiong(permissionListData.permissionList)
            setRoleError(true)
            setPermissionError(true)
            setRole('')
        }
    }, [openSheet])

    useEffect(() => {
        if (permissionListing) {
            setPermissionListCheckboxState(permissionListing.map(() => false));
            setFunctionCheckboxState(permissionListing.map((data) => data.Function.map(() => false)));
            setSubFuntionCheckboxStates(permissionListing.map((data) => data.Function.map((value) => value.subFunctions.map(() => false))));
        }
    }, [permissionListing]);

    const handlePermissionListCheckboxState = (routeIndex: number, check: boolean) => {
        setPermissionListCheckboxState((prevState) => {
            return prevState?.map((route, rIndex) => {
                if (rIndex === routeIndex) {
                    setFunctionCheckboxState((prevFuncState) => {
                        return prevFuncState?.map((funcList, funcRIndex) => {
                            if (funcRIndex === routeIndex) {
                                return funcList.map(() => check);
                            } else {
                                return funcList;
                            }
                        });
                    });

                    setSubFuntionCheckboxStates((prevSubFuncState) => {
                        return prevSubFuncState?.map((subFuncList, subFuncRIndex) => {
                            if (subFuncRIndex === routeIndex) {
                                return subFuncList.map((subFunc) => subFunc.map(() => check));
                            } else {
                                return subFuncList;
                            }
                        });
                    });

                    return check;
                } else {
                    return route;
                }
            });
        });
    };

    const handleFunctionCheckboxState = (routeIndex: number, funcIndex: number, check: boolean) => {
        setFunctionCheckboxState((prevState) => {
            const updatedFuncState = prevState?.map((route, rIndex) => {
                if (routeIndex === rIndex) {
                    return route.map((func, fIndex) => fIndex === funcIndex ? check : func);
                } else {
                    return route;
                }
            });

            const allFunctionsChecked = updatedFuncState?.[routeIndex]?.every((func) => func === true);

            setPermissionListCheckboxState((prevPermState) => {
                return prevPermState?.map((route, rIndex) => {
                    if (rIndex === routeIndex) {
                        return allFunctionsChecked ?? false;
                    } else {
                        return route;
                    }
                });
            });

            return updatedFuncState;
        });

        setSubFuntionCheckboxStates((prevSubFuncState) => {
            return prevSubFuncState?.map((subFuncList, rIndex) => {
                if (rIndex === routeIndex) {
                    return subFuncList.map((subFunc, fIndex) => {
                        return fIndex === funcIndex ? subFunc.map(() => check) : subFunc;
                    });
                } else {
                    return subFuncList;
                }
            });
        });
    };

    const handleSubFunctionCheckboxStates = (routeIndex: number, funcIndex: number, subFuncIndex: number, check: boolean) => {
        setSubFuntionCheckboxStates((prevSubFuncState) => {
            const updatedSubFuncState = prevSubFuncState?.map((subFuncList, rIndex) => {
                if (rIndex === routeIndex) {
                    return subFuncList.map((subFunc, fIndex) => {
                        return fIndex === funcIndex
                            ? subFunc.map((subFuncState, sIndex) => (sIndex === subFuncIndex ? check : subFuncState))
                            : subFunc;
                    });
                } else {
                    return subFuncList;
                }
            });

            const allSubFunctionsChecked = updatedSubFuncState?.[routeIndex]?.[funcIndex]?.every(
                (subFunc) => subFunc === true
            );

            setFunctionCheckboxState((prevFuncState) => {
                return prevFuncState?.map((route, rIndex) => {
                    if (rIndex === routeIndex) {
                        return route.map((func, fIndex) => {
                            return fIndex === funcIndex ? allSubFunctionsChecked ?? false : func;
                        });
                    } else {
                        return route;
                    }
                });
            });

            const updatedFunctionState = updatedSubFuncState?.[routeIndex];
            const allFunctionsChecked = updatedFunctionState?.every((func) => func.every((res) => res === true));

            setPermissionListCheckboxState((prevPermState) => {
                return prevPermState?.map((route, rIndex) => {
                    if (rIndex === routeIndex) {
                        return allFunctionsChecked ?? false;
                    } else {
                        return route;
                    }
                });
            });

            return updatedSubFuncState;
        });
    };


    const checkPermission = () => {
        let tempPermissionList: any[] = [];

        if (permissionListing) {
            for (let i = 0; i < permissionListing.length; i++) {
                const data = permissionListing[i];
                for (let j = 0; j < data.Function.length; j++) {
                    const func = data.Function[j];
                    for (let k = 0; k < func.subFunctions.length; k++) {
                        const res = func.subFunctions[k];
                        // if (res.selected !== subFunctionCheckboxStates?.[i][j][k]) {
                        if (subFunctionCheckboxStates?.[i][j][k] === true) {
                            tempPermissionList.push(res.value);
                        }
                        // } else {
                        //     if (res.selected === true) {
                        //         tempPermissionList.push(res.value);
                        //     }
                        // }
                    }
                }
            }
        }

        return { tempPermissionList };
    }


    const HandleConfirm = () => {
        const { tempPermissionList } = checkPermission()
        if (role != '' && role != undefined && tempPermissionList.length != 0) {
            const checkRole = getRoleValidation(role, mId)
            checkRole.then((res) => {
                if (res.status == false) {
                    setRoleError(false)
                    setRoleErrorMessage(res.error.errorMap.role)
                    return
                } else {
                    const roleAddParam = {
                        "role": role,
                        "permission": tempPermissionList
                    }
                    const roleAdd = postAddRole(roleAddParam)

                    roleAdd.then(() => {
                        toast({
                            title: "Success",
                            description: "Role has been added successfully!",
                        });
                        setOpen(false)
                        setSelectUserModal(false)
                        router.refresh()
                    })
                }
            })



        } else {
            if (role == '' || role === undefined) {
                setRoleError(false)
                setRoleErrorMessage(['Please enter a new role'])
                // toast({
                //     variant: "destructive",
                //     title: "Role Error",
                //     description: "Role cannot be empty !",
                //     // action: <ToastAction altText="Try again">Try again</ToastAction>,
                // })
            } else {
                setPermissionError(false)
                setPermissionErrorMessage(['Please select the Permission !'])
                // toast({
                //     variant: "destructive",
                //     title: "Permisstion Error",
                //     description: "The Permission List cannot be empty",
                //     // action: <ToastAction altText="Try again">Try again</ToastAction>,
                // })
            }

        }
    }


    return (
        <>

            <SheetContent className='md:min-w-[500px] max-[600px]:w-full'>
                <ScrollArea className='h-full '>
                    <div className='pr-5'>
                        <SheetHeader>
                            <SheetTitle className='text-2xl'>{t('TAG_ADD_NEW_ROLE')}:</SheetTitle>
                        </SheetHeader>
                        <div className="">
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-5 items-center gap-4">
                                    <Label htmlFor="name" className='col-span-2' >
                                        {t('TAG_ROLE')}
                                    </Label>
                                    <div className="col-span-3">
                                        <Input id="name" value={role} placeholder={'role'} onChange={(e) => setRole(e.target.value)} />
                                        {roleError == false && <p className="text-red-500">{roleErrorMessage}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="">
                                <Label htmlFor="status">
                                    {t('TAG_ACCESS_CONTROL')}:
                                </Label>
                                <Separator />
                                <Accordion type='multiple' defaultValue={[]}>
                                    {
                                        permissionListing?.map((roleInfoRes, roleInfoIndex) => {
                                            return <AccordionItem value={roleInfoRes.Route} key={roleInfoIndex}>
                                                <div className='flex flex-row items-center space-x-2'>
                                                    <AccordionTrigger className='justify-start '></AccordionTrigger>
                                                    <Checkbox id={roleInfoRes.Route} checked={permissionListCheckboxState?.[roleInfoIndex]} onCheckedChange={(check: boolean) => handlePermissionListCheckboxState(roleInfoIndex, check)} />
                                                    <label htmlFor={roleInfoRes.Route}>{roleInfoRes.Route}</label>
                                                </div>
                                                <div className='pl-[50px] pt-2'>
                                                    {
                                                        roleInfoRes.Function.map((funcRes, funcIndex) => {
                                                            return <AccordionContent key={funcIndex}>
                                                                <AccordionItem value={funcRes.FunctionName} >
                                                                    <div className='flex flex-row items-center space-x-2'>
                                                                        <AccordionTrigger className='justify-start '></AccordionTrigger>
                                                                        <Checkbox id={funcRes.FunctionName} checked={functionCheckboxState?.[roleInfoIndex]?.[funcIndex]} onCheckedChange={(check: boolean) => handleFunctionCheckboxState(roleInfoIndex, funcIndex, check)} />
                                                                        <label htmlFor={funcRes.FunctionName}>{funcRes.FunctionName}</label>
                                                                    </div>
                                                                    <div className='pl-[50px] pt-2'>
                                                                        {
                                                                            funcRes.subFunctions.map((subFuncRes, subFuncIndex) => {
                                                                                return <AccordionContent key={subFuncIndex}>
                                                                                    <div className='flex flex-row space-x-2 items-center'>
                                                                                        <Checkbox id={subFuncRes.FunctionName} checked={subFunctionCheckboxStates?.[roleInfoIndex]?.[funcIndex]?.[subFuncIndex]} onCheckedChange={(check: boolean) => handleSubFunctionCheckboxStates(roleInfoIndex, funcIndex, subFuncIndex, check)} />
                                                                                        <label htmlFor={subFuncRes.FunctionName}>{subFuncRes.FunctionName}</label>
                                                                                    </div>
                                                                                </AccordionContent>
                                                                            })
                                                                        }
                                                                    </div>
                                                                </AccordionItem>
                                                            </AccordionContent>
                                                        })
                                                    }
                                                </div>
                                            </AccordionItem>
                                        })
                                    }
                                </Accordion>
                                {permissionError == false && <p className="text-red-500">{permissionErrorMessage}</p>}
                            </div>
                        </div>
                        <SheetFooter>
                            {/* <SheetClose asChild> */}
                            <ConfirmButton type="submit" className='bg-blue-800 hover:bg-blue-700' onClick={() => HandleConfirm()}>{t('TAG_CONFIRM')}</ConfirmButton>
                            {/* </SheetClose> */}
                        </SheetFooter>
                    </div>
                    <ScrollBar />
                </ScrollArea>
            </SheetContent>
        </>
    )
}
