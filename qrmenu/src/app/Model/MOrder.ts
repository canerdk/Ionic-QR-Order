export interface MOrder {
    Oid: string;
    OrderMain: string;
    Table?: any;
    Name: string;
    Detail: string;
    Price: string;
    Currency: string;
    Quantity: number;
    TotalPrice: number;
    OptimisticLockField: number;
    GCRecord?: any;
    PaymentMethod: string;
    Date?: any;
    Paid?: any;
}