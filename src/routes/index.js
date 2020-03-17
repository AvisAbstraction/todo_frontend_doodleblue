import React from "react";
import { BrowserRouter as MainRouter, Switch, Route } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import {
    Home,
    Login,
    Registration,
    ExpiredTodo
} from "../screens";
import {
    HOME,
    LOGIN,
    REGISTRATION,
    EXPIRED,
} from "./routes";

export const Router = (props) => {
    return (
        <MainRouter>
            <Switch>
                <Route path={REGISTRATION} exact component={Registration} />
                <Route path={LOGIN} exact component={Login} />
                <ProtectedRoute path={HOME} exact component={Home} />
                <ProtectedRoute path={EXPIRED} exact component={ExpiredTodo} />
            </Switch>
        </MainRouter>
    );
};
