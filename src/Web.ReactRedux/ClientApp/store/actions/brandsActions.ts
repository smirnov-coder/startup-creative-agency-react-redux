import { Brand } from "@store/entities";
import { ActionTypes } from "./actionTypes";
import { GLOBALS, Routes } from "@scripts/constants";
import { fetchData, ItemsAction, addItems, setCurrent, CurrentAction, deleteEntity, submitFormData } from "./genericActions";
import { decodeHTML, formatString } from "@scripts/utils";

export function fetchBrands() {
    return fetchData<Brand[]>({
        url: GLOBALS.api.brands,
        requestActionType: ActionTypes.REQUEST_BRANDS,
        success: addBrands,
        errorTitle: "fetch brands error"
    });
}

function addBrands(brands: Brand[]): ItemsAction<Brand> {
    return addItems(brands, false, ActionTypes.BRANDS);
}

export function fetchBrand(brandId: number) {
    let template: string = decodeHTML(GLOBALS.api.brand);
    let url: string = formatString(template, brandId);
    return fetchData<Brand>({
        url,
        requestActionType: ActionTypes.REQUEST_BRANDS,
        success: setCurrentBrand,
        errorTitle: "fetch brand error"
    });
}

export function setCurrentBrand(brand: Brand): CurrentAction<Brand> {
    return setCurrent<Brand>(brand, ActionTypes.CURRENT_BRAND);
}

export function deleteBrand(brandId: number) {
    return deleteEntity({
        entityId: brandId,
        urlTemplate: GLOBALS.api.brand,
        requestActionType: ActionTypes.REQUEST_BRANDS,
        success: fetchBrands,
        errorTitle: "delete brand error"
    });
}

export const addBrand = (brandData: FormData) => submitBrandData(brandData, "POST", "add brand error");

export const updateBrand = (brandData: FormData) => submitBrandData(brandData, "PUT", "update brand error");

function submitBrandData(brandData: FormData, method: "POST" | "PUT", errorTitle: string) {
    return submitFormData({
        url: GLOBALS.api.brands,
        method,
        formData: brandData,
        successRedirectUrl: Routes.BRANDS,
        requestActionType: ActionTypes.REQUEST_BRANDS,
        completedActionType: ActionTypes.REQUEST_BRANDS_COMPLETED,
        errorTitle
    });
}