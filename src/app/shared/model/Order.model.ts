
import { Item } from "./Item.model";
import { User } from "./User.model";

export interface Order {
    id?:                        number;
    price:                     number;
    quantity:                  number;
    total:                     number;
    reciever_name:             string;
    phone_number:              string;
    shipping_price:            number;
    shippingLabel:             string;
    shipping_address:          string;
    shipping_city:             string;
    shipping_state:            string;
    shipping_zip:              number;
    current_shipping_location: string;
    status:                    string;
    purchase_date?:             string;
    item:                      Item;
    user:                      User;
}

export interface ShippingAddress {
    id?:            number;
    label?:         string;
    reciever_name: string;
    phone_number:  string;
    address:       string;
    city:          string;
    state:         string;
    zip:           number;
    user?:          User;
}

export interface Card 
{
    id?:          number;
    number:      number;
    valid_month: number;
    valid_year:  number;
    name:        string;
    cvc:         number;
}
