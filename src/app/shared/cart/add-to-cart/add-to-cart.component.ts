import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartItem } from '@core/cart/cart-item';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';
import { CartState } from '@core/cart/cart-state';
import { CartStore } from '@core/cart/cart-store';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { Observable } from 'rxjs';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {

  @Input() product:Product;
  @Input() products: Product[];
  @Input() s1: number;
  availableQuantities: number[] = [];
  quantity: number = 0; 
  isItemAlreadyInCart: Observable<boolean>;
  constructor(private cartStore: CartStore,private cartService:CartService,private matDialog: MatDialog) {
    this.availableQuantities=ALLOWED_PRODUCT_QUANTITIES;

  }
  ngOnInit(){
    this.isItemAlreadyInCart= this.cartStore.select(getIsItemAlreadyInCart(this.product.productId));
    console.log("product=>",this.product);
    
  }
  addItemToCart() {
    this.cartService.addToCart(this.product,this.quantity).subscribe((cartItem)=>this.openDialog(cartItem));
  }

  openDialog(cartItem: CartItem){
    this.matDialog.open(AddToCartDialogComponent,{
      width: "350px",
      height: "250px",
      data: {cartItem},
      disableClose: true
    });
  }
}

