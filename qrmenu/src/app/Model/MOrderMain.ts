export interface MOrderMain {
    Oid: string;
    Customers: string;
    Orders?: any;
    Table: string;
    Date: any;
    OptimisticLockField: number;
    GCRecord?: any;
    Name: string;
    Confirmation: boolean;
    PaymentState: number;
    PrepareState: number;
    Queue: number;
    Complete: boolean;
}
