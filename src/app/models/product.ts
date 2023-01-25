import { IProduct } from './../interfaces/iproduct';
import { set, get, forEach } from 'lodash-es'

export class Product implements IProduct {

     constructor(data) {
        set(this, 'data', data);
    }

    get price(): number {
        return get(this, 'data.priceFinal');
    }

    get extras(): any[] {
        return get(this, 'data.extras');
    }

    get name(): string {
        return get(this, 'data.name');
    }

    get img(): string {
        return get(this, 'data.img');
    }

    get quantity(): number {
        return get(this, 'data.quantity');
    }

    set quantity(value: number) {
        set(this, 'data.quantity', value);
    }

}
