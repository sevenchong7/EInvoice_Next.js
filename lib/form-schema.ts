import * as z from 'zod';

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'Product Name must be at least 3 characters' }),
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
  email: z.string().email({ message: "Please Enter a valid Email Address ! " }),
  companyName: z.string().min(3, { message: "Company Name must be at least 3 characters !" }),
  registerNo: z.string().min(3, { message: "Register No must be at least 3 characters !" }),
  businessTinNo: z.string().min(3, { message: "Business Tin No must be at least 3 characters !" }),
  password: z.string().min(3, { message: "Password must be enter !" }),
  confirmPw: z.string().min(3, { message: "Confirm Password must be enter !" }),
  streetAddress: z.string().min(3, { message: "Address must at least 3 characters !" }),
  aptSuite: z.string().optional(),
  zipCode: z.string().min(5, { message: "Zip Code must be 5 characters !" }).max(5, { message: 'Zip code must be 5 character !' }),
  townCity: z.string().min(3, { message: "Town must at least 3 characters !" }),
  state: z.string().min(3, { message: "State must at least 3 characters !" }),
  country: z.string().min(1, { message: "Please Select a Country !" }),
  contactNo: z.string().optional(),
  package: z.string().min(1, { message: 'Please select one Package!' }),
  paymentMethod: z.string().min(1, { message: 'Please select a payment method!' })
}).refine((data) => {
  console.log('Refine Triggered');
  return data.password === data.confirmPw;
}, {
  path: ["confirmPw"],
  message: "Password and Confirm Password didn't match!",
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
  console.log('Refine Triggered');
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

export const registerUserAdminSchema = z.object({

  email: z.string().email({ message: "Please Enter a valid Email Address ! " }),
  companyName: z.string().min(3, { message: "Company Name must be at least 3 characters !" }),
  registerNo: z.string().min(3, { message: "Register No must be at least 3 characters !" }),
  businessTinNo: z.string().min(3, { message: "Business Tin No must be at least 3 characters !" }),
  password: z.string().min(3, { message: "Password must be enter !" }),
  confirmPw: z.string().min(3, { message: "Confirm Password must be enter !" }),
  streetAddress: z.string().min(3, { message: "Address must at least 3 characters !" }),
  aptSuite: z.string().optional(),
  zipCode: z.string().min(5, { message: "Zip Code must be 5 characters !" }).max(5, { message: 'Zip code must be 5 character !' }),
  townCity: z.string().min(3, { message: "Town must at least 3 characters !" }),
  state: z.string().min(3, { message: "State must at least 3 characters !" }),
  country: z.string().min(1, { message: "Please Select a Country !" }),
  contactNo: z.string().optional(),
  package: z.string().min(1, { message: 'Please select one Package!' }),
  payment: z.array(
    z.object({
      paymentMethod: z.string().min(1, { message: 'Please Select one Payment Method! ' }),
      paymentAmount: z.coerce.number().gt(0, { message: 'Amount must more than 0!' }),
      referenceNo: z.string(),
      imgUrl: z
        .array(ImgSchema)
        .max(IMG_MAX_LIMIT, { message: 'You can only add up to 3 images' }).optional()
      // .min(1, { message: 'At least one image must be added.' }),
    })
  ),
}).refine((data) => {
  console.log('Refine Triggered');
  return data.password === data.confirmPw;
}, {
  path: ["confirmPw"],
  message: "Password and Confirm Password didn't match!",
});

export type RegisterUserAdminFormValues = z.infer<typeof registerUserAdminSchema>;

export const documentFormSchema = z.object({
  invoiceId: z.string().trim().min(1, { message: 'Please Insert the Invioce Id!' }),
  issuesDateTime: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Start date should be in the format DD-MM-YYYY'
    }),
  currencyCode: z.string().trim().min(1, { message: "Please Insert the currency code" }),
  invoiceType: z.string().trim().min(1, "Please select one Invoice Type"),
  versionId: z.string().trim().min(1, "Please insert the Version Id"),
  startdate: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Start date should be in the format DD-MM-YYYY'
    }),
  enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'End date should be in the format DD-MM-YYYY'
  }),
  description: z.string().trim().optional(),
  invoiceDocRef: z.string().trim().min(1, "Please insert the Invoice Document Reference!"),
  additionalInvoiceDocRef: z.string().trim().min(1, "Please insert the Additional Invoice Document Reference!"),
  supplierId: z.string().trim().min(1, "Please enter the Supplier ID !"),
  agencyName: z.string().trim().min(1, { message: "Please enter the Agency Name !" }),
  supplierIndustryClassCode: z.string().trim().min(1, { message: 'Please enter the Industry Classification Code !' }),
  supplierIndustryName: z.string().trim().min(1, { message: 'Please enter the Industry Name !' }),
  supplierRegisterName: z.string().trim().min(1, { message: 'Please enter the Register Name' }),
  supplierPartyInformation: z.array(
    z.object({
      supplierIdentificationId: z.string().trim().optional(),
      supplierSchemeId: z.string().trim().optional()
      // .min(1, { message: "Please enter the Identification ID !" }).optional(),
      // .min(1, { message: "Please enter the Scheme ID !" })
    })
  ),
  supplierAddress: z.array(
    z.object({
      supplierLine: z.string().trim().min(1, { message: "Please enter the Line !" })
    })
  ),
  supplierZipCode: z.string().trim().min(5, { message: "The minimum length for Zip code is 5 !" }).max(5, { message: 'The maximum length for Zip code is 5 !' }),
  supplierCity: z.string().trim().min(1, { message: 'Please enter the city !' }),
  supplierState: z.string().trim().min(1, { message: 'Please enter the State !' }),
  supplierCountry: z.string().trim().min(1, { message: 'Please enter the country !' }),
  supplierContact: z.string().trim().optional(),
  supplierEmail: z.string().trim().optional(),
  buyerIndustryClassCode: z.string().trim().min(1, { message: 'Please enter the Industry Classification Code !' }),
  buyerIndustryName: z.string().trim().min(1, { message: 'Please enter the Industry Name !' }),
  buyerRegisterName: z.string().trim().min(1, { message: 'Please enter the Registration Name !' }),
  buyerPartyInformation: z.array(
    z.object({
      buyerIdentificationId: z.string().trim().optional(),
      buyerSchemeId: z.string().trim().optional()
    })
  ),
  buyerAddress: z.array(
    z.object({
      buyerLine: z.string().trim().min(1, { message: 'Please enter the Line !' })
    })
  ),
  buyerZipCode: z.string().trim().min(5, { message: "The minimum length for Zip code is 5 !" }).max(5, { message: 'The maximum length for Zip code is 5 !' }),
  buyerCity: z.string().trim().min(1, { message: 'Please enter the city !' }),
  buyerState: z.string().trim().min(1, { message: 'Please enter the State !' }),
  buyerCountry: z.string().trim().min(1, { message: 'Please enter the country !' }),
  buyerContact: z.string().trim().optional(),
  buyerEmail: z.string().trim().optional(),
  deliveryRegistrationName: z.string().trim().min(1, { message: 'Please enter the Registration Name !' }),
  deliverypartyInformation: z.array(
    z.object({
      deliveryIdentificationId: z.string().trim().optional(),
      deliverySchemeId: z.string().trim().optional()
    })
  ),
  deliveryAddress: z.array(
    z.object({
      deliveryLine: z.string().trim().optional()
    })
  ),
  deliveryZipCode: z.string().trim().min(5, { message: "The minimum length for Zip code is 5 !" }).max(5, { message: 'The maximum length for Zip code is 5 !' }),
  deliveryCity: z.string().trim().min(1, { message: 'Please enter the city !' }),
  deliveryState: z.string().trim().min(1, { message: 'Please enter the State!' }),
  deliveryCountry: z.string().trim().min(1, { message: 'Please enter the country!' }),
  deliveryShipmentId: z.string().trim().min(1, { message: 'Please enter the shipment Id!' }),
  deliveryAllowanceChargeReason: z.string().trim().optional(),
  deliveryCurrency: z.string().trim().optional(),
  deliveryAmount: z.coerce.number().optional(),
  items: z.array(
    z.object({
      itemId: z.string().trim().min(1, { message: 'Please enter the Item ID !' }),
      itemPrice: z.coerce.number().gt(0, { message: 'The Item Price must greater  than 0 !' }),
      quantity: z.coerce.number().gt(0, { message: 'The Quantity must greater than 0 !' }),
      unitCode: z.string().trim().min(1, { message: 'Please enter the Unit Code !' }),
      classificationCode: z.string().trim().min(1, { message: 'Please enter the Classification Code !' }),
      classificationType: z.string().trim().min(1, { message: 'Please enter a Classification Type !' }),
      description: z.string().trim().optional(),
      madeIn: z.string().trim().optional(),
      allowanceCharge: z.array(
        z.object({
          discountCharge: z.string().trim().min(1, { message: 'Please select one either Discount/Charge !' }),
          allowanceChargeReason: z.string().trim().optional(),
          chargeDiscountPercent: z.coerce.number().gt(0, { message: 'The Percentage cannot lesser than 0 !' }),
          amount: z.coerce.number().optional(),
        })
      ),
      taxableAmount: z.coerce.number(),
      taxSubtotal: z.array(
        z.object({
          taxType: z.string().trim().min(1, { message: 'Please select one Tax type !' }),
          taxPercentage: z.coerce.number().gt(0, { message: 'The Percentage cannot lesser than 0!' }),
          taxAmount: z.coerce.number().optional()
        })
      ),
      subTotal: z.coerce.number().optional(),
      totalDiscount: z.coerce.number().optional(),
      totalCharge: z.coerce.number().optional(),
      totalTaxAmount: z.coerce.number().optional(),

    })
  ),
  paymentInformation: z.array(
    z.object({
      paymentType: z.string().trim().optional(),
      paymentFinancialAcc: z.string().trim().optional(),
      paymentTerms: z.string().trim().optional()
    })
  ),
  paymentInvoiceId: z.string().trim().optional(),
  paymentAmount: z.string().trim().optional(),
  paymentIssuedDateTime: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Start date should be in the format DD-MM-YYYY'
    }).optional(),
})

export type DocumentFormValues = z.infer<typeof documentFormSchema>;



