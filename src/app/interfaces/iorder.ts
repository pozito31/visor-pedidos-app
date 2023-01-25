import { Product } from './../models/product';
export interface IOrder {
    id: string;
    date: string;
    numOrder: number;
    priceOrder: number;
    finished: boolean;
    products: Product[]
}
