import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Typography,
    Paper,
    Grid,
    TextField,
    Button
} from "@material-ui/core";
import Axios from "axios";
import swal from "sweetalert"
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

export const Registration = (props) => {
    const [state, setState] = useState({
        userName: "",
        email: "",
        contact: ""
    })
    const classes = useStyles();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        Axios.post(API_URL + "/register",
            {
                user_name: state.userName,
                email: state.email,
                contact_number: state.contact
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        ).then(data => {
            data && swal("You have Registered Successfully").then(() =>
                props.history.push("/")
            )
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
                <Grid item md={5} sm={10} xs={12}>
                    <Paper className={classes.paper}>
                        <Typography
                            variant="subtitle1"
                            style={{ textAlign: "center", fontSize: "20px" }}
                        >
                            Registration Form
                          </Typography>

                        <form style={{ padding: 25 }} onSubmit={e => handleSubmit(e)} >
                            <Grid item container justify="center" spacing={2}>
                                <Grid item md={8} sm={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter User Name"
                                        name="userName"
                                        onChange={e => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item md={6} sm={12} xs={12}>
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
                                <Grid item md={6} sm={12} xs={12}>
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter contact number"
                                        name="contact"
                                        onChange={e => handleChange(e)}

                                    />
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", paddingTop: 20 }}>
                                    <Button type="submit" color="primary" variant="contained"
                                    >Submit</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};
