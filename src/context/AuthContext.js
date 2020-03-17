import React, { useState } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = props => {

    const getToken = localStorage.token ? localStorage.token : null;

    const [state, setAuth] = useState({
        token: getToken
    });
    const { token } = state;

    return (
        <AuthContext.Provider value={{
            token,
            setAuth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const AuthConsumer = AuthContext.Consumer;
