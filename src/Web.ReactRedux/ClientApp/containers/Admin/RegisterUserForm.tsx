import * as React from "react";
import * as $ from "jquery";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button, ButtonModifiers } from "@components/Shared/Button";
import { AppState } from "@store/state";
import { registerUser } from "@store/actions/usersActions";
import "./RegisterUserForm.scss";

type RegisterUserFormProps = StateProps & DispatchProps;

class RegisterUserForm extends React.Component<RegisterUserFormProps> {
    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        let $form = $(this.form.current);
        this.validator = $form.validate({
            /// TODO: validation don't forget to
            rules: {
                UserName: {
                    required: true
                },
                Password: {
                    required: true
                },
                ConfirmPassword: {
                    required: true
                },
                Email: {
                    required: true,
                    email: true
                },
                Role: {
                    required: true
                }
            },
            errorElement: "span",
            errorClass: "field-validation-error",
            highlight: (element, errorClass, validClass) => {
                $(element).addClass("input-validation-error");
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
            },
            invalidHandler: (event, validator) => {
                console.error("Form data is invalid.");//
            }
        });
    }

    componentWillUnmount(): void {
        this.validator.destroy();
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        return (
            <div className="register-form">
                <form ref={this.form}>
                    <div className="register-form__line form-group">
                        <label htmlFor="UserName">User Name</label>
                        <input id="UserName" name="UserName" className="register-form__user-name form-control" />
                    </div>
                    <div className="register-form__line form-group">
                        <label htmlFor="Password">Password</label>
                        <input id="Password" name="Password" type="password" className="register-form__password form-control" />
                    </div>
                    <div className="register-form__line form-group">
                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                        <input id="ConfirmPassword" name="ConfirmPassword" className="register-form__confirm form-control"
                            type="password" />
                    </div>
                    <div className="register-form__line form-group">
                        <label htmlFor="Email">E-mail</label>
                        <input id="Email" name="Email" type="email" className="register-form__email form-control" />
                    </div>
                    <div className="register-form__line form-group">
                        <label htmlFor="Role">Role</label>
                        <select id="Role" name="Role" className="register-form__role form-control">
                            <option value="">--- Choose role ---</option>
                            {this.props.roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="register-form__line">
                        <Button type="submit"
                            className="register-form__submit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

interface StateProps {
    roles: string[];
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        roles: state.auth.roles
    };
}

interface DispatchProps {
    onSubmit: (formData: FormData) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onSubmit: bindActionCreators(registerUser, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserForm);