import * as React from "react";
import { SocialLink } from "@store/entities";
import { ListItem } from "./ListItem";
import "@bootstrap/css";
import "./ContactItem.scss";

interface SocialLinksProps {
    items: SocialLink[];
}

const SocialLinks: React.SFC<SocialLinksProps> = ({ items }: SocialLinksProps) => {
    return (
        <div className="contact-item">
            <ListItem>
                <ListItem.Header>
                    <span className="contact-item__name">Social Links</span>
                </ListItem.Header>
                <ListItem.Content>
                    <div className="contact-item__content">
                        {items.map((item, index) => {
                            let networkNameAttribute = `SocialLinks[${index}].NetworkName`;
                            let urlAttribute = `SocialLinks[${index}].Url`;
                            return (
                                <div key={index} className="contact-item__line form-group">
                                    <input id={networkNameAttribute} name={networkNameAttribute} type="hidden"
                                        defaultValue={item.NetworkName} />
                                    <label htmlFor={urlAttribute} className="contact-item__label control-label col-sm-1">
                                        {item.NetworkName}
                                    </label>
                                    <div className="col-sm-11">
                                        <input id={urlAttribute} name={urlAttribute} defaultValue={item.Url}
                                            className="contact-item__text-input form-control" type="url" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ListItem.Content>
            </ListItem>
        </div>
    );
}

export default SocialLinks;