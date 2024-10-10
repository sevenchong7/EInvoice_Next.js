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


export const merchants: Merchant[] = [
  {
    id: 1,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'Techcasys Berhad',
    email: 'Techcasys@gmail.com',
    regNo: '202410123457',
    tinNo: 'C20830570211',
    status: 'Active',
    address: 'test',
  },
  {
    id: 2,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantA Berhad',
    email: 'MerchantA@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Active',
    address: 'test',

  },
  {
    id: 3,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantB Berhad',
    email: 'MerchantB@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Inactive',
    address: 'test',

  },
  {
    id: 4,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantC Berhad',
    email: 'MerchantC@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Pending Verification',
    address: 'test',

  },
  {
    id: 5,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantD Berhad',
    email: 'MerchantD@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Active',
    address: 'test',

  },
  {
    id: 6,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantE Berhad',
    email: 'MerchantE@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Active',
    address: 'test',

  },
  {
    id: 7,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantF Berhad',
    email: 'MerchantF@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Active',
    address: 'test',

  },
  {
    id: 8,
    username: 'Ali@gmail.com',
    role: 'Admin',
    companyName: 'MerchantG Berhad',
    email: 'MerchantG@gmail.com',
    regNo: '202410123456',
    tinNo: 'C20830570210',
    status: 'Active',
    address: 'test',

  },

]

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
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    merchant: 'MerchantA',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active',
    email: 'CS@gmail.com'
  },
  {
    id: 2,
    name: 'John Doe',
    merchant: 'MerchantA',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active',
    email: 'JD@gmail.com'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    merchant: 'MerchantB',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Pending Verification',
    email: 'AJ@gmail.com'

  },
  {
    id: 4,
    name: 'David Smith',
    merchant: 'MerchantB',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive',
    email: 'DS@gmail.com'

  },
  {
    id: 5,
    name: 'Emma Wilson',
    merchant: 'MerchantC',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active',
    email: 'EW@gmail.com'

  },
  {
    id: 6,
    name: 'James Brown',
    merchant: 'MerchantC',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active',
    email: 'JB@gmail.com'

  },
  {
    id: 7,
    name: 'Laura White',
    merchant: 'MerchantC',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active',
    email: 'LW@gmail.com'

  },
  {
    id: 8,
    name: 'Michael Lee',
    merchant: 'MerchantC',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active',
    email: 'ML@gmail.com'

  },
  {
    id: 9,
    name: 'Olivia Green',
    merchant: 'MerchantB',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active',
    email: 'OG@gmail.com'

  },
  {
    id: 10,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 11,
    name: 'Robert Taylor',
    merchant: 'MerchantA',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 12,
    name: 'Robert Taylor',
    merchant: 'MerchantA',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 13,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 14,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 15,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 16,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 17,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 18,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 19,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 20,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 21,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 22,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 23,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 24,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 25,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 26,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 27,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 28,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 29,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
  {
    id: 30,
    name: 'Robert Taylor',
    merchant: 'MerchantB',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'RT@gmail.com'

  },
];

export type Company = {
  companyName: string;
  regNo: string;
  email: string;
  businessTinNo: string;
  address?: string;
  apt_suite_building?: string
  zipCode?: string;
  state?: string;
  town_city?: string;
  country?: string;
  contactNo?: string;
  subscription?: string;
}

export const companys: Company =
{
  companyName: 'Syscatech Berhad',
  regNo: '202401000001',
  email: 'syscatech@gmail.com',
  businessTinNo: 'IG115002000',
  subscription: 'Standard'
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

// export const roles: Role[] = [
//   {
//     id: 1,
//     role: 'Admin',
//     merchant: 'MerchantA',
//     amount: 3,
//     lastUpdate: '27/08/2024',
//     user: [
//       {
//         id: 1,
//         name: 'Candice Schiner',
//         merchant: 'MerchantA',
//         company: 'Dell',
//         role: 'Frontend Developer',
//         verified: false,
//         status: 'Active',
//         email: 'CS@gmail.com'
//       },
//       {
//         id: 2,
//         name: 'John Doe',
//         merchant: 'MerchantA',
//         company: 'TechCorp',
//         role: 'Backend Developer',
//         verified: true,
//         status: 'Active',
//         email: 'JD@gmail.com'
//       },
//       {
//         id: 3,
//         name: 'Alice Johnson',
//         merchant: 'MerchantB',
//         company: 'WebTech',
//         role: 'UI Designer',
//         verified: true,
//         status: 'Pending Verification',
//         email: 'AJ@gmail.com'

//       },
//     ],
//     accessControl: {
//       dashboard: {
//         add: true,
//         edit: true,
//         view: true,

//       },
//       user: {
//         createMerchant: {
//           create: true,
//           upload: true,
//           multi: true,
//         },
//         userListing: {
//           view: true,
//           update: true,
//           delete: true,
//         }
//       }
//     }
//   },
//   {
//     id: 2,
//     role: 'Accountant',
//     merchant: 'MerchantB',
//     amount: 2,
//     lastUpdate: '26/08/2024',
//     user: [
//       {
//         id: 1,
//         name: 'Candice Schiner',
//         merchant: 'MerchantA',
//         company: 'Dell',
//         role: 'Frontend Developer',
//         verified: false,
//         status: 'Active',
//         email: 'CS@gmail.com'
//       },
//       {
//         id: 2,
//         name: 'John Doe',
//         merchant: 'MerchantA',
//         company: 'TechCorp',
//         role: 'Backend Developer',
//         verified: true,
//         status: 'Active',
//         email: 'JD@gmail.com'
//       },
//     ],
//     accessControl: {
//       dashboard: {
//         add: true,
//         edit: true,
//         view: false,

//       },
//       user: {
//         createMerchant: {
//           create: true,
//           upload: true,
//           multi: true,
//         },
//         userListing: {
//           view: true,
//           update: true,
//           delete: true,
//         }
//       }
//     }
//   },
//   {
//     id: 3,
//     role: 'Financial',
//     merchant: 'MerchantA',
//     amount: 1,
//     lastUpdate: '27/08/2024',
//     user: [
//       {
//         id: 1,
//         name: 'Alice Johnson',
//         merchant: 'MerchantB',
//         company: 'WebTech',
//         role: 'UI Designer',
//         verified: true,
//         status: 'Pending Verification',
//         email: 'AJ@gmail.com'

//       },
//     ],
//     accessControl: {
//       dashboard: {
//         add: true,
//         edit: true,
//         view: false,

//       },
//       user: {
//         createMerchant: {
//           create: true,
//           upload: true,
//           multi: true,
//         },
//         userListing: {
//           view: true,
//           update: true,
//           delete: true,
//         }
//       }
//     }
//   },
//   {
//     id: 4,
//     role: 'Developer',
//     merchant: 'MerchantC',
//     amount: 3,
//     lastUpdate: '27/08/2024',
//     user: [
//       {
//         id: 1,
//         name: 'Candice Schiner',
//         merchant: 'MerchantA',
//         company: 'Dell',
//         role: 'Frontend Developer',
//         verified: false,
//         status: 'Active',
//         email: 'CS@gmail.com'
//       },
//       {
//         id: 2,
//         name: 'John Doe',
//         merchant: 'MerchantA',
//         company: 'TechCorp',
//         role: 'Backend Developer',
//         verified: true,
//         status: 'Active',
//         email: 'JD@gmail.com'
//       },
//       {
//         id: 3,
//         name: 'Alice Johnson',
//         merchant: 'MerchantB',
//         company: 'WebTech',
//         role: 'UI Designer',
//         verified: true,
//         status: 'Pending Verification',
//         email: 'AJ@gmail.com'

//       },
//     ],
//     accessControl: {
//       dashboard: {
//         add: true,
//         edit: true,
//         view: false,

//       },
//       user: {
//         createMerchant: {
//           create: true,
//           upload: true,
//           multi: true,
//         },
//         userListing: {
//           view: true,
//           update: true,
//           delete: true,
//         }
//       }
//     }
//   }
// ]

// export type AccessControl = {
//   dashboard:
//   {
//     add: boolean,
//     edit: boolean,
//     view: boolean
//   },
//   user:
//   {
//     createMerchant:
//     {
//       create: boolean,
//       upload: boolean,
//       multi: boolean
//     }
//     userListing:
//     {
//       view: boolean,
//       update: boolean,
//       delete: boolean
//     }
//   }

// };


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
    permission: ['dashboard.read']
  },
  // {
  //   title: 'User',
  //   href: '/dashboard/user',
  //   icon: 'user',
  //   label: 'user',
  //   permission: ["user.access", "user.all"]
  // },
  // {
  //   title: 'Employee',
  //   href: '/dashboard/employee',
  //   icon: 'employee',
  //   label: 'employee',
  //   permission: ["employee.access", "employee.all"]
  // },
  {
    title: 'TAG_USER',
    href: '/dashboard/user',
    icon: 'profile',
    label: 'User',
    permission: ['userList.read', 'roleList.read', 'merchantList.su.read', 'roleList.su.read', 'merchantCreate.su.create'],
    children: [
      {
        title: 'TAG_CREATE_MERCHANT',
        href: '/dashboard/user/createMerchant',
        // icon: 'profile',
        // label: 'profile',
        permission: ['merchantCreate.su.create']
      },
      {
        title: 'TAG_USER_LISTING',
        href: '/dashboard/user/userListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['userList.read', 'userList.create', 'userList.updateStatus', 'userList.update', 'userList.delete', 'userList.su.read'],
        // children: [
        //   {
        //     title: 'Add User',
        //     href: '/dashboard/user/userListing/AddUser',
        //     // icon: 'profile',
        //     // label: 'profile',
        //     permission: ["user.access", "user.all"]
        //   },
        // ]
      },
      {
        title: 'TAG_MERCHANT_LISTING',
        href: '/dashboard/user/merchantListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['merchantList.read', 'merchantList.update', 'merchantList.su.read', 'merchantList.su.update'],
        // children: [
        //   {
        //     title: 'Add User',
        //     href: '/dashboard/user/userListing/AddUser',
        //     // icon: 'profile',
        //     // label: 'profile',
        //     permission: ["user.access", "user.all"]
        //   },
        // ]
      },
      {
        title: 'TAG_ROLE_LISTING',
        href: '/dashboard/user/roleListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ['roleList.read', 'roleList.create', 'roleList.update', 'roleList.su.read'],
        // children: [
        //   {
        //     title: 'Add User',
        //     href: '/dashboard/user/userListing/AddUser',
        //     // icon: 'profile',
        //     // label: 'profile',
        //     permission: ["user.access", "user.all"]
        //   },
        // ]
      }
    ]
  },
  {
    title: "TAG_DOCUMENT",
    href: '/dashboard/document',
    icon: "document",
    label: "Document",
    permission: ['docCreate.create', 'docCreate.createMyFav'],
    children: [
      {
        title: "TAG_CREATE_DOCUMENT",
        href: "/dashboard/document/createDocument",
        permission: ['docCreate.create', 'docCreate.createMyFav']
      }
    ]
  },
  // {
  //   title: 'Kanban',
  //   href: '/dashboard/kanban',
  //   icon: 'kanban',
  //   label: 'kanban',
  //   permission: ["kanban.access", "kanban.all"]
  // }
];
