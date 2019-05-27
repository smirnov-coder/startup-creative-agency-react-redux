import * as React from "react";
import { AppState } from "@store/state";
import { DomainUser } from "@store/entities";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import PersonalInfo, { PersonalInfoProps } from "@components/Admin/PersonalInfo";
import SocialLinks from "@components/Admin/SocialLinks";
import "jquery-validation/dist/additional-methods";
import "./UserProfileForm.scss";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import { updateProfile } from "@store/actions/usersActions";

type UserProfileFormProps = StateProps & DispatchProps;

class UserProfileForm extends React.Component<UserProfileFormProps> {
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
        $form.validate({
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
                    accept: "image/*",
                    extension: "jpe?g|png|gif"
                },
                ...socialLinksRules
            },
            errorElement: "span",
            errorClass: "field-validation-error",
            highlight: (element, errorClass, validClass) => {
                $(element).addClass("input-validation-error");
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                // dispatch sign in here
                let formData: FormData = new FormData($form[0] as HTMLFormElement);
                this.props.onSubmit(this.props.user.Identity.UserName, formData);
            },
            invalidHandler: (event, validator) => {
                console.error("Form data is invalid.");//
            }
        });
    }

    private form = React.createRef<HTMLFormElement>();

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

interface StateProps {
    user: DomainUser;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        user: state.users.current
    };
}

interface DispatchProps {
    onSubmit: (userName: string, formData: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onSubmit: bindActionCreators(updateProfile, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);