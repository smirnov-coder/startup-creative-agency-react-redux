import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import { LoginPage } from "@containers/Auth/LoginPage";
import { AccessDeniedPage } from "@containers/Auth/AccessDeniedPage";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import { AdminFooter } from "@components/Shared/AdminFooter";

const AuthArea: React.SFC = () =>
    <Layout>
        <Layout.Header>
            <AdminHeader />
        </Layout.Header>
        <Layout.Content>
            <Switch>
                <Route path="/auth/login" component={LoginPage} />
                <Route path="/auth/access-denied" component={AccessDeniedPage} />
                <Redirect to="/not-found" />
            </Switch>
        </Layout.Content>
        <Layout.Footer>
            <AdminFooter />
        </Layout.Footer>
    </Layout>

export default AuthArea;