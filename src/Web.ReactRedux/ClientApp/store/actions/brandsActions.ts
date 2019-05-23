import { Brand } from "@store/entities";
import { Action } from "redux";

export interface AddBrandsAction extends Action {
    payload: {
        items: Brand[]
    };
}

export const addBrands = (brands: Brand[]): AddBrandsAction => {
    return {
        type: "ADD_BRANDS",
        payload: {
            items: brands
        }
    };
}