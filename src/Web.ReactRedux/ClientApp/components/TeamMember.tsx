import * as React from "react";
import { IDomainUser } from "../store/entities";
import { SocialLink, SocialLinkModifiers } from "./SocialLink";
import "./TeamMember.scss";
import { Menu } from "./Menu";

export class TeamMember extends React.Component<IDomainUser> {
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

//<ul className="menu menu--style-inline team-member__socials">
//    {SocialLinks.map(socialLink => (
//        <li key={socialLink.Id} className="menu__item">
//            <SocialLink url={socialLink.Url} shape={SocialLinkShapes.SQUARE}
//                icon={icons[socialLink.NetworkName]} />
//        </li>
//    ))}
//</ul>