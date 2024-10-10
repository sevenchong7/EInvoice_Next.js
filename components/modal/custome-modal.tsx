'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { title } from 'process';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface CustomeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    loading: boolean;
    title?: any;
    description?: any;
    content?: any;
    titleClassName?: any
}

export const CustomeModal: React.FC<CustomeModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    title,
    description,
    content,
    titleClassName
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Modal
            title={title}
            description={description}
            isOpen={isOpen}
            onClose={onClose}
            titleClassName={titleClassName}
        >
            <div className='text-center w-full whitespace-pre-wrap'>{content}</div>
            {/* <div className=" w-full items-center space-x-2 pt-6">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={loading} className='bg-blue-800 hover:bg-blue-700' onClick={onConfirm}>
                    Continue
                </Button>
            </div> */}
        </Modal>
    );
};

interface ModalProps {
    title?: any;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    titleClassName?: any;
}

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    children,
    titleClassName
}) => {
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onChange} >
            <DialogContent className='md:min-w-[600px]' aria-describedby={undefined}>
                <DialogHeader className={titleClassName}>
                    <DialogTitle className={titleClassName}>{title}</DialogTitle>
                    <DialogDescription className='text-center w-full'>{description}</DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
};
