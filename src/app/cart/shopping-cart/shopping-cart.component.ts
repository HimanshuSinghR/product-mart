import { Component } from '@angular/core';
import { CartItem } from '@core/cart/cart-item';
import { getCartItemsCount } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItemsCount: Observable<Number>;

  constructor(private cartStore:CartStore,private cartService:CartService){
    
  }
  ngOnInit(){
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
  }

  updateCartItem({ value },cartItems: CartItem){
    console.log("Attempting to Update quantity from cart page");
    this.cartService.updateCartItem({...cartItems,quantity: value});
  }

  removeCartItem(cartItem: CartItem){
    console.log("Attempting to remove items from cart page");
    this.cartService.removeCartItem(cartItem);
  }
}
