import * as React from "react";
import { Section } from "@components/Home/Section";
import { SectionHeader } from "@components/Home/SectionHeader";
import Dash, { DashModifiers } from "@components/Home/Dash";
import Blog from "@containers/Home/Blog";
import "./BlogSection.scss";

const BlogSection: React.SFC = () => {
    return (
        <div className="blog-section" id="blog">
            <Section>
                <Section.Header>
                    <SectionHeader>
                        <SectionHeader.Title>
                            Recent blog posts
                        </SectionHeader.Title>
                        <SectionHeader.Separator>
                            <Dash modifiers={[DashModifiers.Colors.GREY]} />
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
        </div>
    );
}

export default BlogSection;