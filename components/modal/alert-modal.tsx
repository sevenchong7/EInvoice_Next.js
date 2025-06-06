'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { title } from 'process';
import { useTranslations } from 'next-intl';
import { ConfirmButton } from '../ui/confirmButton';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: any;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description
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
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-between space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          {t('TAG_CANCEL')}
        </Button>
        <ConfirmButton disabled={loading} variant="destructive" onClick={onConfirm}>
          {t('TAG_CONFIRM')}
        </ConfirmButton>
      </div>
    </Modal>
  );
};
