import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'

function App() {
  const [todos,setTodo] = useState([]);
  const [task,setTask] = useState('');
  const [id,setId] = useState('')
  const [specific,setSpecific] = useState([])
  const [update,setUpdate] = useState([])
  const [status,setStatus] = useState('')
  const [deletee,setDelete] = useState('')
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

  const getSpecific = () =>{
    axios.get(`http://localhost:3000/todos/${id}`).then(res=>setSpecific(res.data))
  };

  const updateStatus = () => {
    axios.put(`http://localhost:3000/todos/${update}`,{status}).then(()=>{
      setUpdate('');
      setStatus('')
      fetchTodo();
    })
  }

  const deletetodo = () => {
    axios.delete(`http://localhost:3000/todos/${deletee}`).then(()=>{
      setDelete('');
      fetchTodo();
    })
  }

  return(
  <div>
    <h1>TO-DO LIST</h1>
    <label htmlFor='task' >Task : </label>
    <input id='task' value={task} onChange={(e)=> setTask(e.target.value)} placeholder='Enter a Task' /><br /> <br />
    <button onClick={addTodo}>Add task</button>
    <h2>Get specific To-Do using ID</h2>

    <input value={id} onChange={(e)=>setId(e.target.value)} />
    <button onClick={getSpecific}>Get todo</button>
    <h3>{specific.map(specifics=>(
      <li key={specifics.id}>id:{specifics.id}   Task: {specifics.task}    Status: {specifics.status}</li>
    ))}</h3>
    <h2>Update status using id</h2>
    <label htmlFor='val' >ID : </label>
    <input value={update} id='val' onChange={(e)=>setUpdate(e.target.value)} /><br /> <br />
     <label htmlFor='sta' >Status : </label>
    <input value={status} id='sta' onChange={(e)=>setStatus(e.target.value)} /><br /> <br />
    <button onClick={updateStatus}>Update</button>
    <h2>Delete todo using id</h2>
    <label htmlFor='del-id' >ID : </label>
    <input value={deletee} id='del-id' onChange={(e)=>setDelete(e.target.value)} /><br /> <br />
    <button onClick={deletetodo}>Delete</button>
    <h1>TO-DO list</h1>
    <ul>
      {todos.map(todo =>(
        <li key={todo.id}>id:{todo.id}   Task: {todo.task}    Status: {todo.status}</li>
      ))}
    </ul>
  </div>
  )
  
}

export default App
