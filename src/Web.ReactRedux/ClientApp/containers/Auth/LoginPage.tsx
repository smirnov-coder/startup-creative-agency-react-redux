import * as React from "react";
import LoginForm from "./LoginForm";

export class LoginPage extends React.Component {

    componentDidMount(): void {
        document.title = "Startup ReactRedux Auth Login";
    }

    render(): JSX.Element {
        return (
            <LoginForm />
        );
    }   
}