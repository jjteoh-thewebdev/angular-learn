import { AppProduct } from './app-product';

export class AppCartItem{
    constructor(public product: AppProduct, public quantity: number){}

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}