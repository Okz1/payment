import { Injectable } from '@angular/core';
import { ProductInterface } from '../../../interface/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

const MOCK_PRODUCT: ProductInterface = {
  name: 'ABCD',
  date: '1613567140176',
  amount: '1234.03'
};

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  private currentProduct: BehaviorSubject<ProductInterface> = new BehaviorSubject(MOCK_PRODUCT);
  private currentProduct$ = this.currentProduct.asObservable();

   get getProduct(): Observable<ProductInterface> {
    return this.currentProduct$;
  }
}
