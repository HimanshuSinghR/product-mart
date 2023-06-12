import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import AuthService from "@core/auth/auth.service";
import { LogService } from "@core/log.service";
import { Order } from "./order";
import { catchError, of, switchMap, tap, throwError } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class OrderService {
    private apiUrl = '/api/orders/';

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private logService: LogService
    ){

    }
    submitOrder({
        cartId,
        paymentId,
        orderTotal,
        cartItems,
        shippingCost,
        itemsCount,
        estimatedTax,
        orderSubTotal
    }){
        console.log("Inside submit ordee function");
        var today = new Date();
        var after7days = new Date();

        after7days.setDate(today.getDate()+7);

        const user = this.authService.loggedInUser;
        var shippingAddress ="s";
        const order = new Order(
            user.id,
            orderTotal,
            after7days,
            shippingAddress,
            cartItems,
            cartId,
            paymentId,
            shippingCost,
            itemsCount,
            estimatedTax,
            orderSubTotal,
            
        )

        return this.httpClient.post(
            `${this.apiUrl}submit`,order )
        .pipe(
            tap((order:any)=>{
                this.logService.log('Order Created Successfully',order);
            }),
            switchMap((order:any)=> of(order._id)),
            catchError(e=>{
                this.logService.log(`Server Error Occured: ${e.error.message}`,e);
                return throwError(
                    'Your error could not be submitted,please try again'
                )
            })
        );
      

    }
}