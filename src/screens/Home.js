import React, { useState, useEffect, useContext } from "react"
import { Navbar, ListItems } from "../components";
import {
    Container,
    TextField,
    Grid,
    Button
} from "@material-ui/core"
import { NavLink } from "react-router-dom"
import Axios from "axios";
import { AuthContext } from "../context/AuthContext"
import { API_URL } from "../config"



export const Home = props => {
    const [state, setState] = useState({
        todos: [],
        addTodoToggle: false,
        editTodoToggle: false,
        todoName: "",
        todoId: null,
        expiryDate: ""
    })
    const authData = useContext(AuthContext)
    const { token } = authData

    const handleLogout = (e) => {
        localStorage.clear("token")
        props.history.push("/")
    }


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleEdit = (e, todo) => {
        const expiryDateFormatChange = new Date(todo.expiry_date).toISOString().slice(0, 10)
        setState({
            ...state,
            editTodoToggle: true,
            addTodoToggle: false,
            todoName: todo.todo_name,
            todoId: todo.todo_id,
            expiryDate: expiryDateFormatChange
        })
    }

    const updateTodo = (e) => {
        e.preventDefault()
        Axios.put(API_URL + "/update/todo",
            {
                todo_id: state.todoId,
                todo_name: state.todoName,
                expiry_date: state.expiryDate,
                updated_at: new Date()
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(data => {
            data && window.location.reload()
        }).catch(err => {
            console.log(err, "error")
        })


    }

    const handleDelete = (e, todoId) => {
        Axios.put(API_URL + "/delete/todo",
            {
                todo_id: todoId,
                is_active: false,
                updated_at: new Date()
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(data => {
            data && window.location.reload()
        }).catch(err => {
            console.log(err, "error")
        })


    }

    const handleComplete = (e, todoId) => {
        Axios.put(API_URL + "/complete/todo",
            {
                todo_id: todoId,
                isActive: true,
                is_completed: e.target.checked,
                updated_at: new Date()
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(data => {
            data && window.location.reload()
        }).catch(err => {
            console.log(err, "error")
        })
    }

    const handleAddTodoToggle = (e) => {
        setState({ ...state, addTodoToggle: !state.addTodoToggle, editTodoToggle: false })
    }
    const handleAddTodo = (e) => {
        e.preventDefault()
        Axios.post(API_URL + "/create/todo",
            {
                todo_name: state.todoName,
                is_completed: false,
                expiry_date: state.expiryDate,
                is_active: true,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
        ).then(data => {
            data && window.location.reload()
        }).catch(err => {
            console.log(err)
        })

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
            setState({ ...state, todos: data.data.data })
        }).catch(err => {
            console.log(err, "error")
        })
    }, [])

    return (
        <>
            <Navbar handleLogout={handleLogout} />
            <Container>
                <Grid container justify="center" style={{ paddingTop: 20 }}>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                        <Button type="submit" onClick={e => handleAddTodoToggle(e)} color="secondary" variant="contained">Add</Button>
                    </Grid>
                    {state.addTodoToggle && (
                        <Grid item xs={8}>
                            <Grid container justify="space-between" spacing={2}>
                                <Grid item xs={8} >
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter Todo Name/Title"
                                        name="todoName"
                                        onChange={e => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="date"
                                        label="Expiry Date"
                                        type="date"
                                        variant="outlined"
                                        margin="dense"
                                        name="expiryDate"
                                        onChange={e => handleChange(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "right" }}>
                                    <Button type="submit" onClick={e => handleAddTodo(e)} color="secondary" variant="contained">Add Todo</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
                    {state.editTodoToggle && (
                        <Grid item xs={8}>
                            <Grid container justify="space-between" spacing={2}>
                                <Grid item xs={8} >
                                    <TextField
                                        fullWidth
                                        required
                                        variant="outlined"
                                        margin="dense"
                                        label="Enter Todo Name/Title"
                                        name="todoName"
                                        value={state.todoName}
                                        onChange={e => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField
                                        required
                                        fullWidth
                                        id="date"
                                        label="Expiry Date"
                                        type="date"
                                        variant="outlined"
                                        margin="dense"
                                        name="expiryDate"
                                        value={state.expiryDate}
                                        onChange={e => handleChange(e)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "right" }}>
                                    <Button type="submit" onClick={e => updateTodo(e)} color="secondary" variant="contained">Update Todo</Button>
                                </Grid>

                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                    </Grid>

                    <Grid item xs={8}>
                        <ListItems todos={state.todos} handleComplete={handleComplete} handleDelete={handleDelete} handleEdit={handleEdit} location={true} />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "center" }}>
                        <NavLink to="/expiredtodos" style={{ textDecoration: "none" }}>
                            <Button type="submit" color="secondary" variant="contained">See Expired Todos</Button>
                        </NavLink>
                    </Grid>

                </Grid>
            </Container>
        </>
    )
}