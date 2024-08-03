import { Offer } from "./offer";
import { Pizza } from "./pizza";

export interface Cart {
    pizza : Pizza[];
    offers : Offer[]; 
    total : number
    discount : number
    finalTotal : number;
}
