import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import MyProfilePage from "@containers/Admin/MyProfilePage";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import NavMenu from "@containers/Admin/NavMenu";
import { AdminFooter } from "@components/Shared/AdminFooter";
import NotificationBar from "@containers/Admin/NotificationBar";
import { Routes } from "@scripts/constants";
import { withAuthentication } from "@containers/Admin/withAuthentication";
import ServicesSubarea from "./ServicesSubarea";
import WorksSubarea from "./WorksSubarea";

const AdminArea: React.SFC = () =>
    <Layout>
        <Layout.Header>
            <AdminHeader />
        </Layout.Header>
        <Layout.Sidebar>
            <NavMenu />
        </Layout.Sidebar>
        <Layout.Content>
            <NotificationBar />
            <Switch>
                <Route path={Routes.MY_PROFILE} component={MyProfilePage} />
                <Route path={Routes.SERVICES} component={ServicesSubarea} />
                <Route path={Routes.WORKS} component={WorksSubarea} />
                <Redirect to={Routes.NOT_FOUND} />
            </Switch>
        </Layout.Content>
        <Layout.Footer>
            <AdminFooter />
        </Layout.Footer>
    </Layout>;

export default withAuthentication()(AdminArea);