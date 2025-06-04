"use client";

import { NavItem } from "@/types";
import { useSession } from "next-auth/react";

const useNavItems = (navItems: NavItem[]) => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return [];
    }

    if (!session) {
        return [];
    }

    const filteredList = navItems.filter(item => {
        // console.log('items = ', item)
        return item.permission?.some((p) => session?.user?.permissions.includes(p))
    });


    return filteredList;
};

export default useNavItems;