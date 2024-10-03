'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { title } from 'process';
import { useTranslations } from 'next-intl';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
    title?: string;
    description?: any;
    content?: any
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
    title,
    description,
    content
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const t = useTranslations()

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
            content={content}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className='text-center w-full whitespace-pre-wrap'>{content}</div>
            <div className="flex w-full items-center justify-between space-x-2 pt-6">
                <Button disabled={loading} variant="outline" onClick={onClose}>
                    {t('TAG_CANCEL')}
                </Button>
                <Button disabled={loading} className='bg-blue-800 hover:bg-blue-700' onClick={onConfirm}>
                    {t('TAG_CONFIRM')}
                </Button>
            </div>
        </Modal>
    );
};
