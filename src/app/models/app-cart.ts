import { AppCartItem } from './app-cart-item';
import { AppProduct } from './app-product';


export class AppCart{
  items: AppCartItem[] = [];

    constructor(private itemsMap:{ [productId:string]:AppCartItem[] }){
      for(let productId in itemsMap){
        let item = this.itemsMap[productId];
        this.items.push(new AppCartItem(item['product'], item['quantity']));
      }
    }

    getQuantity(product: AppProduct){
      let item = this.itemsMap[product.key];
      return item ? item['quantity'] : 0;
    }

    get totalPrice(){
      let sum = 0;
      for(let productId in this.items){
        sum += this.items[productId].totalPrice;
      }
      return sum;
    }

    get totalItemsCount(){
        let count = 0;
        for(let productId in this.itemsMap)
          count += this.itemsMap[productId]['quantity'];

        return count;
    }
}