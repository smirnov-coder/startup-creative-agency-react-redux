import * as React from "react";
import * as $ from "jquery";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { RouteComponentProps } from "react-router";
import { AppState } from "@store/state";
import { VALIDATION_OPTIONS } from "@scripts/constants";
import { signIn } from "@store/actions";
import Button, { ButtonModifiers } from "@components/Shared/Button";
import "./LoginForm.scss";

type LoginFormProps = StateProps & DispatchProps & RouteComponentProps;

interface LoginFormState {
    userName: string;
    password: string;
    rememberMe: boolean;
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            rememberMe: false
        };
    }

    private validator: JQueryValidation.Validator;

    componentDidMount(): void {
        this.validator = $(this.form.current).validate({
            ...VALIDATION_OPTIONS,
            rules: {
                "user-name": {
                    required: true,
                },
                password: {
                    required: true
                }
            },
            submitHandler: (form, event) => {
                event.preventDefault();
                let { state } = this.props.location;
                let returnUrl: string = state ? (state as any).returnUrl : null;
                this.props.onSubmit({ ...this.state, returnUrl });
            }
        });
    }

    componentWillUnmount(): void {
        this.validator.destroy();
    }

    private form = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { userName, password, rememberMe } = this.state;
        let { errorMessage } = this.props;
        return (
            <div className="login-form panel panel-default center-block">
                <h3>Log in to Admin area.</h3>
                <hr />
                <form ref={this.form}>
                    {errorMessage ? <div className="login-form__error">{errorMessage}</div> : null}
                    <div className="form-group">
                        <label htmlFor="user-name" className="control-label">User Name</label>
                        <input id="user-name" name="user-name" className="login-form__user-name form-control"
                            value={userName} onChange={(e) => this.handleChange(e, "userName")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label> 
                        <input id="password" name="password" type="password"
                            className="login-form__password form-control"
                            value={password} onChange={(e) => this.handleChange(e, "password")}/>
                    </div>
                    <div className="form-group form-check">
                        <input id="remember-me" name="remember-me" type="checkbox"
                            className="login-form__remember-me form-check-input"
                            value={`${rememberMe}`} onChange={(e) => this.handleChange(e, "rememberMe")} />
                        <label htmlFor="remember-me" style={{ marginLeft: 5 }}>Remember me</label>
                    </div>
                    <div className="form-group">
                        <Button className="login-form__submit"
                            type="submit"
                            modifiers={[ButtonModifiers.Size.SMALL]}
                            children="Sign In"/>
                    </div>
                </form>
            </div>
        );
    }

    handleChange(event: React.ChangeEvent, inputName: string): void {
        let value: string = (event.target as HTMLInputElement).value;
        this.setState({
            ...this.state,
            [inputName]: value
        });
    }
}

interface StateProps {
    errorMessage: string;
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        errorMessage: state.auth.errorMessage
    };
}

interface SignInInfo {
    userName: string;
    password: string;
    rememberMe: boolean;
    returnUrl?: string;
}

interface DispatchProps {
    onSubmit: ({ userName, password, rememberMe, returnUrl }: SignInInfo) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        onSubmit: bindActionCreators(signIn, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);