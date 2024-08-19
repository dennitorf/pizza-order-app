import { ToppingType } from "./topping-type";

export interface Topping {
    id : string; 
    code: string;
    description: string; 
    doubleCountForOffers : boolean; 
    toppingType: ToppingType;
    toppingTypeId : string;
    price: number;
}
