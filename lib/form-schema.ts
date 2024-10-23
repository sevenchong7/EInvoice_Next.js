import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'TAG_NAME_ERROR' }),
  lastname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
  email: z
    .string()
    .email({ message: 'Product Name must be at least 3 characters' }),
  contactno: z.coerce.number(),
  country: z.string().min(1, { message: 'Please select a category' }),
  city: z.string().min(1, { message: 'Please select a category' }),
  // jobs array is for the dynamic fields
  jobs: z.array(
    z.object({
      jobcountry: z.string().min(1, { message: 'Please select a category' }),
      jobcity: z.string().min(1, { message: 'Please select a category' }),
      jobtitle: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
      employer: z
        .string()
        .min(3, { message: 'Product Name must be at least 3 characters' }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Start date should be in the format YYYY-MM-DD'
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'End date should be in the format YYYY-MM-DD'
      })
    })
  )
});

export type ProfileFormValues = z.infer<typeof profileSchema>;


export const registerSchema = z.object({
  username: z.string().trim().min(1, { message: 'Please enter the Username !' }),
  email: z.string().trim().email({ message: "Please Enter a valid Email Address ! " }),
  companyName: z.string().trim().min(3, { message: "Company Name must be at least 3 characters !" }),
  businessRegisterNo: z.string().trim().regex(/^\d{12}$/, { message: 'At least 12 digit number' }),
  businessTinNo: z.string().trim().regex(/^(C|CS|D|E|F|FA|PT|TA|TC|TN|TR|TP|J|LE)\d{11}$/, { message: 'The value must start with one of the prefixes (C, CS, D, E, F, FA, PT, TA, TC, TN, TR, TP, J, LE) followed by 11 digits' }),
  // .min(3, { message: "Business Tin No must be at least 3 characters !" }),
  password: z.string().trim().min(3, { message: "Password must be enter !" }),
  confirmPw: z.string().trim().min(3, { message: "Confirm Password must be enter !" }),
  streetAddress: z.string().trim().optional(),
  aptSuite: z.string().trim().optional(),
  zipCode: z.string().trim().optional(),
  townCity: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
  contactPrefix: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  package: z.coerce.number().min(1, { message: 'Please select one Package!' }),
  paymentMethod: z.string().optional()
}).refine((data) => {
  return data.password === data.confirmPw;
}, {
  path: ["confirmPw"],
  message: "Password and Confirm Password didn't match!",
}).superRefine((data, ctx) => {
  if (data.package !== 1) {
    if (!data.paymentMethod) {
      ctx.addIssue({
        code: 'custom',
        path: ['paymentMethod'],
        message: 'Please select a payment method!'
      })
    }
  }
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address !' })
})

export type ForgetPasswordValues = z.infer<typeof forgetPasswordSchema>;

export const resetPasswordSchema = z.object({
  password: z.string().min(3, { message: "Password must be enter !" }),
  confirmPw: z.string().min(3, { message: "Confirm Password must be enter !" })

}).refine((data) => {
  return data.password === data.confirmPw;
}, {
  path: ["confirmPw"],
  message: "Password and Confirm Password didn't match!",
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});

const IMG_MAX_LIMIT = 3;

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const registerUserAdminSchema = z.object({

  username: z.string().trim().min(1, { message: "Please Enter the Username !" }),
  email: z.string().trim().email({ message: "Please Enter a valid Email Address ! " }),
  companyName: z.string().trim().min(3, { message: "Company Name must be at least 3 characters !" }),
  businessRegisterNo: z.string().trim().regex(/^\d{12}$/, { message: 'At least 12 digit number' }),
  businessTinNo: z.string().trim().regex(/^(C|CS|D|E|F|FA|PT|TA|TC|TN|TR|TP|J|LE)\d{11}$/, { message: 'The value must start with one of the prefixes (C, CS, D, E, F, FA, PT, TA, TC, TN, TR, TP, J, LE) followed by 11 digits' }),
  password: z.string().trim().min(3, { message: "Password must be enter !" }),
  confirmPw: z.string().trim().min(3, { message: "Confirm Password must be enter !" }),
  streetAddress: z.string().trim().optional(),
  aptSuite: z.string().trim().optional(),
  zipCode: z.string().trim().optional(),
  townCity: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
  contactPrefix: z.string().trim().optional(),
  contactNo: z.string().trim().optional(),
  package: z.coerce.number().min(1, { message: "Please Select a package !" }),
  payment: z.array(
    z.object({
      paymentMethod: z.string().optional(),
      paymentAmount: z.coerce.number().optional(),
      referenceNo: z.string().trim(),
      imgUrl: z
        .array(z.custom<File>())
        .refine(
          (files) => {
            return files.every((file) => file instanceof File);
          },
          {
            message: 'Expected a file',
          },
        )
        .refine(
          (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
          `File size should be less than 2mb.`,
        )
        .refine(
          (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
          'Only these types are allowed .jpg, .jpeg, .png and .webp',
        ),
    })
  ),
}).refine((data) => {
  return data.password === data.confirmPw;
}, {
  path: ["confirmPw"],
  message: "Password and Confirm Password didn't match!",
})
  .superRefine((data, ctx) => {
    if (data.package !== 1) {
      data.payment.forEach((payment, index) => {
        if (!payment.paymentMethod) {
          ctx.addIssue({
            code: 'custom',
            path: [`payment.${index}.paymentMethod`],
            message: 'Please Select one Payment Method!',
          });
        }
        if (!payment.paymentAmount || payment.paymentAmount <= 0) {
          ctx.addIssue({
            code: 'custom',
            path: [`payment.${index}.paymentAmount`],
            message: 'Amount must be more than 0!',
          });
        }
        if (!payment.imgUrl || payment.imgUrl.length <= 0) {
          ctx.addIssue({
            code: 'custom',
            path: [`payment.${index}.imgUrl`],
            message: "Atleast one Image requried !",
          });
        }
      });
    }
    else {
      return true
    }
  });

export type RegisterUserAdminFormValues = z.infer<typeof registerUserAdminSchema>;

export const documentFormSchema = z.object({
  invoiceId: z.string().trim().min(1, { message: 'Please Insert the Invioce Id!' }),
  issuesDateTime: z.string().datetime({ message: 'Please select a DateTime' }),
  invoiceType: z.string().trim().min(1, "Please select one Invoice Type"),

  invoiceDocRef: z.string().trim().min(1, { message: 'Please enter the Invoice Doc Reference!' }).nullish(),
  additionalInvoiceDocRef: z.string().trim().min(1, { message: 'Please enter the Additional Invoice Doc Reference!' }).nullish(),

  currencyCode: z.string().trim().min(1, { message: "Please Insert the currency code" }),
  exchangeRate: z.string().trim().min(1, { message: 'Please select the Exchange Rate!' }),

  totalTaxAmount: z.coerce.number().optional(),
  totalNetAmount: z.coerce.number().optional(),

  invoiceDiscountValue: z.coerce.number().optional(),
  invoiceDiscountDescriotion: z.string().trim().optional(),
  invoiceFeeChargeValue: z.coerce.number().optional(),
  invoiceFeeChargeDescription: z.string().trim().optional(),

  totalExcludingTax: z.coerce.number().optional(),
  totalIncludingTax: z.coerce.number().optional(),
  totalRoundingAmount: z.coerce.number().optional(),
  totalPayableAmount: z.coerce.number().optional(),

  items: z.array(
    z.object({
      itemId: z.string().trim().min(1, { message: 'Please enter the Item ID !' }),
      classificationCode: z.string().trim().min(1, { message: 'Please enter the Classification Code !' }),
      description: z.string().trim().optional(),

      itemPrice: z.coerce.number().gt(0, { message: 'The Item Price must greater  than 0 !' }),
      quantity: z.coerce.number().gt(0, { message: 'The Quantity must greater than 0 !' }),

      discountRate: z.coerce.number().gte(0, { message: 'The Discount Rate must greater than 0 !' }).lte(100, { message: 'The Discount Rate percentage cannot more than 100' }),
      discountAmount: z.coerce.number().gte(0, { message: 'Must greater than 0' }).optional(),
      discountDescription: z.string().trim().optional(),

      chargeRate: z.coerce.number().gte(0, { message: 'The Charge Rate must greater than 0 !' }).lte(100, { message: 'The Charge Rate percentage cannot more than 100' }),
      chargeAmount: z.coerce.number().gte(0, { message: 'Must greater than 0' }).optional(),
      chargeDescription: z.string().trim().optional(),

      taxableAmount: z.coerce.number().optional(),
      netTaxableAmount: z.coerce.number().optional(),

      rateType: z.string().trim().optional(),

      rate: z.array(
        z.object({
          rateType: z.string().trim().optional(),

          taxType: z.string().trim().min(1, { message: 'Please select one Tax type !' }).nullish(),
          taxPercentage: z.coerce.number().gt(0, { message: 'The Percentage cannot lesser than 0!' }).nullish(),
          noOfUnit: z.coerce.number().gt(0, { message: 'The no of Unit must greater than 0' }).nullish(),
          rateUnit: z.coerce.number().gt(0, { message: 'The rate Unit must greater than 0' }).nullish(),
          totalTaxPerType: z.coerce.number().optional()

        })
      ).optional().superRefine((items, ctx) => {
        const uniqueValues = new Map<string, number>();

        items?.forEach((item, idx) => {
          if (!item.taxType) return; // skip if taxType is null or undefined

          const firstAppearanceIndex = uniqueValues.get(item.taxType);
          if (firstAppearanceIndex !== undefined) {
            // Add error message to both duplicate occurrences
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Tax type must be unique',
              path: [idx, 'taxType'],  // Path to the current item’s taxType
            });
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Tax type must be unique',
              path: [firstAppearanceIndex, 'taxType'], // Path to the first occurrence’s taxType
            });
          } else {
            uniqueValues.set(item.taxType, idx);
          }
        });
      }),

      taxTypeNotApplicable: z.string().trim().optional(),
      taxNotApplicable: z.coerce.number().optional(),
      totalTaxPerTypeNotApplicable: z.coerce.number().optional(),

      taxTypeExempted: z.string().trim().optional(),
      amountExempted: z.coerce.number().gte(0, { message: 'The Amount Exempted cannot lesser than 0 !' }),
      amountOfTaxExempted: z.coerce.number().optional(),
      detailOfTaxExemption: z.string().trim().optional(),

      subTotal: z.coerce.number().optional(),
      totalDiscount: z.coerce.number().optional(),
      totalCharge: z.coerce.number().optional(),
      totalTaxAmount: z.coerce.number().optional(),
    })
  ).min(1, { message: "The array must contain at least one item" }),

  supplierIndustryClassCode: z.string().trim().min(1, { message: 'Please enter the Industry Classification Code !' }),
  supplierIndustryName: z.string().trim().optional(),
  supplierTaxIndentificationNumber: z.string().trim().optional(),
  supplierBusinessRegNumber: z.string().trim().optional(),
  sstRegNumber: z.string().trim().optional(),
  tourismTaxRegistrationNum: z.string().trim().optional(),

  supplierLine: z.string().trim().optional(),
  supplierZipCode: z.string().trim().optional(),
  supplierCity: z.string().trim().optional(),
  supplierState: z.string().trim().optional(),
  supplierCountry: z.string().trim().optional(),

  supplierContactPrefix: z.string().trim().optional(),
  supplierContact: z.string().trim().optional(),
  supplierEmail: z.coerce.string().email().trim(),

  buyerRegisterName: z.string().trim().min(1, { message: 'Please enter the Registration Name !' }),
  buyerSSTRegisterNumber: z.string().trim().min(1, { message: 'Please enter the SST Registration Number !' }),

  buyerIdType: z.string().min(1, { message: "Please select one ID Type!" }),

  buyerRegistration_Identification_PassportNumber: z.string().optional(),
  // .min(1, { message: 'Please enter the Registration/Identification/Passport Number !' }),
  buyerTaxIdentificationNumber: z.string().optional(),
  // .min(1, { message: 'Please enter the Tax Identification Number !' }),

  buyerLine: z.string().trim().optional(),
  buyerZipCode: z.string().trim().optional(),
  buyerCity: z.string().trim().optional(),
  buyerState: z.string().trim().optional(),
  buyerCountry: z.string().trim().optional(),

  buyerContactPrefix: z.string().trim().optional(),
  buyerContact: z.string().trim().min(1, { message: 'Please enter the contact number!' }),
  buyerEmail: z.string().email().trim().optional(),

  deliveryName: z.string().trim().optional(),
  deliveryIdType: z.string().trim().optional(),
  deliveryRegistration_Identification_PassportNumber: z.string().trim().optional(),
  deliveryShippingRecipientTin: z.string().trim().optional(),

  deliveryLine: z.string().trim().optional(),
  deliveryZipCode: z.string().trim().optional(),
  deliveryCity: z.string().trim().optional(),
  deliveryState: z.string().trim().optional(),
  deliveryCountry: z.string().trim().optional(),

  deliveryReferenceNumber: z.string().trim().optional(),
  deliveryRefNumIncoterm: z.string().trim().optional(),
  deliveryFreeTradeAgreement: z.string().trim().optional(),
  deliveryAuth_No_for_Cert_Export: z.string().trim().optional(),
  deliveryAuth_No_Incoterm: z.string().trim().optional(),
  deliveryDetailofOtherCharges: z.string().trim().optional(),
  deliveryDetailofOtherChargesDescirption: z.string().trim().optional(),

  invoicePeriodStartDate: z.string().date().optional(),
  invoicePeriodEndDate: z.string().date().optional(),
  invoicePeriodFrequencyofBilling: z.string().trim().optional(),

  paymentType: z.string().optional(),
  supplierbankAccountNumber: z.string().trim().optional(),
  paymentTerm: z.string().trim().optional(),
  prepaidAmount: z.coerce.number().optional(),
  issuedDate: z.string().date().optional(),
  prepaymentReferenceNumber: z.string().trim().optional(),
  billreferenceNumber: z.string().trim().optional(),

}).refine((data) => {
  if (data.invoiceType === 'invoice' || data.invoiceType === 'selfBilledInvoice') {
    return true;
  }
  return !!data.invoiceDocRef?.trim();
}, {
  message: 'Please enter the Invoice Doc Reference!',
  path: ['invoiceDocRef'],
}).refine((data) => {
  if (data.invoiceType === 'invoice' || data.invoiceType === 'selfBilledInvoice') {
    return true;
  }
  return !!data.additionalInvoiceDocRef?.trim();
}, {
  message: 'Please enter the Additional Invoice Doc Reference!',
  path: ['additionalInvoiceDocRef'],
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;

export const updatePasswordFormSchema = z.object({
  currentPassword: z.string().trim().min(1, { message: "Please enter the current Password !" }),
  newPassword: z.string().trim().min(1, { message: 'Please enter the New Passwrod !' }),
  confirmPassword: z.string().trim().min(1, { message: "Please enter the Confirm Password !" }),

}).refine((data) => {
  return data.newPassword === data.confirmPassword;
}, {
  path: ["confirmPassword"],
  message: "New Password and Confirm Password didn't match!",
})

export type UpdateFormValues = z.infer<typeof updatePasswordFormSchema>;








