﻿import * as React from "react";
import { AppState } from "@store/state";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import { Routes } from "@scripts/constants";
import Loader from "@components/Shared/Loader";

export function withAuthentication(adminCheck: boolean = false) {
    return <T extends RouteComponentProps>(WrappedComponent: React.ComponentType<T>) => {
        class WithAuthentication extends React.Component<StateProps & T> {
            render(): JSX.Element {
                let { isLoading, isAuthenticated, isAdmin, ...restProps } = this.props as any;
                return (
                    isLoading
                        ? <Loader modifiers={["loader--behavior-fill"]} />
                        : !isAuthenticated
                            ? <Redirect to={{ pathname: Routes.LOGIN, state: { returnUrl: location.pathname } }} />
                            : adminCheck && !isAdmin
                                ? <Redirect to={Routes.ACCESS_DENIED} />
                                : <WrappedComponent {...restProps} />
                );
            }
        }

        interface StateProps {
            isLoading: boolean;
            isAuthenticated: boolean;
            isAdmin: boolean;
        }

        const mapStateToProps = (state: AppState): StateProps => {
            return {
                isLoading: state.auth.isLoading,
                isAuthenticated: state.auth.isAuthenticated,
                isAdmin: state.auth.isAdmin
            };
        }

        // @ts-ignore: https://github.com/piotrwitek/react-redux-typescript-guide/issues/100
        return connect(mapStateToProps, null)(WithAuthentication);
    }
}