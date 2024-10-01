import { useEffect, useState } from 'react'
import '../assets/App.css'
import Calander from './Calander';
import Input from './Input';
import Tasks from './Tasks';
import axios from "axios";
function App() {
const [task,setTask]=useState([])
useEffect(()=>{
  const fetchTask=async()=>{
    try{
      const response=await axios.get(`http://localhost:3000/todos`);
      setTask(response.data);
    }catch(e){
      console.log(`error fetching todos ${e}`);
    }
  };
  fetchTask();
},[]);

async function add(task) {
  if (!task) {
    console.error("Task cannot be empty.");
    return; 
  } 
  try {
    const response = await axios.post(`http://localhost:3000/add`, { task });
    const result = response.data; 
    console.log(result);
    setTask((prev) => [...prev, result]);
   
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

async function del(id){
  setTask(prev=>prev.filter(task=>id!==task.id))
  await axios.delete(`http://localhost:3000/delete/${id}`)

}

async function onToggle(id,status){
  setTask((prev)=>{
    return prev.map((task)=>{
      return task.id===id?{...task,completed:!status}:task;
    })
  })
await axios.patch(`http://localhost:3000/status/${id}`,{status})

}
  return (
 <div >
      <Calander />
      <div className="container">
        <h1>To Do List</h1>
  <div className="task-area">
    <Input 
    add={add}
    />
    <ul>
   { task.map((i)=>{return(
        <li><Tasks
        key={i.id}
        id={i.id}
        name={i.task}
        status={i.completed}
        onToggle={onToggle}
        deleteTask={del}
        /></li>)
    })}
    </ul>
    </div>
   </div>
   </div>
  )
}


export default App
