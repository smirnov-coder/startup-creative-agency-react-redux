import * as React from "react";
import { ListItem } from "@components/Admin/ListItem";
import { FileInput } from "@components/Admin/FileInput";
import "@bootstrap/css";
import "./PersonalInfo.scss";

export interface PersonalInfoProps {
    userName: string;
    firstName: string;
    lastName: string;
    jobPosition: string;
    photoFilePath: string;
}

const PersonalInfo: React.SFC<PersonalInfoProps> = ({
    userName,
    firstName,
    lastName,
    jobPosition,
    photoFilePath
}: PersonalInfoProps) => {
    let photoModifier = !photoFilePath ? "personal-info__photo--hidden" : "";
    let prefix = "PersonalInfo";
    let names = {
        firstName: `${prefix}.FirstName`,
        lastName: `${prefix}.LastName`,
        jobPosition: `${prefix}.JobPosition`,
        photoFilePath: `${prefix}.PhotoFilePath`,
        image: `${prefix}.Image`,
        fileName: "img-file-name"
    };
    return (
        <div className="personal-info">
            <ListItem>
                <ListItem.Header>
                    Personal Information
                </ListItem.Header>
                <ListItem.Content>
                    <input type="hidden" id={names.photoFilePath} name={names.photoFilePath} defaultValue={photoFilePath} />
                    <div className="personal-info__photo-holder">
                        <img className={`personal-info__photo ${photoModifier}`}
                            src={photoFilePath} alt={`${firstName} ${lastName}`} />
                    </div>
                    <div className="personal-info__description">
                        <div className="list-item__content-line form-group">
                            <label className="list-item__content-line-heading control-label col-sm-2">
                                User Name
                        </label>
                            <div className="col-sm-10">
                                <p className="personal-info__user-name form-control-static">{userName}</p>
                            </div>
                        </div>
                        <div className="list-item__content-line form-group">
                            <label htmlFor={names.firstName} className="list-item__content-line-heading control-label col-sm-2">
                                First Name
                            </label>
                            <div className="col-sm-10">
                                <input id={names.firstName} name={names.firstName} className="personal-info__first-name form-control"
                                    defaultValue={firstName} />
                            </div>
                        </div>
                        <div className="list-item__content-line form-group">
                            <label htmlFor={names.lastName} className="list-item__content-line-heading control-label col-sm-2">
                                Last Name
                            </label>
                            <div className="col-sm-10">
                                <input id={names.lastName} name={names.lastName} className="personal-info__last-name form-control"
                                    defaultValue={lastName} />
                            </div>
                        </div>
                        <div className="list-item__content-line form-group">
                            <label htmlFor={names.jobPosition} className="list-item__content-line-heading control-label col-sm-2">
                                Job Position
                            </label>
                            <div className="col-sm-10">
                                <input id={names.jobPosition} name={names.jobPosition} className="personal-info__job form-control"
                                    defaultValue={jobPosition} />
                            </div>
                        </div>
                        <div className="list-item__content-line form-group">
                            <label htmlFor={names.image} className="list-item__content-line-heading control-label col-sm-2">
                                Image
                            </label>
                            <div className="col-sm-10">
                                <FileInput fileInputId={names.image} fileInputName={names.image} buttonPosition="right"
                                    textInputId={names.fileName} textInputName={names.fileName} />
                            </div>
                        </div>
                    </div>
                </ListItem.Content>
            </ListItem>
        </div>
    );
}

export default PersonalInfo;