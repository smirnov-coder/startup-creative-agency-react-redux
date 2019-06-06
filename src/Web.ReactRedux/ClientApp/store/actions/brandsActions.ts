import { push } from "connected-react-router";
import { Brand } from "@store/entities";
import { GLOBALS, Routes, HttpMethod } from "@scripts/constants";
import { decodeHTML, formatString } from "@scripts/utils";
import {
    fetchData,
    ItemsAction,
    addItems,
    setCurrent,
    CurrentAction,
    deleteEntity,
    submitFormData,
    ActionTypes,
    createNonPayloadAction
} from "@store/actions";

export function fetchBrands() {
    let url: string = GLOBALS.api.brands;
    return fetchData<Brand[]>({
        url,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS_COMPLETED)),
        success: addBrands,
        errorMessage: `Failed to fetch brands from ${url}.`
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
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS_COMPLETED)),
        success: setCurrentBrand,
        errorMessage: `Failed to fetch brand with ID = ${brandId} from ${url}.`
    });
}

export function setCurrentBrand(brand: Brand): CurrentAction<Brand> {
    return setCurrent<Brand>(brand, ActionTypes.CURRENT_BRAND);
}

export function deleteBrand(brandId: number) {
    return deleteEntity({
        entityId: brandId,
        urlTemplate: GLOBALS.api.brand,
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS_COMPLETED)),
        success: fetchBrands,
        errorMessage: `Failed to delete brand with ID = ${brandId}.`
    });
}

export const addBrand = (brandData: FormData) => submitBrandData(brandData, HttpMethod.POST, "Failed to create new brand.");

export function updateBrand(brandData: FormData) {
    return submitBrandData(brandData, HttpMethod.PUT, `Failed to update brand with ID = ${brandData.get("Id")}.`);
}

function submitBrandData(brandData: FormData, method: HttpMethod, errorMessage: string) {
    return submitFormData({
        url: GLOBALS.api.brands,
        method,
        formData: brandData,
        success: dispatch => dispatch(push(Routes.BRANDS)),
        requestInit: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS)),
        requestComplete: dispatch => dispatch(createNonPayloadAction(ActionTypes.REQUEST_BRANDS_COMPLETED)),
        errorMessage
    });
}