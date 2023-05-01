

import { Injectable } from "@angular/core";
import { CartState, initialState } from "./cart-state";
import { Store } from "@core/store";
import { CartItem } from "./cart-item";


@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState> {

 
    constructor(){
        super(initialState);
    }
    addCartItem(cartItemToAdd: CartItem) {
        console.log('[Cart] Add Cart Item')
        const newState = {
        ...this.state, // cartItems
        cartItems: [].concat(this.state.cartItems,cartItemToAdd)
        };
        this.setState(newState);
      }
      clearCart() {
              
        console.log('[Cart] Clear Cart Item');
        const newState = initialState;
        this.setState(newState);    

      }
      restoreCart(stateToRestore: CartState) {
        console.log('[Cart] Restore Cart Item');

        this.setState(stateToRestore);

      }
      removeCartItem(cartItemToRemove: CartItem) {
        console.log('[Cart] Remove Cart Item')

        const newState = {
            ...this.state,
            cartItems: this.state.cartItems.filter(cartItem=>cartItem.productId != cartItemToRemove.productId)

        }
        this.setState(newState);
      }
    
      updateCartItem(cartItemToUpdate: CartItem) {
        console.log('[Cart] Update Cart Item')

        const newState = {
            ...this.state,
            cartItems: this.state.cartItems.map(cartItem=>cartItem.productId ===cartItemToUpdate.productId?cartItemToUpdate:cartItem)

        }
        this.setState(newState);       
      }
  
}
