import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductDataService } from '../../core/products/product-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Observable<any> | undefined;
  constructor(private productDataService: ProductDataService){
    
  }
  ngOnInit() {
    this.products = this.productDataService.getAllProducts();
  }

}
