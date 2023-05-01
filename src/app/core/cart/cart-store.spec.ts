import { TestBed } from "@angular/core/testing";
import { CartStore } from "./cart-store";
import { CartState, initialState } from "./cart-state";
import { CartItem } from "./cart-item";

describe('CartStore', () => {
  let cartStore : CartStore;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      providers:[CartStore]
    });
    cartStore = TestBed.get(CartStore);
  })
  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });

  it('can add item into cart state',()=>{
    const currentState =initialState;
    expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItem= {
      productId: 1,
      imgUrl: 'img/apple/',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name:'apple'
    };

    cartStore.addCartItem(cartItem);

    const expectedState = {
      cartItems: [cartItem]
    };

    expect(cartStore.state).toEqual(expectedState);
  })

  it('can clear cart',()=>{

    const cartItem: CartItem= {
      productId: 1,
      imgUrl: 'img/apple/',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name:'apple'
    };

    cartStore.addCartItem(cartItem);

    const currentState = {
      cartItems: [cartItem]
    };

    expect(cartStore.state).toEqual(currentState);

    //Act
    cartStore.clearCart();

    //Assert
    expect(cartStore.state).toEqual(initialState);

  })
  it('can restore cart',()=>{

    //#region Arrange
    const currentState = initialState;


    expect(cartStore.state).toEqual(currentState);
    const cartItem: CartItem= {
      productId: 1,
      imgUrl: 'img/apple/',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name:'apple'
    };
    const expectedState:  CartState= {
      cartItems:[cartItem]
    }
    //#endRegion
    // #region Act
    cartStore.restoreCart(expectedState);
    //#endRegion

    // #region Assert
    expect(cartStore.state).toEqual(expectedState);
    // # endregion
  })  
  
  it('can remove cart item',()=>{
    //#region Arrange
 
    const cartItem: CartItem= {
      productId: 1,
      imgUrl: 'img/apple/',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name:'apple'
    };
    const cartItem1: CartItem= {
      productId: 2,
      imgUrl: 'img/orange/',
      price: 2,
      quantity: 2,
      itemTotal: 10,
      name: 'orange'
    }
    const currentState:  CartState= {
      cartItems:[cartItem,cartItem1]
    }
    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);
    //#endRegion
    // #region Act
    cartStore.removeCartItem(cartItem);
    //#endRegion

    // #region Assert
    const expectedState: CartState = {
      cartItems:[cartItem1]
    }
    expect(cartStore.state).toEqual(expectedState);
    // # endregion   
  })

  it('can update cart Item',()=>{
    //#region Arrange
 
    const cartItem: CartItem= {
      productId: 1,
      imgUrl: 'img/apple/',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name:'apple'
    };
    const cartItem1: CartItem= {
      productId: 2,
      imgUrl: 'img/orange/',
      price: 2,
      quantity: 2,
      itemTotal: 10,
      name: 'orange'
    }
    const currentState:  CartState= {
      cartItems:[cartItem,cartItem1]
    }
    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);
    //#endRegion
    // #region Act
    const cartItemToUpdate: CartItem = {
      
        productId: 2,
        imgUrl: 'img/orange/',
        price: 2,
        quantity: 8,
        itemTotal: 40,
        name: 'orange'
    }
    cartStore.updateCartItem(cartItemToUpdate);
    //#endRegion

    // #region Assert
    const expectedState: CartState = {
      cartItems:[cartItem,cartItemToUpdate]
    }
    expect(cartStore.state).toEqual(expectedState);
    // # endregion      
  })
});
