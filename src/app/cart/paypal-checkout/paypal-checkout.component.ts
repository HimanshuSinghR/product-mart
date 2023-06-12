import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '@core/cart/cart-item';
import { getCartItems, getCartItemsCount, getCartSubTotal, getEstimatedTax, getOrderTotal, getShippingCost } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { CartService } from '@core/cart/cart.service';
import { LogService } from '@core/log.service';
import { OrderService } from '@core/orders/order.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';


declare let paypal:any;
@Component({
  selector: 'app-paypal-checkout',
  templateUrl: './paypal-checkout.component.html',
  styleUrls: ['./paypal-checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaypalCheckoutComponent {
  orderTotalSubscription: Subscription;
  orderTotal:number=0;
  cartItems: CartItem[];
  shippingCost: number;
  itemsCount: number;
  estimatedTax: number;
  orderSubTotal: number;
  s:Observable<any>;
  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStore,
    private logService: LogService,
    private orderService: OrderService
  ){

  }

  ngOnInit(){
    // get order total

     // paypal.button.reder(this.paypalConfig,)
    // render paypal button pass paypal configuration.
    paypal.Button.render(this.paypalConfig,'#paypal-button-container');

    
    // this.orderTotalSubscription = this.cartStore.select(getOrderTotal).subscribe((orderTotal:number)=>{
    //   this.logService.log(`Get order total to charge: ${orderTotal}`);
    //   this.orderTotalToCharge = orderTotal;
    // });
    
    // get order details ,we will use higher order observable operator
    // combines latest to get all order properties.
    this.orderTotalSubscription = combineLatest(this.cartStore.select(getOrderTotal),
                                                this.cartStore.select(getCartItems),
                                                this.cartStore.select(getShippingCost),
                                                this.cartStore.select(getCartItemsCount),
                                                this.cartStore.select(getEstimatedTax),
                                                this.cartStore.select(getCartSubTotal)
                                                ).subscribe(([orderTotalToCharge,cartItems,shippingCost,itemsCount,estimatedTax,orderSubTotal])=>{
                                                 this.logService.log(`Order Total is`,orderTotalToCharge);
                                                 this.logService.log(`Cart Items`,cartItems);
                                                 this.orderTotal = orderTotalToCharge as number;
                                                 this.cartItems = cartItems as CartItem[];
                                                this.shippingCost = shippingCost as number;
                                                this.itemsCount = itemsCount as number;
                                                this.estimatedTax = estimatedTax as number;
                                                this.orderSubTotal = orderSubTotal as number;
                                                }
                                                );
  }
  ngOndestroy(){
    if(this.orderTotalSubscription){
      this.orderTotalSubscription.unsubscribe();
    }
  }

  get paypalConfig(){
    return {
      style: {size:"responsive"},
      env: 'sandbox',
      client: {sandbox:'AUwdYhwifYtEz4VaJOiiurs9GYo4ApWlP_SnmARoSCpST7SLaRz2zgwmly7Ez3N5Xj_zam8-0C7zgBVE'},
      commit: true,
      payment: (data, actions)=>{
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: {
                  total: this.orderTotal,
                  currency: 'USD'
                }
              }
            ]
          }
        })
      },
      onAuthorize: (data,actions)=>{
        return actions.payment.execute().then(payment=>{
          this.logService.log(`The Payment is successful`,payment);
          const {cart: cartId,id: paymentId} = payment;
          const {
            orderTotal,
            cartItems,
            shippingCost,
            itemsCount,
            estimatedTax,
            orderSubTotal
          } = this;
 
           this.orderService.submitOrder({
            cartId,
            paymentId,
            cartItems,
            orderTotal,
            shippingCost,
            itemsCount,
            estimatedTax,
            orderSubTotal
          }
          ).subscribe((orderId)=>{
            this.logService.log("Order Created successfully",orderId);
            this.logService.log('Redirecting to thank you page',orderId);
            this.cartService.clearCart();
            this.router.navigate(['products']);
          });
          // this.cartService.clearCart();
          
        })
      },
      onCancel: (data)=>{
        this.logService.log('The Payment is cancelled',data);
      },
      onError: (error)=>{
        this.logService.log('Payment Error',error);
      }
    }
  }
}
