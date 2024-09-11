import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentFormValues } from "@/lib/form-schema";
import { useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayAppend, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import fav from '@/public/favorite.svg'
import Image from "next/image";
import alertIcon from '@/public/alert.svg'
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export default function DocumentFormStep2(
    {
        form,
    }: {
        form: UseFormReturn<DocumentFormValues>;
    }) {

    const [loading, setLoading] = useState(false);
    const [tabs, setTabs] = useState('0')
    const [fav, setFav] = useState(false);
    const [FavDeli, setFavDeli] = useState(false);
    const [supplierError, setSupplierError] = useState(false);
    const [buyerError, setBuyerError] = useState(false);
    const [deliveryError, setDeliveryError] = useState(false)

    const {
        control,
        formState: { errors }
    } = form;

    const {
        append: appendSupplierPartyInformation,
        remove: removeSupplierPartyInformation,
        fields: fieldsSupplierPartyInformation,
    } = useFieldArray({
        control,

        name: 'supplierPartyInformation',
    });

    const {
        append: appendSupplierAddress,
        remove: removeSupplierAddress,
        fields: fieldsSupplierAddress,
    } = useFieldArray({
        control,
        name: 'supplierAddress',
    });

    const {
        append: appendBuyerPartyInformation,
        remove: removeBuyerPartyInformation,
        fields: fieldsBuyerPartyInformation
    } = useFieldArray({
        control,
        name: 'buyerPartyInformation'
    })

    const {
        append: appendBuyerAddress,
        remove: removeBuyerAddress,
        fields: fieldsBuyerAddress
    } = useFieldArray({
        control,
        name: 'buyerAddress'
    })

    const {
        append: appendDeliverypartyInformation,
        remove: removeDeliverypartyInformation,
        fields: fieldsDeliverypartyInformation,
    } = useFieldArray({
        control,
        name: 'deliverypartyInformation'
    })

    const {
        append: appendDeliveryAddress,
        remove: removeDeliveryAddress,
        fields: fieldsDeliveryAddress,
    } = useFieldArray({
        control,
        name: 'deliveryAddress'
    })

    const HandleAddSupplierPartyInformation = () => {
        appendSupplierPartyInformation({
            supplierIdentificationId: '',
            supplierSchemeId: '',
        })
    }

    const HandleAddSupplierAddress = () => {
        appendSupplierAddress({
            supplierLine: '',
        })
    }

    const HandleAddBuyerPartyInformation = () => {
        appendBuyerPartyInformation({
            buyerIdentificationId: '',
            buyerSchemeId: '',
        })
    }

    const HandleAddBuyerAddress = () => {
        appendBuyerAddress({
            buyerLine: '',
        })
    }

    const HandleAddDeliverypartyInformation = () => {
        appendDeliverypartyInformation({
            deliveryIdentificationId: '',
            deliverySchemeId: '',
        })
    }

    const HandleAddDeliveryAddress = () => {
        appendDeliveryAddress({
            deliveryLine: '',
        })
    }

    const HandleFav = () => {
        setFav(true)
    }

    const HandleFavDeli = () => {
        setFavDeli(true)
    }

    useEffect(() => {
        if (errors.supplierId || errors.agencyName || errors.supplierIndustryClassCode || errors.supplierIndustryName || errors.supplierRegisterName) {
            setSupplierError(false)
        } else {
            setSupplierError(true)
        }

        if (errors.buyerRegisterName) {
            setBuyerError(false)
        } else {
            setBuyerError(true)
        }

        if (errors.deliveryRegistrationName) {
            setDeliveryError(false)
        } else {
            setDeliveryError(true)
        }

    }, [errors.supplierId, errors.agencyName, errors.supplierIndustryClassCode, errors.supplierIndustryName, errors.supplierRegisterName, errors.buyerRegisterName, errors.deliveryRegistrationName])

    useEffect(() => {
        console.log(supplierError)
        console.log(buyerError)
    }, [supplierError, buyerError])

    const SupplierContent = () => {
        return (
            <>
                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Account Information</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <FormField
                            control={form.control}
                            name="supplierId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Supplier ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="agencyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agency Name <span className={"text-red-500"}>*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type='text'
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Party Information</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <div>
                            <FormField
                                control={form.control}
                                name="supplierIndustryClassCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Industry Classification Code <span className={"text-red-500"}>*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="supplierIndustryName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Industry Name <span className={"text-red-500"}>*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="supplierRegisterName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Registration Name <span className={"text-red-500"}>*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                disabled={loading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {fieldsSupplierPartyInformation?.map((field, index) => (
                            <div key={`${field.id}-${index}`} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name={`supplierPartyInformation.${index}.supplierIdentificationId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Identification ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    placeholder="C20792859020"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`supplierPartyInformation.${index}.supplierSchemeId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Scheme ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    placeholder="TIN"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index === 0 ?
                                    <div className={`flex ${errors.supplierPartyInformation ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { HandleAddSupplierPartyInformation() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                    </div>
                                    :
                                    <div className={`flex ${errors.supplierPartyInformation ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { removeSupplierPartyInformation(index) }} disabled={fieldsSupplierPartyInformation.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                    </div>
                                }
                            </div>
                        ))}

                    </div>
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Address</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        {fieldsSupplierAddress?.map((field, index) => (
                            <div key={`${field.id}-${index}`} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name={`supplierAddress.${index}.supplierLine`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Line {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {index === 0 ?
                                    <div className={`flex col-span-2 ${errors.supplierAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { HandleAddSupplierAddress() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                    </div> :
                                    <div className={`flex col-span-2 ${errors.supplierAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { removeSupplierAddress(index) }} disabled={fieldsSupplierAddress.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                    </div>
                                }
                            </div>

                        ))}

                        <FormField
                            control={form.control}
                            name={'supplierZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Contact</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <FormField
                            control={form.control}
                            name={'supplierContact'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'supplierEmail'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
            </>
        )
    }

    const BuyerContent = () => {
        return (
            <>
                <div className="flex flex-row justify-between mt-[20px]">
                    <div className="flex items-center">
                        <p>Favorite User</p>
                        <div className="ml-[20px]">
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a User" />
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => { }} className="flex flex-row items-center justify-between">
                                Favorite
                                <div className={` ml-2 ${!fav ? "text-gray-500 " : " text-yellow-400"} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-fit">
                            <DialogHeader className="items-center">
                                <DialogTitle className="text-2xl">My Favorite Confirmation</DialogTitle>
                            </DialogHeader>
                            <div className="p-[10px]">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-center text-sm">
                                        Please double-check the details to ensure they are correct.<br />
                                        If you confirm, this information will be saved for quick access next time.
                                    </p>
                                    <p className="text-center text-sm pt-[20px]">
                                        To confirm, please click "Confirm". <br />
                                        If you do not want to save this information, click "Cancel".
                                    </p>
                                </div>

                            </div>
                            <DialogFooter className="flex flex-row justify-between w-full sm:justify-between pt-[20px]">
                                <DialogClose asChild>
                                    <Button onClick={() => { setFav(false) }} type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <DialogClose>
                                    <Button onClick={() => { HandleFav() }} type="submit">Confirm</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog >
                </div >

                <div className="pt-[30px]">
                    <h1 className="text-2xl font-semibold">Party Information</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        {/* <FormField
                            control={form.control}
                            name={'buyerIndustryClassCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry Classification Code <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerIndustryName'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Industry Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}

                        <FormField
                            control={form.control}
                            name={'buyerRegisterName'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            fieldsBuyerPartyInformation?.map((field, index) => (
                                <div key={field.id} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name={`buyerPartyInformation.${index}.buyerIdentificationId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Identification ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        placeholder="C20792859020"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`buyerPartyInformation.${index}.buyerSchemeId`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Scheme ID</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        disabled={loading}
                                                        placeholder="TIN"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {index === 0 ?
                                        <div className={`flex ${errors.buyerPartyInformation ? "items-center" : "items-end"}`}>
                                            <button onClick={() => { HandleAddBuyerPartyInformation() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                        </div>
                                        :
                                        <div className={`flex ${errors.buyerPartyInformation ? "items-center" : "items-end"}`}>
                                            <button onClick={() => { removeBuyerPartyInformation(index) }} disabled={fieldsBuyerPartyInformation.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                        </div>
                                    }
                                </div>
                            ))}
                    </div >
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Address</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        {fieldsBuyerAddress?.map((field, index) => (
                            <div key={field.id} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name={`buyerAddress.${index}.buyerLine`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Line {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {index === 0 ?
                                    <div className={`flex col-span-2 ${errors.buyerAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { HandleAddBuyerAddress() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                    </div> :
                                    <div className={`flex col-span-2 ${errors.buyerAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { removeBuyerAddress(index) }} disabled={fieldsBuyerAddress.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                    </div>
                                }
                            </div>

                        ))}

                        <FormField
                            control={form.control}
                            name={'buyerZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>


                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Contact</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <FormField
                            control={form.control}
                            name={'buyerContact'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact No.</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'buyerEmail'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                </div>
            </>
        )
    }

    const DeliveryContent = () => {
        return (
            <>
                <div className="flex flex-row justify-between mt-[20px]">
                    <div className="flex items-center">
                        <p>Favorite Delivery</p>
                        <div className="ml-[20px]">
                            <Select >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a Delivery" />
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button onClick={() => { }} className="flex flex-row items-center justify-between">
                                Favorite
                                <div className={` ml-2 ${!FavDeli ? "text-gray-500 " : " text-yellow-400"} `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                </div>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-fit">
                            <DialogHeader className="items-center">
                                <DialogTitle className="text-2xl">My Favorite Confirmation</DialogTitle>
                            </DialogHeader>
                            <div className="p-[10px]">
                                <div className="flex flex-col items-center justify-center">
                                    <p className="text-center text-sm">
                                        Please double-check the details to ensure they are correct.<br />
                                        If you confirm, this information will be saved for quick access next time.
                                    </p>
                                    <p className="text-center text-sm pt-[20px]">
                                        To confirm, please click "Confirm". <br />
                                        If you do not want to save this information, click "Cancel".
                                    </p>
                                </div>

                            </div>
                            <DialogFooter className="flex flex-row justify-between w-full sm:justify-between pt-[20px]">
                                <DialogClose asChild>
                                    <Button onClick={() => { setFavDeli(false) }} type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <DialogClose>
                                    <Button onClick={() => { HandleFavDeli() }} type="submit">Confirm</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog >
                </div >

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Party Information</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <FormField
                            control={form.control}
                            name={'deliveryRegistrationName'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Registration Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-2"></div>
                        {fieldsDeliverypartyInformation.map((field, index) => (
                            <div key={field.id} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name={`deliverypartyInformation.${index}.deliveryIdentificationId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Identification ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    placeholder="C20792859020"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`deliverypartyInformation.${index}.deliverySchemeId`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Scheme ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    placeholder="TIN"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index === 0 ?
                                    <div className={`flex  ${errors.deliverypartyInformation ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { HandleAddDeliverypartyInformation() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700 ">+</button>
                                    </div>
                                    :
                                    <div className={`flex  ${errors.deliverypartyInformation ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { removeDeliverypartyInformation(index) }} disabled={fieldsDeliverypartyInformation.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200 ">-</button>
                                    </div>

                                }
                            </div>

                        ))}


                    </div>
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Address</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        {fieldsDeliveryAddress.map((field, index) => (
                            <div key={field.id} className="col-span-3 gap-8 md:grid md:grid-cols-3">
                                <FormField
                                    control={form.control}
                                    name={`deliveryAddress.${index}.deliveryLine`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Line {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    disabled={loading}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {index === 0 ?
                                    <div className={`flex col-span-2 ${errors.deliveryAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { HandleAddDeliveryAddress() }} className="bg-black text-white rounded-full w-[35px] h-[35px] hover:bg-gray-700">+</button>
                                    </div>
                                    :
                                    <div className={`flex col-span-2 ${errors.deliveryAddress ? "items-center" : "items-end"}`}>
                                        <button onClick={() => { removeDeliveryAddress(index) }} disabled={fieldsDeliveryAddress.length - 1 === 0} className=" rounded-full border bg-white text-black w-[35px] h-[35px] hover:bg-gray-200">-</button>
                                    </div>
                                }
                            </div>
                        ))}
                        <FormField
                            control={form.control}
                            name={'deliveryZipCode'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Zip Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryCity'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryState'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryCountry'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="pt-[20px]">
                    <h1 className="text-2xl font-semibold">Shipment</h1>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <div className="gap-8 md:grid md:grid-cols-3 p-[20px]">
                        <FormField
                            control={form.control}
                            name={'deliveryShipmentId'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Shipment ID</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="col-span-2" />

                        <FormField
                            control={form.control}
                            name={'deliveryAllowanceChargeReason'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Allowance Charge Reason</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryCurrency'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'deliveryAmount'}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Tabs defaultValue="supplier" className="w-full ">
                <TabsList className="flex w-full h-full">
                    <TabsTrigger onClick={() => { setTabs('0') }} value="supplier" className={`flex-1 h-[40px] ${tabs == '0' && 'flex-[2]'}`}>
                        Supplier
                        {!supplierError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            There are still required field that are empty in the Supplier Form!
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        }
                    </TabsTrigger>
                    <TabsTrigger onClick={() => { setTabs('1') }} value="buyer" className={`flex-1 h-[40px] ${tabs == '1' && 'flex-[2]'}`}>
                        Buyer
                        {!buyerError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            There are still required field that are empty in the Buyer Form!
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        }
                    </TabsTrigger>
                    <TabsTrigger onClick={() => { setTabs('2') }} value="delivery" className={`flex-1 h-[40px] ${tabs == '2' && 'flex-[2]'}`}>
                        Delivery
                        {!deliveryError &&
                            <div className="ml-[10px] text-orange-500">
                                <HoverCard>
                                    <HoverCardTrigger>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="w-fit">
                                        <h1>
                                            There are still required field that are empty in the Delivery Form!
                                        </h1>
                                    </HoverCardContent>
                                </HoverCard>
                            </div>
                        }
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="supplier">
                    <SupplierContent />
                </TabsContent>
                <TabsContent value="buyer">
                    <BuyerContent />
                </TabsContent>
                <TabsContent value="delivery">
                    <DeliveryContent />
                </TabsContent>
            </Tabs >
        </>
    )
}