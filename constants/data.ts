import { Icons } from '@/components/icons';
import { NavItem, SidebarNavItem } from '@/types';

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
  email: string;
};
export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active',
    email: 'test@gmail.com'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active',
    email: 'test@gmail.com'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive',
    email: 'test@gmail.com'

  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active',
    email: 'test@gmail.com'

  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active',
    email: 'test@gmail.com'

  }
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
  companyName: 'Systech Berhad',
  regNo: '202401000001',
  email: 'syscatech2008@gmail.com',
  businessTinNo: 'IG115002000',
  subscription: 'Standard'
}


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
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
    label: 'Dashboard',
    permission: ["dashboard.access", "dashboard.all"]
  },
  // {
  //   title: 'User',
  //   href: '/dashboard/user',
  //   icon: 'user',
  //   label: 'user',
  //   permission: ["user.access", "user.all"]
  // },
  {
    title: 'Employee',
    href: '/dashboard/employee',
    icon: 'employee',
    label: 'employee',
    permission: ["employee.access", "employee.all"]
  },
  {
    title: 'User',
    href: '/dashboard/user',
    icon: 'profile',
    label: 'User',
    permission: ["profile.access", "profile.all"],
    children: [
      {
        title: 'Create Merchant',
        href: '/dashboard/user/createMerchant',
        // icon: 'profile',
        // label: 'profile',
        permission: ["user.access", "createMerchant.all"]
      },
      {
        title: 'User Listing',
        href: '/dashboard/user/userListing',
        // icon: 'profile',
        // label: 'profile',
        permission: ["user.access", "user.all"],
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
    title: "Document",
    href: '/dashboard/document',
    icon: "document",
    label: "Document",
    permission: ["document.access", "document.all"],
    children: [
      {
        title: "Create Document",
        href: "/dashboard/document/createDocument",
        permission: ["document.access", "document.all"]
      }
    ]
  },
  {
    title: 'Kanban',
    href: '/dashboard/kanban',
    icon: 'kanban',
    label: 'kanban',
    permission: ["kanban.access", "kanban.all"]
  }
];
