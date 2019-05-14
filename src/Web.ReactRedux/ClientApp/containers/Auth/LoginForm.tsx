import * as React from "react";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Button, ButtonModifiers } from "../../components/Home/Button";
import { signIn } from "../../store/actions/actionCreators";
//import { RouteComponentProps, withRouter } from "react-router";
import "./LoginForm.scss";

type LoginFormProps = /*StateProps &*/ DispatchProps /*& RouteComponentProps*/;

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

    componentDidMount(): void {
        if (!$) {
            throw new Error("jQuery '$' is required.");
        }
        $(this.loginForm.current).validate({
            /// TODO: не забыть про валидацию формы
            rules: {
                "user-name": {
                    required: true,
                },
                password: {
                    required: true
                },
                "remember-me": {
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
                // dispatch sign in here
                //let { userName, password, rememberMe } = this.state;
                //let { signIn, returnUrl, history } = this.props;
                //signIn(userName, password, rememberMe); console.log(returnUrl, "returnUrl");//
                //if (returnUrl && returnUrl !== "") {
                //    history.push(returnUrl);
                //} else {
                //    history.push("/admin/myprofile");
                //}
            },
            invalidHandler: (event, validator) => {
                console.log("Form data is invalid.");//
            }
        })
    }

    private loginForm = React.createRef<HTMLFormElement>();

    render(): JSX.Element {
        let { userName, password, rememberMe } = this.state;
        return (
            <div className="login-form panel panel-default center-block">
                <h3>Log in to Admin area.</h3>
                <hr />
                <form ref={this.loginForm}>
                    //<div asp-validation-summary="ModelOnly"></div>
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
                        <label htmlFor="remember-me">Remember Me?</label>
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
        }); //console.log(this.state);//
    }
}

//interface StateProps {
//    returnUrl: string;
//}

//const mapStateToProps = (state: AppState): StateProps => {
//    return {
//        returnUrl: state.auth.returnUrl
//    };
//}

interface SignInInfo {
    userName: string;
    password: string;
    rememberMe: boolean;
    returnUrl?: string;
}

interface DispatchProps {
    signIn: ({ userName, password, rememberMe, returnUrl }: SignInInfo) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return {
        signIn: bindActionCreators(signIn, dispatch),
    }
}

export default /*withRouter(*/connect(null, mapDispatchToProps)(LoginForm)/*)*/;