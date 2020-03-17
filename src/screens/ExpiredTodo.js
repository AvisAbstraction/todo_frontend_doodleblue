import React, { useState, useEffect, useContext } from "react"
import {
    Container,
    Grid,
    Button
} from "@material-ui/core"
import Axios from "axios";
import { NavLink } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { Navbar, ListItems } from "../components";
import { API_URL } from "../config"




export const ExpiredTodo = props => {
    const [state, setState] = useState({ expiredTodos: [] })
    const authData = useContext(AuthContext)
    const { token } = authData

    const handleLogout = (e) => {
        localStorage.clear("token")
        props.history.push("/")
    }

    useEffect(() => {
        Axios.get(API_URL + "/todos",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(data => {
            let expiredTodo = []
            data.data.data.map(todo => {
                debugger
                if (new Date(todo.expiry_date).toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)) {
                    expiredTodo.push(todo)
                }
                return expiredTodo
            })
            setState({ ...state, expiredTodos: expiredTodo })
        }).catch(err => {
            console.log(err, "error")
        })
    }, [])

    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <Container>
                <Grid container justify="center" style={{ paddingTop: 20 }}>
                    <Grid item xs={8}>
                        <ListItems todos={state.expiredTodos} location={false} />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "center" }}>
                        <NavLink to="/home" style={{ textDecoration: "none" }}>
                            <Button type="submit" color="secondary" variant="contained">Go Home</Button>
                        </NavLink>
                    </Grid>

                </Grid>
            </Container>

        </>
    )
}