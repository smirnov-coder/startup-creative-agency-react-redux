import * as React from "react";
import * as $ from "jquery";
import "jquery-validation/dist/additional-methods";
import { VALIDATION_OPTIONS } from "@scripts/constants";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "@bootstrap/css";
import "./RegisterUserForm.scss";

interface RegisterUserFormProps {
    roles: string[];
    onSubmit: (formData: FormData) => void;
}

export class RegisterUserForm extends React.Component<RegisterUserFormProps> {
    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        let $form = $(this.form.current);
        this.validator = $form.validate({
            ...VALIDATION_OPTIONS,
            rules: {
                UserName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                    pattern: /^[A-Za-z0-9\-_]+$/
                },
                Password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20,
                    pattern: /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/
                },
                ConfirmPassword: {
                    required: true,
                    equalTo: "#Password"
                },
                Email: {
                    required: true,
                    maxlength: 50,
                    email: true
                },
                Role: {
                    required: true,
                    maxlength: 20
                }
            },
            messages: {
                UserName: {
                    pattern: "User name may consist of uppercase letters, lowercase letters, numbers and symbols '-', '_'"
                },
                Password: {
                    pattern: "Password must contain at least one uppercase letter, one lowercase letter and one digit."
                },
                ConfirmPassword: {
                    equalTo: "Please enter password again."
                }
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                this.props.onSubmit(new FormData($form[0] as HTMLFormElement));
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
                            {this.props.roles.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
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