import { LocationType, PaymentDetailType } from ".";

export type UserType = {
    businessName: string;
    businessLocation: LocationType;
    ABN: number;
}

export interface SellerType extends UserType {
    sellerId: string;
    sellerPaymentDetails: PaymentDetailType;
}

export type BuyerType = UserType;


export type LoginPayload = {
    email: string;
    password: string;
};