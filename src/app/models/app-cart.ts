import { AppCartItem } from './app-cart-item';


export class AppCart{
    constructor(public items:AppCartItem[]){}

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.items)
          count += this.items[productId].quantity;

        return count;
    }
}