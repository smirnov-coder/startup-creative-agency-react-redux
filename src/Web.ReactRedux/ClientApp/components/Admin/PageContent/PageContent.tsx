import * as React from "react";
import "@bootstrap/css";
import "./PageContent.scss";

interface PageContentProps extends React.PropsWithChildren<{}> {
    caption: string;
}

const PageContent: React.SFC<PageContentProps> = ({ caption, children }: PageContentProps) =>
    <section className="page-content container-fluid">
        <h1 className="page-content__header">{caption}</h1>
        <div className="page-content__content row">{children}</div>
    </section>;

export default PageContent;