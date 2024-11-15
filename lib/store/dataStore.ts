import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetCountryParam, GetPaymentMethodParam, GetSubscriptionDurationParam } from '../interface/generalInterface';

export type State = {
    packageId: number,
    packageSubStatus: boolean,
    language: string,
};

export type Actions = {
    setPackage: (packageId: number) => void;
    setPackageSubStatus: (packageSubStatus: boolean) => void;
    setLocal: (language: string) => void;
};

export const useDataTaskStore = create<State & Actions>()(
    persist(
        (set) => ({
            packageId: 0,
            packageSubStatus: false,
            language: 'en',

            setPackage: (newPackageId: number) => set({ packageId: newPackageId }),
            setPackageSubStatus: (newPackageSubStatus: boolean) => set({ packageSubStatus: newPackageSubStatus }),
            setLocal: (newLanguage: string) => set({ language: newLanguage })
        }),
        { name: 'data-task-store' }
        // skipHydration: true 
    )
);
