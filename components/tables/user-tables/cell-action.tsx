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
import { contents, User, Users } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Switch } from '@/components/ui/switch';
import { useTranslations } from 'next-intl';
import { getMerchantUserInfo, merchantUserInfoUpdate } from '@/lib/services/userService';
import { ConfirmModal } from '@/components/modal/confirm-moal';
import { useToast } from '@/components/ui/use-toast';
import { ConfirmButton } from '@/components/ui/confirmButton';


interface CellActionProps {
  data: contents;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openSheet, setOpenSheet] = useState(false);
  const [effect, setEffect] = useState(false);
  const t = useTranslations()
  // const router = useRouter();
  // router.push(`/dashboard/user/userListing/${data.id}`)
  const onConfirm = async () => { };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setOpenAlertModal(false)}
        onConfirm={onConfirm}
        loading={loading}
        title={`${t('TAG_DELETE_USER_MODAL_TITLE')}?`}
        description={t('TAG_DELETE_USER_MODAL_DESC')}
      />
      <div className='flex flex-row space-x-5'>
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <button className='border-2 border-blue-800 text-blue-800 rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-gray-500'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
            </button>
          </SheetTrigger>
          <EditUser data={data} open={openSheet} />
        </Sheet>

        <button onClick={() => setOpenAlertModal(true)} className='border-2 border-black dark:border-white rounded-lg p-1 hover:bg-gray-200 dark:hover:bg-gray-500'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
        </button>
      </div>
    </>
  );
};

interface merchantUserInfo {
  muId: string,
  loginId: string,
  role: string,
  status: string,
  permissionList: permissionList[]
}

interface permissionList {
  Function: Function[],
  Route: string,
  selected: boolean
}

interface Function {
  FunctionName: string,
  selected: boolean
  subFunctions: subFunction[]
  value: string
}

interface subFunction {
  FunctionName: string,
  selected: boolean,
  value: string
}



const EditUser = ({ data, open }: { data: contents, open: boolean }) => {
  const t = useTranslations();
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState(data.username);
  // const [email, setEmail] = useState('');
  const [role, setRole] = useState(data.role);
  const [status, setStatus] = useState(data.status);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newRole, setNewRole] = useState('')
  const [merchantUserInfo, setMerchantUserInfo] = useState<merchantUserInfo | undefined>()
  const [textVisible, setTextVisible] = useState(true);
  const [permissionListCheckboxState, setPermissionListCheckboxState] = useState<boolean[]>();
  const [functionCheckboxState, setFunctionCheckboxState] = useState<boolean[][]>();
  const [subFunctionCheckboxStates, setSubFuntionCheckboxStates] = useState<boolean[][][]>();


  const GetMerchantUserInfo = async () => {
    return await getMerchantUserInfo(data.muId)
  }

  useEffect(() => {
    if (open) {
      if (data.muId != undefined) {
        GetMerchantUserInfo().then((res) => setMerchantUserInfo(res))
      }
    }
  }, [open, data]);

  useEffect(() => {
    if (merchantUserInfo?.permissionList) {
      setPermissionListCheckboxState(merchantUserInfo.permissionList.map((data) => data.selected));
      setFunctionCheckboxState(merchantUserInfo.permissionList.map((data) => data.Function.map((value) => value.selected)));
      setSubFuntionCheckboxStates(merchantUserInfo.permissionList.map((data) => data.Function.map((value) => value.subFunctions.map((res) => res.selected))));
    }

  }, [merchantUserInfo]);

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

    if (merchantUserInfo?.permissionList) {
      for (let i = 0; i < merchantUserInfo.permissionList.length; i++) {
        const data = merchantUserInfo.permissionList[i];
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



  const HandleStatus = () => {
    if (status == 'Y') {
      setStatus('N')
    } else {
      setStatus('Y')
    }

    setTextVisible(false);

    setTimeout(() => {
      setTextVisible(true);
    }, 300);

  }

  const onConfirm = () => {
    const { check, tempPermissionList } = checkChange();

    HandleSubmit(tempPermissionList, true);
  }

  const HandleSubmit = (permissionListToSubmit: any[], hasNewRole: boolean) => {
    const mechantUserEditParam = {
      "status": status,
      "hasNewRole": hasNewRole,
      "role": newRole != "" ? newRole : role,
      "permission": permissionListToSubmit
    };

    const updateUserInfo = merchantUserInfoUpdate(data.muId, mechantUserEditParam)

    updateUserInfo.then(() => {
      toast({
        title: "Success",
        description: "User Info has been successfully Updated!",
      });
      router.refresh();
    })
  };

  const HandleConfirm = () => {
    const { check, tempPermissionList } = checkChange();


    if (!check) {
      setOpenModal(true)
      return
    }

    HandleSubmit(tempPermissionList, false);
  }

  return (
    <SheetContent className='max-[600px]:w-full'>
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
          <Label htmlFor="username" >
            {t('TAG_EMAIL')}
          </Label>
          <Input id="username" value={username} disabled={true} type='string' onChange={(e) => setUsername(e.target.value)} className="col-span-3 dark:text-white" />
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
                  status === "Y" ? "bg-blue-800 hover:bg-blue-700 justify-start" : "justify-end text-right ",
                  "rounded-lg"
                )}
              >
                <div
                  className={cn(
                    "absolute rounded-full bg-white w-5 h-5 transition-all duration-300 ",
                    status === "Y" ? "translate-x-14 ease-linear" : "-translate-x-14 ease-linear dark:bg-gray-400"
                  )}
                />
                <div
                  className={cn(
                    textVisible ? "opacity-100 " : "opacity-0", status === "Y" && 'text-white'
                  )}
                >
                  {status === 'Y' ? <p>Active</p> : <p>Inactive</p>}
                </div>
              </Button>


            // <Button onClick={() => setStatus("Active")} className='col-span-2'>  <div className='rounded-full bg-white w-5 h-5 mr-[10px] ' /> {status} </Button>
          }
          {/* <Input id="role" type='text' placeholder={data.role} className="col-span-3" /> */}
        </div>
        <ConfirmModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={onConfirm}
          loading={loading}
          title={`${t('TAG_ADD_USER_CONFIM_MODAL_TITLE')} ?`}
          content={
            <div>
              <div className='text-black text-center text-sm'>{t('TAG_ADD_USER_CONFIM_MODAL_DESC')}</div> <br />
              <div className='flex m-auto w-72'>
                <Input value={newRole} placeholder="Example" onChange={(e) => setNewRole(e.target.value)} />
              </div>
              <br />
              <p className='text-center text-sm text-gray-400'>{t('TAG_ADD_USER_CONFIM_MODAL_REMIDER')}.</p>
            </div>
          }
        />

        <div className="">
          <Label htmlFor="status">
            {t('TAG_ACCESS_CONTROL')}:
          </Label>
          <Separator />
          <Accordion type='multiple' defaultValue={['item-1', 'user', 'merchant', 'listing']}>
            {
              merchantUserInfo?.permissionList.map((merchantInfoRes, roleInfoIndex) => {
                return <AccordionItem value={merchantInfoRes.Route} key={roleInfoIndex}>
                  <div className='flex flex-row items-center space-x-2'>
                    <AccordionTrigger className='justify-start '></AccordionTrigger>
                    <Checkbox id={merchantInfoRes.Route} checked={permissionListCheckboxState?.[roleInfoIndex]} onCheckedChange={(check: boolean) => handlePermissionListCheckboxState(roleInfoIndex, check)} />
                    <label htmlFor={merchantInfoRes.Route}>{merchantInfoRes.Route}</label>
                  </div>
                  <div className='pl-[50px] pt-2'>
                    {
                      merchantInfoRes.Function.map((funcRes, funcIndex) => {
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
        </div>
      </div>
      <SheetFooter>
        {/* <SheetClose asChild> */}
        <ConfirmButton type="submit" onClick={() => HandleConfirm()} className='bg-blue-800 hover:bg-blue-700'>{t('TAG_CONFIRM')}</ConfirmButton>
        {/* </SheetClose> */}
      </SheetFooter>
    </SheetContent>
  )
}

