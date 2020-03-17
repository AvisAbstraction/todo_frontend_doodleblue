import React from "react"
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemIcon,
    Checkbox,
    Typography,
    IconButton,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router-dom"


const useStyles = makeStyles(theme => ({
    root: {
    },
    paper: {
        padding: 25
    },
    mainContainer: {
        minHeight: "100vh"
    }
}));



export const ListItems = ({ todos, handleComplete, handleDelete, handleEdit, location }) => {
    const classes = useStyles();

    return (

        <List className={classes.root}>
            {location ? <Typography variant="h6" style={{ textAlign: "center", marginBottom: 10 }}> All Todos </Typography> : <Typography variant="h6" style={{ textAlign: "center", marginBottom: 10 }}>Expired Todos</Typography>}
            {todos.length ?
                todos.map(todo => {
                    return (
                        <ListItem key={todo.todo_id} dense button style={{ marginBottom: 10, borderRadius: 10, backgroundColor: !location ? 'orangeRed' : "", color: !location ? 'white' : "" }}>
                            <ListItemIcon>
                                {location && (
                                    <Checkbox
                                        edge="start"
                                        onChange={e => handleComplete(e, todo.todo_id)}
                                    />
                                )}
                            </ListItemIcon>
                            <ListItemText color="secondary" style={{ marginBottom: 10 }}>{todo.todo_name}</ListItemText>
                            {location && (
                                <ListItemSecondaryAction>
                                    <IconButton onClick={e => handleEdit(e, todo)}>
                                        <i className="fa fa-edit" aria-hidden="true" style={{ fontSize: "20px", margin: "auto" }}></i>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="comments" onClick={e => handleDelete(e, todo.todo_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            )}
                        </ListItem>

                    );
                }) : <Typography variant="subtitle1" style={{ textAlign: "center" }}> No Todos Available </Typography>
            }

        </List>
    )
}