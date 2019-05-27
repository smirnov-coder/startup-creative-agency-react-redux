import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import { AdminFooter } from "@components/Shared/AdminFooter";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";
import LoginForm from "@containers/Auth/LoginForm";
import { Routes } from "@scripts/constants";
import ErrorPage from "@components/Shared/ErrorPage";

const AuthArea: React.SFC = () =>
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
    </Layout>;

const LoginPage = withDocumentTitle("Startup ReactRedux Auth Login")(LoginForm);

const AccessDeniedPageContent: React.SFC = () =>
    <ErrorPage title="Error 403" subtitle="Access denied." description="You are not authorized for this operation." />;

const AccessDeniedPage = withDocumentTitle("Startup ReactRedux Auth Access Denied")(AccessDeniedPageContent);

export default AuthArea;
