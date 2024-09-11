'use client';
import { useEffect, useState } from "react";
import { Heading } from "../ui/heading";
import { Separator } from "../ui/separator";
import { useStore } from "@/action/action";
import { companys } from "@/constants/data";
import { Divide } from "lucide-react";
import { CustomeModal } from "../modal/custome-modal";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { useRouter } from "next/navigation";

export default function UserProfile() {
    const router = useRouter()
    const { setCompany, company } = useStore();
    const [incomplete, setIncomplete] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setCompany(companys)
    }, [])

    useEffect(() => {
        if (company.address == undefined) {
            setIncomplete(true)
        }
    }, [])

    const onConfirm = () => {

    }

    const EditPersonalInfo = () => {
        const [companyName, setCompanyName] = useState('');
        const [regNo, setRegNo] = useState('');
        const [email, setEmail] = useState('');
        const [businessTinNo, setBusinessTinNo] = useState('');

        const HandleEditProfile = () => {

        }

        return (
            <SheetContent className="min-w-[500px]">
                <SheetHeader>
                    <SheetTitle className='text-2xl'>Profile Information</SheetTitle>
                    {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-8">
                        <Label htmlFor="name" className="text-nowrap">
                            Company Name
                        </Label>
                        <Input id="name" value={companyName} placeholder={company.companyName} onChange={(e) => setCompanyName(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-8">
                        <Label htmlFor="role" className="text-nowrap">
                            Registration No.
                        </Label>
                        <Input id="role" type='text' value={regNo} placeholder={company.regNo} onChange={(e) => setRegNo(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-8">
                        <Label htmlFor="email" className="text-nowrap">
                            Email
                        </Label>
                        <Input id="email" value={email} placeholder={company.email} type='email' onChange={(e) => setEmail(e.target.value)} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-8">
                        <Label htmlFor="businessTinNo" className="text-nowrap">
                            Business Tin No.
                        </Label>
                        <Input id="businessTinNo" value={businessTinNo} placeholder={company.businessTinNo} type='text' onChange={(e) => setBusinessTinNo(e.target.value)} className="col-span-3" />
                    </div>

                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={() => HandleEditProfile()} className='bg-blue-800 hover:bg-blue-700'>Confirm</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        )
    }

    const EditCompanyInfo = () => {
        const [address, setAddress] = useState('');
        const [apt_suite_building, setApt_suite_building] = useState('');
        const [zipCode, setZipCode] = useState('');
        const [town, setTown] = useState('');
        const [state, setState] = useState('');
        const [country, setCountry] = useState('');
        const [contact, setContact] = useState('');

        const HandleEditCompanyInfo = () => {

        }

        return (
            <SheetContent className="min-w-[500px]">
                <SheetHeader>
                    <SheetTitle className='text-2xl'>Company Information</SheetTitle>
                    {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <h1 className="text-2xl font-medium">Address</h1>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="address" className="text-nowrap">
                            Street Address <span className="text-red-500">*</span>
                        </Label>
                        <Input id="address" value={address} placeholder={company.address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="apt" >
                            Apt, Suite, Building (Optional)
                        </Label>
                        <Input id="apt" type='text' value={apt_suite_building} placeholder={company.apt_suite_building} onChange={(e) => setApt_suite_building(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="zipCode" className="text-nowrap">
                            Zip Code <span className="text-red-500">*</span>
                        </Label>
                        <Input id="zipCode" value={zipCode} placeholder={company.zipCode} type='email' onChange={(e) => setZipCode(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="town" className="text-nowrap">
                            Town / City<span className="text-red-500">*</span>
                        </Label>
                        <Input id="town" value={town} placeholder={company.town_city} type='text' onChange={(e) => setTown(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="state" className="text-nowrap">
                            State<span className="text-red-500">*</span>
                        </Label>
                        <Input id="state" value={state} placeholder={company.state} type='text' onChange={(e) => setState(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="country" className="text-nowrap">
                            Country<span className="text-red-500">*</span>
                        </Label>
                        <Input id="country" value={country} placeholder={company.country} type='text' onChange={(e) => setCountry(e.target.value)} />
                    </div>

                </div>

                <div className="grid gap-4 py-4">
                    <h1 className="text-2xl font-medium">Contact</h1>
                    <div className="grid grid-cols-2 items-center gap-4">
                        <Label htmlFor="contact" className="text-nowrap">
                            Contact No.<span className="text-red-500">*</span>
                        </Label>
                        <Input id="contact" value={contact} placeholder={company.contactNo} onChange={(e) => setContact(e.target.value)} />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={() => HandleEditCompanyInfo()} className='bg-blue-800 hover:bg-blue-700'>Confirm</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        )
    }


    return (
        <>
            <CustomeModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={false}
                title={
                    <>
                        <div className="flex flex-row space-x-5 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg>
                            <p className="text-2xl font-medium">Share Workspace</p>
                        </div>
                    </>}
                content={
                    <>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row space-x-5">
                                <div className="flex flex-col bg-gray-400 text-center items-center justify-center rounded-full h-10 w-10">
                                    <h1 className="text-lg font-medium">S</h1>
                                </div>
                                <div className="flex flex-col">
                                    <h1>{company.companyName}</h1>
                                    <p className="text-sm text-gray-400">{company.regNo}</p>
                                </div>
                            </div>
                            <div className="bg-black w-32 h-32">
                            </div>
                        </div>

                        <div className="pt-10 space-y-3">
                            <Button className="w-full bg-blue-800 hover:bg-blue-700">Copy Profile Link</Button>
                            <button className="text-sm text-gray-400 w-full hover:underline">Generate QR Page</button>
                        </div>
                    </>
                }
                titleClassName={"items-left"}
            />

            <div className="flex items-center justify-between">
                <Heading title="Profile" description="User's profile" />
            </div>
            <Separator />
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-row items-center space-x-5">
                    <div className="flex bg-gray-300 rounded-full w-20 h-20 items-center justify-center">
                        <h1 className="text-center font-semibold text-5xl">S</h1>
                    </div>
                    <div className="flex flex-col ">
                        <h1 className="text-3xl font-semibold">{company.companyName}</h1>
                        <p className="text-gray-400 text-sm">{company.regNo}</p>
                    </div>
                    <div>
                        {incomplete ?
                            <div className="flex flex-row rounded-lg bg-amber-400/50 px-2 py-1 space-x-2 text-orange-500 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                <p className="text-sm ">Incomplete</p>
                            </div> :
                            <div>

                            </div>
                        }
                    </div>
                </div>
                <Button onClick={() => setOpen(true)}><p className="pr-2">Share</p> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></svg></Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center ">
                        <h1 className="text-2xl font-medium">Personal Information</h1>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button >Edit</Button>
                            </SheetTrigger>
                            <EditPersonalInfo />
                        </Sheet>

                    </div>
                    <div className="gap-4  grid grid-cols-2 py-10">
                        <div className="pl-8">
                            <h1>Company Name</h1>
                            <p className="font-light">{company.companyName}</p>
                        </div>
                        <div className="pl-10">
                            <h1>Register No.</h1>
                            <p className="font-light">{company.regNo}</p>
                        </div>
                        <div className="pl-8">
                            <h1>Email</h1>
                            <p className="font-light">{company.email}</p>
                        </div>
                        <div className="pl-10">
                            <h1>Business Tin No.</h1>
                            <p className="font-light">{company.businessTinNo}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center ">
                        <h1 className="text-2xl font-medium">Subscriptions</h1>
                        <Button onClick={() => router.push('/dashboard/profile/subscription')}>View</Button>

                    </div>
                    <div className="gap-4  grid grid-cols-2 py-10">
                        <div className="pl-8">
                            <h1>Current Subscription</h1>
                            <p className="font-light">{company.subscription}</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 rounded-lg shadow-md shadow-gray-400 p-5">
                    <div className="flex justify-between items-center ">
                        <div className="flex flex-row items-center space-x-5">
                            <h1 className="text-2xl font-medium">Company Information</h1>
                            {
                                incomplete ?
                                    <div className="flex flex-row rounded-lg bg-amber-400/50 px-2 py-1 space-x-2 text-orange-500 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                        <p className="text-sm ">Incomplete</p>
                                    </div> :
                                    <div>

                                    </div>
                            }
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button >Edit</Button>
                            </SheetTrigger>
                            <EditCompanyInfo />
                        </Sheet>
                    </div>
                    <div className="grid grid-cols-2 py-10">
                        <div className="gap-8 grid grid-cols-2 ">
                            <div className="col-span-2 pl-8">
                                <h1 className="text-2xl">Address</h1>
                            </div>
                            <div className="col-span-2 pl-8">
                                <div>
                                    <h1>Street Address</h1>
                                    {company.address == null || company.address == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.address}</p>
                                    }
                                </div>
                            </div>
                            <div className="col-span-2 pl-8">
                                <div>
                                    <h1>Apt,Suite,Building (Optianal)</h1>
                                    {company.apt_suite_building == null || company.apt_suite_building == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.apt_suite_building}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>Zip Code</h1>
                                    {company.zipCode == null || company.zipCode == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.zipCode}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>Town / City</h1>
                                    {company.town_city == null || company.town_city == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.town_city}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>State</h1>
                                    {company.state == null || company.state == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.state}</p>
                                    }
                                </div>
                            </div>
                            <div className="pl-8">
                                <div>
                                    <h1>Country</h1>
                                    {company.country == null || company.country == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.country}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="gap-8 grid grid-cols-2 auto-rows-min">
                            <div className="col-span-2 pl-8">
                                <h1 className="text-2xl">Contact</h1>
                            </div>
                            <div className="col-span-2 pl-8">
                                <div>
                                    <h1>Contact No.</h1>
                                    {company.contactNo == null || company.contactNo == undefined ?
                                        <p>-</p>
                                        :
                                        <p>{company.contactNo}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}