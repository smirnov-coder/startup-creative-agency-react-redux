import * as React from "react";
import { DomainUser } from "../../store/entities";
import { SocialLink, SocialLinkModifiers } from "./SocialLink";
import "./TeamMember.scss";
import { Menu } from "./Menu";

type TeamMemberProps = DomainUser;

export class TeamMember extends React.Component<TeamMemberProps> {
    constructor(props: TeamMemberProps) {
        super(props);
    }

    render(): JSX.Element {
        let { FirstName, LastName, PhotoFilePath, JobPosition, SocialLinks } = this.props.Profile; 
        let fullName = `${FirstName} ${LastName}`;
        let icons: any = {
            Facebook: "fa fa-facebook",
            Twitter: "fa fa-twitter",
            GooglePlus: "fa fa-google-plus",
            Linkedin: "fa fa-linkedin"
        };
        return (
            <article className="team-member">
                <div className="team-member__photo">
                    <img src={PhotoFilePath} alt={fullName}
                        className="team-member__img" />
                    <div className="team-member__img-overlay">
                        <Menu modifiers={["menu--style-inline"]} className="team-member__socials">
                            {SocialLinks.map(socialLink => (
                                <Menu.Item key={socialLink.Id}>
                                    <SocialLink url={socialLink.Url} modifiers={[SocialLinkModifiers.Shape.SQUARE]}
                                        icon={icons[socialLink.NetworkName]} />
                                </Menu.Item>
                            ))}
                        </Menu>
                        
                    </div>
                </div>
                <h4 className="team-member__name">{fullName}</h4>
                <h5 className="team-member__job">{JobPosition}</h5>
            </article>
        );
    }
}