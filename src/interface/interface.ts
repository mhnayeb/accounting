export interface Person{
    name: string;
    count: number;
    paid?: string;
    debt?: string;
    paidList?: PaidList[];
}

export interface PaidList{
    description?: string;
    price?: number
    date?: string;
    time?: string;
}