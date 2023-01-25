import { Product } from 'src/app/models/product';
import { IOrder } from './../interfaces/iorder';
import { get, set, find, cloneDeep, unset, isEqual, remove, forEach } from 'lodash-es';

export class Order implements IOrder {

    constructor(data) {
        set(this, 'data', data);
    }

    get id(): string {
        return get(this, 'data.id');
    }

    set id(value: string) {
        set(this, 'data.id', value);
    }

    get date(): string {
        return get(this, 'data.date');
    }

    set date(value: string) {
        set(this, 'data.date', value);
    }

    get numOrder(): number {
        return get(this, 'data.numOrder');
    }

    set numOrder(value: number) {
        set(this, 'data.numOrder', value);
    }

    get priceOrder(): number {
        return get(this, 'data.priceOrder');
    }

    set priceOrder(value: number) {
        set(this, 'data.priceOrder', value);
    }

    get finished(): boolean {
        return get(this, 'data.finished');
    }

    set finished(value: boolean) {
        set(this, 'data.finished', value);
    }

    get products(): Product[] {
        return get(this, 'data.products');
    }

    set products(value: Product[]) {
        set(this, 'data.products', value);
    }

}
