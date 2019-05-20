import * as React from "react";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./PageContent.scss";

interface PageContentProps extends React.PropsWithChildren<{}> {
    caption: string;
}

const PageContent: React.SFC<PageContentProps> = (props: PageContentProps) =>
    <section className="page-content container-fluid">
        <h1 className="page-content__header">{props.caption}</h1>
        <div className="page-content__content row">{props.children}</div>
    </section>;

export default PageContent;