import { User } from "./User.model";

export interface Item 
{
    id?:             number;
    name:           string;
    item_condition: string;
    description:    string;
    stock:          number;
    price:          number;
    discount_price: number;
    shipping_price: number;
    categories:     Category[];
    images:         Image[];
    user:           User;
    status:         string;
}

export interface Category 
{
    id?:   number;
    name: string;
}

export interface Image 
{
    id?:        number;
    url:       string;
    file_name: string;
    size:      number;
}