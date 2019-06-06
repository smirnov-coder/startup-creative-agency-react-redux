import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect, match } from "react-router";
import { Brand } from "@store/entities";
import { Routes } from "@scripts/constants";
import { fetchBrands, addBrand, fetchBrand, updateBrand } from "@store/actions";
import Loader from "@components/Shared/Loader";
import BrandList from "@containers/Admin/BrandList";
import { BrandItemForm } from "@containers/Admin/BrandItemForm";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "@components/Admin/withPageContentWrapper";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const BrandsSubarea: React.SFC = () => {
    return (
        <Switch>
            <Route exact path={Routes.BRANDS} component={BrandsPage} />
            <Route path={Routes.ADD_BRAND} component={AddBrandPage} />
            <Route path={Routes.EDIT_BRAND} component={EditBlogPostPage} />
            <Redirect to={Routes.NOT_FOUND} />
        </Switch>
    );
}

// Brands page
const BrandsPage = compose(
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchBrands),
    withLoader(Loader, state => state.brands.isLoading),
    withPageContentWrapper("Brand List"),
    withDataFeed(state => state.brands.items, "items")
)(BrandList);

// AddBrand page
const AddBrandPage = compose(
    withPageContentWrapper("Add Brand"),
    withSubmitHandler(addBrand),
    withDataFeed(state => { return { Id: 0, Name: "", ImagePath: "" } as Brand }, "item")
)(BrandItemForm);

// EditBlogPost page
const EditBlogPostPage = compose(
    withInitializer(
        (routeMatch, actionCreator) => {
            let id: number = (routeMatch.params as any).id;
            return () => actionCreator(id);
        },
        fetchBrand
    ),
    withLoader(Loader, state => state.brands.isLoading || !state.brands.current),
    withPageContentWrapper((routeMatch: match) => `Edit Brand, ID: ${(routeMatch.params as any).id}`),
    withSubmitHandler(updateBrand),
    withDataFeed(state => state.brands.current, "item")
)(BrandItemForm);

export default withDocumentTitle("Startup ReactRedux Admin Brands")(BrandsSubarea);