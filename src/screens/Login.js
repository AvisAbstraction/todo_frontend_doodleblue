import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Paper,
    Grid,
    TextField,
    Button
} from "@material-ui/core";
import Axios from "axios";
import { AuthContext } from "../context/AuthContext"
import { NavLink } from "react-router-dom";
import { API_URL } from "../config"



const useStyles = makeStyles(theme => ({
    root: {
        background: 'linear-gradient(to right ,#267871 0%, #136A8A 100%)'
    },
    paper: {
        padding: 25
    },
    mainContainer: {
        minHeight: "100vh"
    }
}));

export const Login = (props) => {
    const [state, setState] = useState({
        email: "",
        password: ""
    })
    const authData = useContext(AuthContext)

    const classes = useStyles();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Axios.post(API_URL + "/login",
            {
                email: state.email,
                password: state.password
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(data => {
            debugger
            if (data.data.status === 200) {
                setState({ ...state, email: "", password: "" });
                const { token } = data.data;
                localStorage.setItem("token", token);
                const getToken = localStorage.token ? localStorage.token : null;
                authData.setAuth({
                    ...authData,
                    token: getToken
                });
                props.history.push("/home");
            }
        }).catch(err => {
            console.log(err)
        })


    }

    return (
        <div className={classes.root}>
            <Grid
                container
                justify="center"
                alignItems="center"
                className={classes.mainContainer}
            >
                <Grid item md={3} sm={10} xs={12}>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="subtitle1"
                            style={{ textAlign: "center", fontSize: "20px" }}
                        >
                            Login
                          </Typography>

                        <form style={{ padding: 25 }} onSubmit={e => handleSubmit(e)}>
                            <Grid item container justify="center" spacing={2}>
                                <Grid item md={12} sm={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter Email Id"
                                        name="email"
                                        onChange={e => handleChange(e)}

                                    />
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                    <TextField
                                        type="password"
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter password"
                                        name="password"
                                        onChange={e => handleChange(e)}

                                    />
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", paddingTop: 20 }}>
                                    <Button type="submit" color="primary" variant="contained"
                                    >Login</Button>
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", paddingTop: 20 }}>
                                    <Typography
                                        variant="subtitle1"
                                        style={{ textAlign: "center" }}
                                    >
                                        Haven't Registered?
                          </Typography>

                                </Grid>

                                <Grid item xs={12} style={{ textAlign: "center", paddingTop: 20 }}>
                                    <NavLink to="/register" style={{ textDecoration: "none" }}>
                                        <Button color="primary" variant="contained"
                                        >Register</Button>
                                    </NavLink>
                                </Grid>

                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
