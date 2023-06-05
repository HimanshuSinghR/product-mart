import { CartItem } from "@core/cart/cart-item";

export class Order {
    orderId = '';
    // this we will use in Angular app 
    // that will be mapped to _id from mongo db.
    createdAt = Date.now;
    constructor(
        public userId: string,
        public orderTotal: string,
        public deliveryDate: Date,
        public shippingAddress: string,
        public itemList: CartItem[],
        public cartId: string,
        public PaymentId: string,
        public itemsCount: number,
        public estimatedTax: number,
        public orderSubTotal: number
    ){
        
    }
}