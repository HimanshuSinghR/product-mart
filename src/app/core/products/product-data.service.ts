import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable, delay } from 'rxjs';

@Injectable(
  {
    providedIn:'root'
  }
)
export class ProductDataService {

  constructor(private $http: HttpClient,) { }

  getAllProducts():Observable<Product>{
    return this.$http.get('products.json').pipe(delay(2000)) as Observable<Product>;
  }
}
