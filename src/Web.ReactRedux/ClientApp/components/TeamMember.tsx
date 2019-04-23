import * as React from "react";
import { IDomainUser } from "../store/entities";
import { SocialLink, SocialLinkShapes } from "./SocialLink";
import "./TeamMember.scss";

export class TeamMember extends React.Component<IDomainUser> {
    render(): JSX.Element {
        let { FirstName, LastName, PhotoFilePath, JobPosition, SocialLinks } = this.props.Profile; 
        let fullName = `${FirstName} ${LastName}`;
        let icons = [
            {
                key: "Facebook",
                value: "fa fa-facebook"
            },
            {
                key: "Twitter",
                value: "fa fa-twitter"
            },
            {
                key: "GooglePlus",
                value: "fa fa-google-plus"
            },
            {
                key: "Linkedin",
                value: "fa fa-linkedin"
            }
        ];
        return (
            <article className="team-member">
                <div className="team-member__photo">
                    <img src={PhotoFilePath} alt={fullName}
                        className="team-member__img" />
                    <div className="team-member__img-overlay">
                        <ul className="menu menu--style-inline team-member__socials">
                            {SocialLinks.map(socialLink => (
                                <li key={socialLink.Id} className="menu__item">
                                    <SocialLink url={socialLink.Url} shape={SocialLinkShapes.SQUARE}
                                        icon={icons.find(x => x.key === socialLink.NetworkName).value} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <h4 className="team-member__name">{fullName}</h4>
                <h5 className="team-member__job">{JobPosition}</h5>
            </article>
        );
    }
}