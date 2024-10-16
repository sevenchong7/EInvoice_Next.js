"use client";
import useHasAccess from "@/hooks/useHasAccess";
import React, { useEffect } from "react";

const PermissionCheck = ({
    permission,
    children,
    onPermissionGranted
}: {
    permission: string;
    children?: React.ReactNode;
    onPermissionGranted?: () => void;
}) => {
    const hasAccess = useHasAccess(permission);

    useEffect(() => {
        if (hasAccess && onPermissionGranted) {
            onPermissionGranted();
        }
    }, [hasAccess, onPermissionGranted]);

    if (!hasAccess) {
        return null;
    }

    return <>{children}</>;
};

export default PermissionCheck;
