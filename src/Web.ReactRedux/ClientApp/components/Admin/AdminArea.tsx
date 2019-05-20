import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import MyProfilePage from "@containers/Admin/MyProfilePage";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import NavMenu from "@containers/Admin/NavMenu";
import { AdminFooter } from "@components/Shared/AdminFooter";
import NotificationBar from "@containers/Admin/NotificationBar";
import { ServicesSubarea } from "@containers/Admin/ServicesSubarea";

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
                <Route path="/admin/myprofile" component={MyProfilePage} />
                <Route path="/admin/services" component={ServicesSubarea} />
                <Redirect to="/notfound" />
            </Switch>
        </Layout.Content>
        <Layout.Footer>
            <AdminFooter />
        </Layout.Footer>
    </Layout>;

export default AdminArea;