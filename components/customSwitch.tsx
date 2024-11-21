import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function CustomSwitch({ data, checkActive, onclick, activeTitle, inactiveTitle }: { data: any, checkActive: any, onclick: any, activeTitle?: string, inactiveTitle?: string }) {

    const [textVisible, setTextVisible] = useState(true);

    useEffect(() => {
        setTextVisible(false);

        setTimeout(() => {
            setTextVisible(true);
        }, 300);
    }, [onclick])

    return <Button
        onClick={onclick}
        className={cn(
            "relative flex items-center transition-all duration-300 m-auto min-w-[110px]",
            data === checkActive ? "bg-green-600 hover:bg-green-500 justify-start" : "justify-end text-right  bg-zinc-400 hover:bg-gray-500 ",
            "rounded-full"
        )}
    >
        <div
            className={cn(
                "absolute rounded-full bg-white w-6 h-6 transition-all duration-300 dark:bg-gray-400 ",
                data === checkActive ? "translate-x-16 ease-linear" : "-translate-x-16 ease-linear"
            )}
        />
        <p
            className={cn(
                textVisible ? "opacity-100" : "opacity-0", "text-white"
            )}
        >

            {!activeTitle && !inactiveTitle ? data : data === checkActive ? activeTitle : inactiveTitle}
        </p>
    </Button>
}