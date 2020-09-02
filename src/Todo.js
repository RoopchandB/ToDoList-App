import React, { useState } from 'react'
import './Todo.css'
import db from './firebase'
import {List, ListItem, ListItemText, Dialog, DialogActions, DialogTitle, Button, ListItemAvatar, ListItemSecondaryAction} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const style = {
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
};

const useStyles = makeStyles((theme) => ({

    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
      },
}));

function generate(element) {
    return [0].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [dense, setDense] = useState(false);

    const updateTodo = (event) => {
        //update the todo with the new input text
        event.preventDefault();
        db.collection('todos').doc(props.todo.id).set({
            todo : input
        }, { merge : true })
        setOpen(false)
    }
    
    return (
        <div>
        <Dialog
            open={open}
            onClose={e => setOpen(false)}
            color = 'primary'
        >
         <div className = "dialog_box">
            <DialogTitle>
            Update
            </DialogTitle>
            <input className = "update_input" placeholder = {props.todo.todo} value = {input} onChange = {event => setInput(event.target.value)}/>
         </div>
            <DialogActions>
            <Button
            disabled = {!input} 
            variant="contained"
            color="primary"
            size="small"
            type = "submit"
            className={classes.button}
            startIcon={<SaveIcon />}
            onClick={updateTodo}
          >
            Save
          </Button>
            </DialogActions>
          
        </Dialog>
        <div className={classes.demo}>
            <List dense={dense}>
              {generate(
                <ListItem>
                  <ListItemAvatar>
                  <ListAltOutlinedIcon/>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={props.todo.todo}
                    secondary='Todo'
                  />
                  <ListItemSecondaryAction>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                        fontSize="large" 
                        onClick = {event => db.collection('todos').doc(props.todo.id).delete()}
                    >
                        Delete
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              )}
              <Button style={style} onClick = {e => setOpen(true)} color="primary" variant="contained">Edit</Button>
            </List>
        </div>
        </div>
    )
}

export default Todo
