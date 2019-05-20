import * as React from "react";
import { AppState } from "@store/state";
import { DomainUser } from "@store/entities";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import PersonalInfo from "@components/Admin/PersonalInfo";
import { updateUserProfile } from "@store/actions/actionCreators";
import SocialLinks from "@components/Admin/SocialLinks";
import "jquery-validation/dist/additional-methods";
import "./UserProfileForm.scss";
import { Button, ButtonModifiers } from "@components/Shared/Button";

type UserProfileFormProps = StateProps & DispatchProps;

class UserProfileForm extends React.Component<UserProfileFormProps> {
    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
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
                this.props.updateUserProfile(this.props.user.Identity.UserName, formData);
            },
            invalidHandler: (event, validator) => {
                console.error("Form data is invalid.");//
            }
        });
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        //console.log("props", this.props);//
        let personalInfo = {
            userName: this.props.user.Identity.UserName,
            firstName: this.props.user.Profile.FirstName,
            lastName: this.props.user.Profile.LastName,
            jobPosition: this.props.user.Profile.JobPosition,
            photoFilePath: this.props.user.Profile.PhotoFilePath
        }; //console.log("info", personalInfo);//
        return (
            <div className="profile">
                <form ref={this.form} className="form-horizontal" encType="multipart/form-data">
                    <div className="profile__personal-info">
                        <PersonalInfo {...personalInfo} />
                    </div>
                    <div className="profile__social-links">
                        <SocialLinks items={this.props.user.Profile.SocialLinks} />
                    </div>
                    <Button className="profile__save" modifiers={[ButtonModifiers.Size.SMALL]} type="submit">Save</Button>
                </form>
            </div>
        );
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
    updateUserProfile: (userName: string, formData: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        updateUserProfile: bindActionCreators(updateUserProfile, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileForm);