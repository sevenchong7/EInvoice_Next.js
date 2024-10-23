'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { profileSchema, RegisterFormValues, registerSchema, RegisterUserAdminFormValues, registerUserAdminSchema, type ProfileFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import RegisterUserStep1Admin from './register-user-step1-admin';
import RegisterUserStep2Admin from './register-user-step2-admin';
import RegisterUserStep3Admin from './register-user-step3-admin';
import RegisterUserStep4Admin from './register-user-step4-admin';
import RegisterUserStep5Admin from './register-user-step5-admin';
import { useTranslations } from 'next-intl';
import React from 'react';
import { getLoginIdValidation, getValidateEmail, postUploadAdmin, register } from '@/lib/services/userService';
import { useToast } from '@/components/ui/use-toast';

interface ProfileFormType {
  initialData: any | null;
  categories: any;
  packageData: any
}

export const RegisterUserStepperAdmin: React.FC<ProfileFormType> = ({
  initialData,
  categories,
  packageData
}) => {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const headerTitle = t('TAG_CREATE_NEW_MERCHANT')
  const headerDescription = t('TAG_MERCHANT_DESC');
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const [skip, setSkip] = useState(false);
  const delta = currentStep - previousStep;
  const { toast } = useToast()

  const defaultValues = {
    username: '',
    email: '',
    companyName: '',
    businessRegisterNo: "",
    businessTinNo: "",
    password: "",
    confirmPw: "",
    streetAddress: "",
    zipCode: "",
    townCity: "",
    state: "",
    country: "",
    contactNo: "",
    // package: '',
    payment: [
      {
        paymentMethod: '',
        paymentAmount: 0,
        referenceNo: '',
        imgUrl: []
      }
    ],

  }

  const form = useForm<RegisterUserAdminFormValues>({
    resolver: zodResolver(registerUserAdminSchema),
    defaultValues,
    mode: 'onChange'
  });

  const {
    control,
    formState: { errors }
  } = form;

  const { append, remove, fields: paymentFields } = useFieldArray({
    control,
    name: 'payment'
  });


  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const processForm: SubmitHandler<RegisterUserAdminFormValues> = async (data) => {
    console.log('data ==>', data);


    const createNewMerchantParam = {
      "loginId": data.username,
      "password": data.password,
      "companyName": data.companyName,
      "registrationNo": data.businessRegisterNo,
      "busTinNo": data.businessTinNo,
      "skipCompanyInfo": skip,
      "streetAddress": data.streetAddress,
      "postCode": data.zipCode,
      "city": data.townCity,
      "state": data.state,
      "country": data.country,
      "contactPrefix": data.contactPrefix,
      "contact": data.contactNo,
      "email": data.email,
      "systemPackageId": data.package
    }
    const registerData = register(createNewMerchantParam)

    registerData.then((res) => {
      if (res.status === true) {
        toast({
          title: "Success",
          description: "The new Merchant has been create sucessfully !"
        })
      } else {
        toast({
          variant: 'destructive',
          title: "Error",
          description: "Something went wrong!"
        })
      }
    })



    const imgUrlData = form.getValues('payment')
      .map((payData, payIndex) => {
        const imgUrlParam = form.getValues(`payment.${payIndex}.imgUrl`); // Get imgUrl
        return imgUrlParam.map(url => url); // Ensure it's an array of File objects
      })
      .flat()


    const uploadImages = async (imgUrlData: any) => {
      const imgData = new FormData();

      imgUrlData.forEach(async (file: any, index: number) => {
        imgData.append('files', file);
      });

      console.log('FormData content:', Array.from(imgData.entries()));
      const imageData = await postUploadAdmin(imgData);

      // return imageData;
    };



    // const imgUrlData = form.getValues('payment')
    //   .map((payData, payIndex) => {
    //     const imgUrlParam = form.getValues(`payment.${payIndex}.imgUrl`); // Get imgUrl array
    //     return imgUrlParam.map(url => url); // Ensure it's an array of File objects
    //   })
    //   .flat();

    // // Function to upload images one at a time
    // const uploadImages = async (imgUrlData: File[]) => {
    //   for (const file of imgUrlData) {
    //     const formData = new FormData();
    //     formData.append('files', file); // Append one file at a time

    //     // Log the current file being uploaded
    //     console.log('Uploading file:', Array.from(formData.entries()));

    //     try {
    //       const imageData = await postUploadAdmin(formData); // Upload one file at a time
    //       console.log('Response for file:', file.name, imageData);
    //     } catch (error) {
    //       console.error('Error uploading file:', file.name, error);
    //     }
    //   }
    // };

    // Call the function to upload the images
    // await uploadImages(imgUrlData);

    const imageData = await uploadImages(imgUrlData)
  }

  type FieldName = keyof RegisterUserAdminFormValues;

  const steps = [
    {
      id: t('TAG_STEP1'),
      name: t('TAG_PERSONAL_INFROMATION'),
      fields: ['username', 'email', 'companyName', 'businessRegisterNo', 'businessTinNo', 'password', 'confirmPw']
    },
    {
      id: t('TAG_STEP2'),
      name: t('TAG_COMPANY_INFORMATION'),
      fields: ['streetAddress', 'aptSuite', 'zipCode', 'townCity', 'state', 'country', 'contactNo']
    },
    {
      id: t('TAG_STEP3'),
      name: t('TAG_PACKAGE_SELECTION'),
      fields: ['package']
    },
    {
      id: t('TAG_STEP4'),
      name: t('TAG_PAYMENT'),
      fields: [
        'payment',
        ...paymentFields?.map((_, index) => {
          return [
            `payment.${index}.paymentMethod`,
            `payment.${index}.paymentAmount`,
            `payment.${index}.referenceNo`,
            `payment.${index}.imgUrl`
          ];
        }).flat()
      ]

    },
    {
      id: t('TAG_STEP5'),
      name: t('TAG_COMPLETE')
    }
  ];

  const next = async () => {
    if (form.getValues('streetAddress') == '') {
      setSkip(true)
    }

    if (form.getValues('password') !== form.getValues('confirmPw')) {
      form.setError("confirmPw", {
        type: "manual",
        message: "Password and Confirm Password didn't match!",
      });
      return;
    }



    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true
    });

    if (!output) return;

    const checkLoginIdDuplicate = await getLoginIdValidation(form.getValues('username'))
    const checkEmailDuplicate = await getValidateEmail(form.getValues('email'))


    if (checkLoginIdDuplicate.status === false || checkEmailDuplicate.status === false) {
      if (checkLoginIdDuplicate.status === false) {
        form.setError('username', { message: checkLoginIdDuplicate.error.errorMap.username })
      }

      if (checkEmailDuplicate.status === false) {
        form.setError('email', { message: checkEmailDuplicate.error.errorMap.companyEmail })
      }
      return
    }

    if (currentStep === steps.length - 2) {
      await form.handleSubmit(processForm)();
    }

    if (currentStep < steps.length - 2) {

      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }


  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <div className='flex flex-col h-full overflow-y-scroll p-1'>
        <div className='flex flex-col flex-1 h-full '>
          <div className="flex items-center justify-between mb-[10px]">
            <Heading title={headerTitle} description={headerDescription} />
            {initialData && (
              <Button
                disabled={loading}
                // variant="destructive"
                // size="sm"
                onClick={() => setOpen(true)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Separator />
          <div className='mt-[10px] mb-[20px]'>
            <ul className="md:flex gap-4">
              {steps.map((step, index) => (
                <li key={step.id} className="md:flex-1">
                  {currentStep > index ? (
                    <button onClick={() => setCurrentStep(index)} className='text-left flex w-full'>
                      <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                        <span className="text-sm font-medium text-sky-600 transition-colors ">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    </button>
                  ) : currentStep === index ? (
                    <button onClick={() => setCurrentStep(index)} className='text-left flex w-full'>
                      <div
                        className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                        aria-current="step"
                      >
                        <span className="text-sm font-medium text-sky-600">
                          {step.id}
                        </span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    </button>
                  ) : (
                    <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-gray-500 transition-colors">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(processForm)}
              className={cn(currentStep === 4 ? 'flex flex-col w-full h-full items-center justify-center space-y-8 mt-[20px]' : "w-full space-y-8 mt-[20px]")}
            >
              <div
                className={cn(
                  currentStep !== 0
                    ? 'w-full md:inline-block'
                    : 'gap-8 md:grid md:grid-cols-3'
                )}
              >
                {
                  currentStep === 0 && (
                    <RegisterUserStep1Admin form={form} />
                  )
                }
                {
                  currentStep == 1 &&
                  <RegisterUserStep2Admin form={form} />
                }
                {
                  currentStep === 2 && (
                    <RegisterUserStep3Admin form={form} packageData={packageData} />
                  )
                }
                {
                  currentStep === 3 && (
                    <RegisterUserStep4Admin form={form} />
                  )
                }
                {
                  currentStep === 4 && (
                    <RegisterUserStep5Admin />
                  )
                }
              </div>

              {/* <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button> */}
            </form>
          </Form>
          {/* Navigation */}
          <div className='mt-auto justify-end'>

            <div className="flex justify-between ">
              <button
                type="button"
                onClick={prev}
                disabled={currentStep === 0}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};