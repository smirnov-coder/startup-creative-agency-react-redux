import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Routes } from "@scripts/constants";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import AdminFooter from "@components/Shared/AdminFooter";
import LoginForm from "@containers/Auth/LoginForm";
import ErrorPage from "@components/Shared/ErrorPage";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";

const AuthArea: React.SFC = () => {
    return (
        <Layout>
            <Layout.Header>
                <AdminHeader />
            </Layout.Header>
            <Layout.Content>
                <Switch>
                    <Route path={Routes.LOGIN} component={LoginPage} />
                    <Route path={Routes.ACCESS_DENIED} component={AccessDeniedPage} />
                    <Redirect to={Routes.NOT_FOUND} />
                </Switch>
            </Layout.Content>
            <Layout.Footer>
                <AdminFooter />
            </Layout.Footer>
        </Layout>
    );
}

const LoginPage = withDocumentTitle("Startup ReactRedux Auth Login")(LoginForm);

const AccessDeniedPageContent: React.SFC = () => {
    return (
        <ErrorPage title="Error 403" subtitle="Access denied." description="You are not authorized for this operation." />
    );
}

const AccessDeniedPage = withDocumentTitle("Startup ReactRedux Auth Access Denied")(AccessDeniedPageContent);

export default AuthArea;
