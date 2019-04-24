import * as React from "react";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { Dash, DashColors } from "./Dash";
import Blog from "../containers/Blog";
import "./BlogSection.scss";

export class BlogSection extends React.Component {
    render(): JSX.Element {
        return (
            <section className="section blog-section" id="blog">
                <Section>
                    <Section.Header>
                        <SectionHeader>
                            <SectionHeader.Title>
                                Recent blog posts
                            </SectionHeader.Title>
                            <SectionHeader.Separator>
                                <Dash color={DashColors.GREY} />
                            </SectionHeader.Separator>
                            <SectionHeader.Subtitle>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr amet
                            </SectionHeader.Subtitle>
                        </SectionHeader>
                    </Section.Header>
                    <Section.Content>
                        <div className="blog-section__content">
                            <Blog />
                        </div>
                    </Section.Content>
                </Section>
            </section>
        );
    }
}