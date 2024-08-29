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

interface ProfileFormType {
  initialData: any | null;
  categories: any;
}

export const RegisterUserStepperAdmin: React.FC<ProfileFormType> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const headerTitle = "Create New Merchant"
  const headerDescription = 'To create new Merchant, we first need some basic information about the Merchant.';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});
  const delta = currentStep - previousStep;

  const defaultValues = {
    email: '',
    companyName: '',
    registerNo: "",
    businessTinNo: "",
    password: "",
    confirmPw: "",
    streetAddress: "",
    zipCode: "",
    townCity: "",
    state: "",
    country: "",
    contactNo: "",
    package: '',
    payment: [],
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

  const { append, remove, fields } = useFieldArray({
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

  const processForm: SubmitHandler<RegisterUserAdminFormValues> = (data) => {
    console.log('data ==>', data);
    setData(data);
    // api call and reset
    // form.reset();
  };

  type FieldName = keyof RegisterUserAdminFormValues;

  const steps = [
    {
      id: 'Step 1',
      name: 'Personal Information',
      fields: ['email', 'companyName', 'registerNo', 'businessTinNo', 'password', 'confirmPw']
    },
    {
      id: 'Step 2',
      name: 'Company Information',
      fields: ['streetAddress', 'aptSuite', 'zipCode', 'townCity', 'state', 'country', 'contactNo']
    },
    {
      id: 'Step 3',
      name: 'Package Selection',
      fields: ['package']
    },
    {
      id: 'Step 4',
      name: 'Payment:',
      fields: fields
        ?.map((_, index) => [
          `payment.${index}.paymentMethod`,
          `payment.${index}.paymentAmount`,
          `payment.${index}.referenceNo`,
          `payment.${index}.imgUrl`,
          // Add other field names as needed
        ])
        .flat()
    },
    {
      id: 'Step 5',
      name: 'Complete'
    }
  ];

  const next = async () => {
    const fields = steps[currentStep].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {

      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }

    if (currentStep === steps.length - 1) {
      await form.handleSubmit(processForm)();
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
      <div className='flex flex-col h-full overflow-y-scroll'>
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
            <ul className="flex gap-4">
              {steps.map((step, index) => (
                <li key={step.id} className="md:flex-1">
                  {currentStep > index ? (
                    <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-sky-600 transition-colors ">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  ) : currentStep === index ? (
                    <div
                      className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                      aria-current="step"
                    >
                      <span className="text-sm font-medium text-sky-600">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
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
                    <RegisterUserStep3Admin form={form} />
                  )
                }
                {
                  currentStep === 3 && (
                    <RegisterUserStep4Admin form={form} append={append} remove={remove} fields={fields} />
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
      </div>
    </>
  );
};
