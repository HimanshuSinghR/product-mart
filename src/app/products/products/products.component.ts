import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductDataService } from '@core/index';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '@core/products/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  dataSource = new MatTableDataSource<Product>();
  loading = true;
  displayedColumns = ['imgUrl','name','price','addToCart'];
  subscriptions = [];
  products: Product[] = [];
  constructor(private productDataService: ProductDataService){
    
  }
  @ViewChild(MatSort) sort : MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  ngOnInit() {
     
     this.subscriptions.push(this.productDataService.getAllProducts().subscribe(products=>this.onDataLoad(products)));
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s=>s.unsubscribe());
  }

  onDataLoad(products){
    this.loading=false;
    this.dataSource.data = products;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event) {
    var filterValue = (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    
  }

}
