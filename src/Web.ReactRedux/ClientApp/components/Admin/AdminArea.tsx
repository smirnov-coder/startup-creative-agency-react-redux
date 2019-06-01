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
import BlogSubarea from "./BlogSubarea";
import BrandsSubarea from "./BrandsSubarea";
import TestimonialsSubarea from "./TestimonialsSubarea";
import UsersSubarea from "./UsersSubarea";
import MessagesSubarea from "./MessagesSubarea";
import { compose } from "redux";
import { withDocumentTitle } from "./withDocumentTitle";
import ContactList from "@containers/Admin/ContactList";
import { withInitializer } from "@containers/Admin/withPageInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import { fetchContacts, saveContacts } from "@store/actions/contactsActions";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";

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
                <Route path={Routes.USERS} component={UsersSubarea} />
                <Route path={Routes.WORKS} component={WorksSubarea} />
                <Route path={Routes.BLOG} component={BlogSubarea} />
                <Route path={Routes.BRANDS} component={BrandsSubarea} />
                <Route path={Routes.TESTIMONIALS} component={TestimonialsSubarea} />
                <Route path={Routes.CONTACTS} component={ContactsPage} />
                <Route path={Routes.MESSAGES} component={MessagesSubarea} />
                <Redirect to={Routes.NOT_FOUND} />
            </Switch>
        </Layout.Content>
        <Layout.Footer>
            <AdminFooter />
        </Layout.Footer>
    </Layout>;

const ContactsPage = compose(
    withAuthentication(true),
    withDocumentTitle("Startup ReactRedux Admin Contacts"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchContacts),
    withLoader(Loader, state => state.contacts.isLoading),
    withPageContentWrapper("Company Contacts"),
    withSubmitHandler(saveContacts)
)(ContactList);

export default withAuthentication()(AdminArea);