import { Component, Input } from '@angular/core';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';
import { CartState } from '@core/cart/cart-state';
import { CartStore } from '@core/cart/cart-store';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from '@core/cart/cart.service';
import { Product } from '@core/products/product';
import { Observable } from 'rxjs';

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
  quantity: number = 1; 
  isItemAlreadyInCart: Observable<boolean>;
  constructor(private cartStore: CartStore,private cartService:CartService) {
    this.availableQuantities=ALLOWED_PRODUCT_QUANTITIES;

  }
  ngOnInit(){
    this.isItemAlreadyInCart= this.cartStore.select(getIsItemAlreadyInCart(this.product.productId));
    console.log("product=>",this.product)
    console.log("products=>",this.products);
 
  }
  addItemToCart() {
    this.cartService.addToCart(this.product,this.quantity).subscribe((cartItem)=>console.log("added To Cart",cartItem));
  }
}

