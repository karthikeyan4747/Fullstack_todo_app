import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

function App() {
  const [todos,setTodo] = useState([]);
  const [task,setTask] = useState('');

  const fetchTodo = () =>{
    axios.get('http://localhost:3000/todos').then(res => setTodo(res.data))
  };

  useEffect(()=>{
    fetchTodo();
  },[]);

  const addTodo = () => {
    axios.post('http://localhost:3000/todos',{task,status:'pending'}).then(()=>{
      setTask('');
      fetchTodo();
    });
  };

  return(
  <div>
    <h1>TO-DO LIST</h1>
    <label htmlFor='task' >Task : </label>
    <input id='task' value={task} onChange={(e)=> setTask(e.target.value)} placeholder='Enter a Task' /><br /> <br />
    <button onClick={addTodo}>Add task</button>
    <ul>
      {todos.map(todo =>(
        <li key={todo.id}>Task: {todo.task}    Status: {todo.status}</li>
      ))}
    </ul>
  </div>
  )

  
  
}

export default App
