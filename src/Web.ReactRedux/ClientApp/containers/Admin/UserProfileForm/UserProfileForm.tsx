import * as React from "react";
import * as $ from "jquery";
import "jquery-validation/dist/additional-methods";
import { DomainUser } from "@store/entities";
import { VALIDATION_OPTIONS } from "@scripts/constants";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import PersonalInfo, { PersonalInfoProps } from "@components/Admin/PersonalInfo";
import SocialLinks from "@components/Admin/SocialLinks";
import "@bootstrap/css";
import "./UserProfileForm.scss";

interface UserProfileFormProps {
    user: DomainUser;
    onSubmit: (formData: FormData) => void;
}

export class UserProfileForm extends React.Component<UserProfileFormProps> {
    private validator: JQueryValidation.Validator;
    private form = React.createRef<HTMLFormElement>();

    componentDidMount(): void {
        let $form = $(this.form.current);
        let socialLinksRules = {};
        $form.find("input[name$='NetworkName']").each(index => {
            let key: string = `SocialLinks[${index}].NetworkName`;
            Object.assign(socialLinksRules, {
                [key]: {
                    required: true,
                    maxlength: 50
                }
            });
        });
        $form.find("input[name$='Url']").each(index => {
            let key: string = `SocialLinks[${index}].Url`;
            Object.assign(socialLinksRules, {
                [key]: {
                    maxlength: 100,
                    url: true
                }
            });
        });
        this.validator = $form.validate({
            ...VALIDATION_OPTIONS,
            rules: {
                "PersonalInfo.FirstName": {
                    maxlength: 30
                },
                "PersonalInfo.LastName": {
                    maxlength: 50
                },
                "PersonalInfo.JobPosition": {
                    maxlength: 100
                },
                "PersonalInfo.PhotoFilePath": {
                    url: true
                },
                "img-file-name": {
                    extension: "jpe?g|png|gif"
                },
                ...socialLinksRules
            },
            messages: {
                "img-file-name": {
                    extension: "Only '.jpeg', '.jpg', '.png', '.gif' files are acceptable."
                }
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            }
        });
    }

    componentWillUnmount(): void {
        this.validator.destroy()
    }

    render(): JSX.Element {
        return (
            <div className="profile">
                <form ref={this.form} className="form-horizontal" encType="multipart/form-data">
                    <div className="profile__personal-info">
                        {this.props.user ? <PersonalInfo {...this.getPersonalInfo()} /> : null}
                    </div>
                    <div className="profile__social-links">
                        {this.props.user ? <SocialLinks items={this.props.user.Profile.SocialLinks} /> : null}
                    </div>
                    <Button className="profile__save" modifiers={[ButtonModifiers.Size.SMALL]} type="submit">Save</Button>
                </form>
            </div>
        );
    }

    getPersonalInfo(): PersonalInfoProps {
        let { Identity, Profile } = this.props.user;
        return {
            userName: Identity.UserName,
            firstName: Profile.FirstName,
            lastName: Profile.LastName,
            jobPosition: Profile.JobPosition,
            photoFilePath: Profile.PhotoFilePath
        };
    }
}