import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppProduct } from 'src/app/models/app-product';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartKey = "cartId";

  constructor(private db: AngularFireDatabase) { }

  create(){
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async getCart(){
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem(this.cartKey);
    if(!cartId){
      // create new cart if not exist
      let result = await this.create();
      localStorage.setItem(this.cartKey, result.key);
      cartId = result.key;
    }

    return cartId;
  }

  async addToCart(product: AppProduct){
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: AppProduct){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: AppProduct, change: number){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);

    // used map to solve infinite update issue due to subscribe to same object
    item$.snapshotChanges().pipe(
      take(1),
      map(item => {
        return Object.assign({}, {key: item.key}, item.payload.val())
      })
    ).subscribe((item: any) => {
      //console.log(item);
      item$.update({ product: product, quantity: (item.quantity || 0) + change });
    });
  }
}
