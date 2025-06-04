import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';
import { tr } from 'date-fns/locale';

// import { useTranslations } from 'next-intl';
// const t = useTranslations();

export type Merchant = {
  id: number;
  username: string;
  role: string;
  companyName: string;
  email: string;
  regNo: string;
  tinNo: string;
  status: string;
  address: string;

};

export type MerchantContent = {
  merchantId: number,
  companyName: string,
  registrationNo: string,
  businessTinNo: string,
  sstRegNo: string,
  tourRegNo: string,
  address: string,
  city: string,
  postcode: string,
  stateId: string,
  country: string,
  joinDate: string,
  contactPrefix: string,
  contact: string,
  status: string,
  email: string,
  loginId: string
}

export type MerchantInfo = {
  address: string;
  businessTinNo: string;
  city: string;
  companyName: string;
  contact: string;
  contactPrefix: string;
  country: string;
  email: string;
  joinDate: string;
  merchantId: number;
  postcode: string;
  registrationNo: string;
  stateId: string;
  sstRegNo: string;
  tourRegNo: string;
}

export type SubscriptionInfo = {
  mupId: number,
  currentPackageId: number;
  packageList: packageList[];
  roleQuantity: number;
}

export type packageList = {
  PackageName: string;
  PackageIdentifier: number;
  Descriptions: [];
  MainMenu: [];
}

export type CountryList = {
  countryName: string;
  countryCode: string;
  contactPrefix: string;
  stateList: []
}

export type StateList = {
  stateName: string;
  stateCode: string;

}

export type permissionList = {
  Function: Function[],
  Route: string,
  selected: boolean
}

export type Function = {
  FunctionName: string,
  selected: boolean
  subFunctions: subFunction[]
  value: string
}

export type subFunction = {
  FunctionName: string,
  selected: boolean,
  value: string
}

export type Users = {
  content: contents[]
  page: number,
  size: number,
  totalElements: number,
  totalPages: number
}

export type contents = {
  muId: number,
  username: string,
  role: string,
  status: string,
  merchantName: string
}

export type Role = {
  mupId: number;
  role: string;
  currentPackageId: number;
  merchantName: string;
  roleQuantity: number;
  lastModify: string;
  // user: User[],
  // accessControl: AccessControl
};

export type RoleInfo = {
  mupId: number;
  role: string;
  currentPackageId: number;
  merchantName: string;
  roleQuantity: number;
  lastModify: string;
  merchantUserList: merchantUserList
  permissionList: permissionList[]
}

export type merchantUserList = {
  content: content[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;

}

export type content = {
  muId: number;
  username: string
  role: string;
  status: string;
  merchantName: string;

}

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
  email: string;
  merchant: string;
};


export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'TAG_DASHBOARD',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    permission: ['dashboard.read', '*']
  },
  {
    title: 'TAG_USER',
    href: '/dashboard/user',
    icon: 'profile',
    label: 'User',
    permission: ['userList.read', 'roleList.read', 'merchantList.su.read', 'roleList.su.read', 'merchantCreate.su.create', '*'],
    children: [
      {
        title: 'TAG_CREATE_MERCHANT',
        href: '/dashboard/user/createMerchant',
        // icon: 'profile',
        // label: 'profile',
        permission: ['merchantCreate.su.create', '*']
      },
      {
        title: 'TAG_USER_LISTING',
        href: '/dashboard/user/userListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['userList.read', 'userList.create', 'userList.updateStatus', 'userList.update', 'userList.delete', 'userList.su.read', '*'],
      },
      {
        title: 'TAG_MERCHANT_LISTING',
        href: '/dashboard/user/merchantListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['merchantList.read', 'merchantList.update', 'merchantList.su.read', 'merchantList.su.update', '*'],
      },
      {
        title: 'TAG_ROLE_LISTING',
        href: '/dashboard/user/roleListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['roleList.read', 'roleList.create', 'roleList.update', 'roleList.su.read', 'roleList.su.create', '*'],
      }
    ]
  },
  {
    title: "TAG_DOCUMENT",
    href: '/dashboard/document',
    icon: "document",
    label: "Document",
    permission: ['docCreate.create', 'docCreate.createMyFav', '*'],
    children: [
      {
        title: "TAG_CREATE_DOCUMENT",
        href: "/dashboard/document/createDocument",
        permission: ['docCreate.create', 'docCreate.createMyFav', '*']
      }
    ]
  },
  {
    title: "TAG_SUBSCRIPTION_LIST",
    href: '/dashboard/subscriptionListing',
    icon: "subscription",
    label: "Subscription List",
    permission: ["subscriptionList.read", '*'],
  },
  {
    title: "TAG_EWALLET_LIST",
    href: '/dashboard/eWalletListing',
    icon: "ewallet",
    label: "Ewallet List",
    permission: ["ewallet.read", '*'],
  },
];
