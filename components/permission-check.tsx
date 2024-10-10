"use client"
import useHasAccess from "@/hooks/useHasAccess";
import React from "react";
import { useEffect } from "react";

const PermissionCheck = ({
    permission,
    children,
    onPermissionGranted
}: {
    permission: string;
    children: React.ReactNode;
    onPermissionGranted?: () => void;
}) => {
    const hasAccess = useHasAccess(permission);

    if (!hasAccess) {
        return null;
    }

    useEffect(() => {
        if (onPermissionGranted != undefined) {
            onPermissionGranted!();
        }
    }, [])

    return <>{children}</>;
};

export default PermissionCheck;