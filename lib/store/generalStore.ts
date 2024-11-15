import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GetCountryParam, GetPaymentMethodParam, GetSubscriptionDurationParam } from '../interface/generalInterface';

export type State = {
    countryList: GetCountryParam[];
    paymentMethodList: GetPaymentMethodParam;
    subscriptionDurationList: GetSubscriptionDurationParam[];
};

export type Actions = {
    setCountryList: (country: GetCountryParam[]) => void;
    setPaymentMethodList: (paymentMethod: GetPaymentMethodParam) => void;
    setSubscriptionDurationList: (SubscriptionDuration: GetSubscriptionDurationParam[]) => void
};

export const useGeneralTaskStore = create<State & Actions>()(
    persist(
        (set) => ({
            countryList: [],
            paymentMethodList: {
                content: [],
                page: 0,
                size: 0,
                totalElements: 0,
                totalPages: 0
            },
            subscriptionDurationList: [],
            setCountryList: (newCountryList: GetCountryParam[]) => set({ countryList: newCountryList }),
            setPaymentMethodList: (newPaymentMethodList: GetPaymentMethodParam) => set({ paymentMethodList: newPaymentMethodList }),
            setSubscriptionDurationList: (newSubscriptionDurationList: GetSubscriptionDurationParam[]) => set({ subscriptionDurationList: newSubscriptionDurationList })
        }),
        { name: 'general-task-store', skipHydration: true }
        // skipHydration: true 
    )
);
