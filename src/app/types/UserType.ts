import { LocationType, PaymentDetailType } from ".";

export type UserType = {
    id?: string;
    businessName: string;
    businessLocation: LocationType;
    ABN: number;
}

export interface SellerType extends UserType {
    paymentDetails: PaymentDetailType;
}

export interface BuyerType extends UserType {
    paymentDetails: PaymentDetailType;
}


export type LoginPayload = {
    email: string;
    password: string;
};