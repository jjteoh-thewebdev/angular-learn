import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AppProduct } from 'src/app/models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('products').push(product);
  }

  getAll(){
    return this.db.list('products').snapshotChanges().pipe(
      map(prods => {
        let data = [];
        prods.forEach(product => {
          data.push(Object.assign({}, {key: product.key}, product.payload.val()));
        });
        
        return data;
      }));
  }

  get(productId){
    return this.db.object('/products/' + productId)
      .valueChanges()
      .pipe(
        map((p: AppProduct) => {
          p.key = productId;
          return p;
        }));
  }

  update(productId, product){
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }
}
