import * as React from "react";
import { Layout } from "@components/Shared/Layout";
import AdminHeader from "@components/Shared/AdminHeader";
import { AdminFooter } from "@components/Shared/AdminFooter";
import ErrorPage from "@components/Shared/ErrorPage";
import { withDocumentTitle } from "@components/Admin/withDocumentTitle";

const NotFoundPage: React.SFC = () =>
    <Layout>
        <Layout.Header>
            <AdminHeader />
        </Layout.Header>
        <Layout.Content>
            <ErrorPage title="Error 404" subtitle="Page Not Found"
                description="The page you are looking for doesn't exist at this location." />
        </Layout.Content>
        <Layout.Footer>
            <AdminFooter />
        </Layout.Footer>
    </Layout>;

export default withDocumentTitle("Startup ReactRedux Page Not Found")(NotFoundPage);