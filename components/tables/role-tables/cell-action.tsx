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
import { Merchant, Role, RoleInfo, User } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { RoleUserClient } from './role-user-tables/client';
import { ConfirmModal } from '@/components/modal/confirm-moal';
import { useTranslations } from 'next-intl';
import React from 'react';
import { editRole, getRoleInfo } from '@/lib/services/userService';
import roleMerchantData from '@/constants/role_merchant.json';
import { useToast } from '@/components/ui/use-toast';

interface CellActionProps {
  data: Role;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const onConfirm = async () => { };

  return (
    <>
      <div className='flex flex-row space-x-5'>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className='border-2 border-blue-800 text-blue-800 rounded-lg p-1 hover:bg-gray-200'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
            </button>
          </SheetTrigger>
          <EditUser data={data} open={open} setOpen={setOpen} />
        </Sheet>
      </div>
    </>
  );
};

const EditUser = ({ data, open, setOpen }: { data: Role, open: boolean, setOpen: any }) => {
  const [loading, setLoading] = useState(false);
  const t = useTranslations()
  const [openModal, setOpenModal] = useState(false);
  const [roleInfo, setRoleInfo] = useState<RoleInfo>();
  const [permissionListCheckboxState, setPermissionListCheckboxState] = useState<boolean[]>()
  const [functionCheckboxState, setFunctionCheckboxState] = useState<boolean[][]>()
  const [subFunctionCheckboxStates, setSubFuntionCheckboxStates] = useState<boolean[][][]>();
  const { toast } = useToast();



  useEffect(() => {
    if (open == true) {
      console.log('data = ', data);
      console.log('mupId = ', data.mupId);

      const GetRoleInfo = () => {
        const getRole = getRoleInfo(data.mupId)
        getRole.then((res) => {
          setRoleInfo(res)
        })
      }

      if (data.mupId != undefined) {
        GetRoleInfo()
      }
    }
  }, [open]);

  useEffect(() => {
    if (roleInfo != undefined)
      console.log('role Info = ', roleInfo)
  }, [roleInfo])

  useEffect(() => {
    if (roleInfo?.permissionList) {
      setPermissionListCheckboxState(roleInfo.permissionList.map((data) => data.selected));
      setFunctionCheckboxState(roleInfo.permissionList.map((data) => data.Function.map((value) => value.selected)));
      setSubFuntionCheckboxStates(roleInfo.permissionList.map((data) => data.Function.map((value) => value.subFunctions.map((res) => res.selected))));
    }
  }, [roleInfo]);

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

  const checkChange = () => {
    let check = true;
    let tempPermissionList: any[] = [];

    if (roleInfo?.permissionList) {
      for (let i = 0; i < roleInfo.permissionList.length; i++) {
        const data = roleInfo.permissionList[i];
        for (let j = 0; j < data.Function.length; j++) {
          const func = data.Function[j];
          for (let k = 0; k < func.subFunctions.length; k++) {
            const res = func.subFunctions[k];
            if (res.selected !== subFunctionCheckboxStates?.[i][j][k]) {
              if (subFunctionCheckboxStates?.[i][j][k] === true) {
                tempPermissionList.push(res.value);
              }
              check = false;
            } else {
              if (res.selected === true) {
                tempPermissionList.push(res.value);
              }
            }
          }
        }
      }
    }

    return { check, tempPermissionList };
  };

  const HandleSubmit = (permissionList: any[]) => {
    const editRoleParam = {
      mupId: data.mupId,
      permission: permissionList
    }

    console.log('editRoleParam = ', editRoleParam)

    const roleEdit = editRole(editRoleParam)

    roleEdit.then(() => {
      setOpen(false)
      toast({
        title: "Success",
        description: "Role has been Edit successfully!",
      });
    })

  }

  const HandleConfirm = () => {
    if (roleInfo == undefined) return;

    const { check, tempPermissionList } = checkChange();

    console.log('tempPermissionList = ', tempPermissionList)

    if (!check) {
      setOpenModal(!openModal);
      return;
    }

    HandleSubmit(tempPermissionList)
  }

  const onConfirm = async () => {
    const { tempPermissionList } = checkChange();
    console.log('tempPermissionList = ', tempPermissionList)
    HandleSubmit(tempPermissionList)
    setOpenModal(false)
  };

  return (
    <>
      <ConfirmModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={onConfirm}
        loading={false}
        title={t('TAG_CONFIRMATION')}
        content={t('TAG_CONFIRMATION_MODAL_DESC')}
      />
      <SheetContent className='md:min-w-[500px]'>
        <ScrollArea className='h-full'>
          <div className='pr-5'>
            <SheetHeader>
              <SheetTitle className='text-2xl'>{t('TAG_ROLE_INFORMATION')}:</SheetTitle>
              <SheetTitle className='text-2xl'>{data.role}</SheetTitle>
            </SheetHeader>
            <div className="">
              <div className="w-full px-1">
                {roleInfo && roleInfo.merchantUserList ? (
                  <RoleUserClient data={roleInfo.merchantUserList} />
                ) : (
                  <p>No user data available</p> // Fallback content if undefined
                )}
              </div>

              <div className="">
                <Label htmlFor="status">
                  {t('TAG_ACCESS_CONTROL')}:
                </Label>
                <Separator />
                <section>
                  <Suspense fallback={<p>Loading Access Control...</p>}>
                    <Accordion type='multiple' defaultValue={[]}>
                      {
                        roleInfo?.permissionList.map((roleInfoRes, roleInfoIndex) => {
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
                  </Suspense>
                </section>
              </div>
            </div>
            <SheetFooter>
              {/* <SheetClose asChild> */}
              <Button type="submit" className='bg-blue-800 hover:bg-blue-700' onClick={() => { HandleConfirm() }}>{t('TAG_CONFIRM')}</Button>
              {/* </SheetClose> */}
            </SheetFooter>
          </div>
          <ScrollBar />
        </ScrollArea>
      </SheetContent>
    </>
  )
}