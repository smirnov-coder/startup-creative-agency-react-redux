import * as React from "react";
import { Switch, Route, Redirect } from "react-router";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import NavMenu from "@containers/Admin/NavMenu";
import AdminFooter from "@components/Shared/AdminFooter";
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
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import Loader from "@components/Shared/Loader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import { fetchContacts, saveContacts } from "@store/actions/contactsActions";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { fetchMe, updateProfile } from "@store/actions/usersActions";
import { UserProfileForm } from "@containers/Admin/UserProfileForm";
import { withDataFeed } from "@containers/Admin/withDataFeed";

const AdminArea: React.SFC = () => {
    return (
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
        </Layout>
    );
}

// MyProfile page
const MyProfilePage = compose(
    withDocumentTitle("Startup ReactRedux Admin My Profile"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchMe),
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("My Profile"),
    withSubmitHandler(updateProfile),
    withDataFeed(state => state.users.current, "user")
)(UserProfileForm);

// Contacts page
const ContactsPage = compose(
    withAuthentication(true),
    withDocumentTitle("Startup ReactRedux Admin Contacts"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchContacts),
    withLoader(Loader, state => state.contacts.isLoading),
    withPageContentWrapper("Company Contacts"),
)(ContactList);

export default withAuthentication()(AdminArea);