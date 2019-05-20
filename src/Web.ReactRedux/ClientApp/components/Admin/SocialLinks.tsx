import * as React from "react";
import { SocialLink } from "../../store/entities";
import { ListItem } from "./ListItem";
import "../../assets/lib/bootstrap-customized/css/bootstrap.css";
import "./ContactItem.scss";

interface SocialLinksProps {
    items: SocialLink[];
}

export class SocialLinks extends React.Component<SocialLinksProps> {
    render(): JSX.Element {
        let { items } = this.props; //console.log("items", items);//
        return (
            <div className="contact-item">
                <ListItem>
                    <ListItem.Header>
                        <span className="contact-item__name">Social Links</span>
                    </ListItem.Header>
                    <ListItem.Content>
                        <div className="contact-item__content">
                            {items.map((item, index) => {
                                //console.log("item", item);//
                                let networkName: string = `SocialLinks[${index}].NetworkName`;
                                let url: string = `SocialLinks[${index}].Url`;
                                return (
                                    <div key={index} className="contact-item__line form-group">
                                        <input id={networkName} name={networkName} type="hidden"
                                            defaultValue={item.NetworkName} />
                                        <label htmlFor={url} className="contact-item__label control-label col-sm-1">
                                            {item.NetworkName}
                                        </label>
                                        <div className="col-sm-11">
                                            <input id={url} name={url} defaultValue={item.Url}
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
}

export default SocialLinks;