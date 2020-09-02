import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase'
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('');

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed

 useEffect(() => {
 //this code here... fires when the app.js loads
  db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    setTodos(snapshot.docs.map(doc => ({id: doc.id ,todo: doc.data().todo})))
  })
 }, [])

  const appTodo = (event) =>{
    //This will fire of when we click the button
    event.preventDefault();// will stop the refresh
    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');//clear up the input after hitting submit
  }
  return (
    <div className="App">
      <h1>ToDo App</h1>
      <form className = {classes.root}>
      <TextField id="outlined-search" label="Enter a todo" type="input" variant="outlined" value={input}
      onChange={event => setInput(event.target.value)} size="small"/>
      <Button 
        disabled = {!input}
        variant="contained" 
        color="primary"
        type = "submit" 
        onClick = {appTodo}
        size = "large"
        >
        Add Todo
        </Button>
      </form>
      <ul >
        {todos.map(todo =>
          (<Todo todo = {todo}/>)
        )}
      </ul>
    </div>
  );
}

export default App;
