import * as React from "react";
import { compose } from "redux";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router";
import { Routes } from "@scripts/constants";
import { fetchContacts, fetchMe, updateProfile } from "@store/actions";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import AdminFooter from "@components/Shared/AdminFooter";
import Loader from "@components/Shared/Loader";
import NavMenu from "@containers/Admin/NavMenu";
import NotificationBar from "@containers/Admin/NotificationBar";
import ServicesSubarea from "@components/Admin/ServicesSubarea";
import WorksSubarea from "@components/Admin/WorksSubarea";
import BlogSubarea from "@components/Admin/BlogSubarea";
import BrandsSubarea from "@components/Admin/BrandsSubarea";
import TestimonialsSubarea from "@components/Admin/TestimonialsSubarea";
import UsersSubarea from "@components/Admin/UsersSubarea";
import MessagesSubarea from "@components/Admin/MessagesSubarea";
import ContactList from "@containers/Admin/ContactList";
import { UserProfileForm } from "@containers/Admin/UserProfileForm";
import { withAuthentication } from "@containers/Admin/withAuthentication";
import { withDocumentTitle } from "./withDocumentTitle";
import { withInitializer } from "@containers/Admin/withInitializer";
import { withLoader } from "@containers/Admin/withLoader";
import { withPageContentWrapper } from "./withPageContentWrapper";
import { withSubmitHandler } from "@containers/Admin/withSubmitHandler";
import { withDataFeed } from "@containers/Admin/withDataFeed";

type AdminAreaProps = RouteComponentProps;

const AdminArea: React.SFC<AdminAreaProps> = () => {
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

const MyProfilePage = compose(
    withDocumentTitle("Startup ReactRedux Admin My Profile"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchMe),
    withLoader(Loader, state => state.users.isLoading),
    withPageContentWrapper("My Profile"),
    withSubmitHandler(updateProfile),
    withDataFeed(state => state.users.current, "user")
)(UserProfileForm);

const ContactsPage = compose(
    withAuthentication(true),
    withDocumentTitle("Startup ReactRedux Admin Contacts"),
    withInitializer((routeMatch, actionCreator) => actionCreator, fetchContacts),
    withLoader(Loader, state => state.contacts.isLoading),
    withPageContentWrapper("Company Contacts"),
)(ContactList);

export default withAuthentication()(AdminArea);