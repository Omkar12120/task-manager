
import React from 'react'
import { useState } from 'react'
import './AddTask.css'
import 'remixicon/fonts/remixicon.css'
import { CiFilter } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCalendarClearOutline } from "react-icons/io5";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet"></link>
import { GoTasklist } from "react-icons/go";
const AddTask = () => {
  const [status , setStatus] = useState('all')
  const [task , setTask] = useState([])
  const [formData , setFormData] = useState({
    title : '',
    desc : '',
    dueDate : ''
  })
  const [show , setShow] = useState(false)
  const handleShow = ()=>{
    setShow(true)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    const newTask = {
      id:Date.now(),
      title:formData.title,
      desc:formData.desc,
      dueDate:formData.dueDate,
      status:"not started"
    }
    setTask([...task , newTask])
    setFormData({
      title:'',
      desc:'',
      dueDate:''
    })
    setShow(false)
  }

  const HandleDelete = (id)=>{
    const newTask = task.filter((t)=> t.id !==id)
    setTask(newTask)
  }

  const filterTask = 
  status === 'all' ? task : task.filter((t) => t.status === status)

  const handleStatus = (id)=>{
    const newtask = task.map((t)=>{
      if(t.id === id){
        let newStatus = " "
        if(t.status === "not started"){
          newStatus="in progress"
        }
        else if(t.status === "in progress"){
          newStatus="completed"
        }
        else if(t.status ==="completed"){
          newStatus="done"
        }
        return{...t , status: newStatus}
      }
      return t
    })
    setTask(newtask)
  }
  return (
    <div id='container'>
      <div id="nav">
        <div id='nav-top'>
        <i><GoTasklist /></i>
          <div>
            <h1>Task Manager</h1>
            <p>Organize and track your tasks efficiently</p>
          </div>
        </div>
        {! show && <button id='add-task' onClick={handleShow}>  <i class="ri-add-large-fill"></i> Add new task</button>}
        <div id='form-wrapper'>
        {show && 
        <form onSubmit={handleSubmit}
        id='form'
        className={show ? "active" : ""} 
        >
          <input 
          type="text"
          placeholder='Task Title*'
          value={formData.title}
          onChange={(e)=> setFormData({...formData , title: e.target.value})}
          required
          id='title'
           />
          <input 
          type="text"
          placeholder='Task Description (Optional)'
          value={formData.desc}
          onChange={(e)=> setFormData({...formData , desc: e.target.value})}
          id='desc'
           />
          <input 
          type="Date"
          placeholder='Task Description (Optional)'
          value={formData.dueDate}
          onChange={(e)=> setFormData({...formData , dueDate: e.target.value})}
          required
          id='date'
           />
          <div id="button">
            <button type='Submit' id='submit' >Add Task</button>
            <button onClick={()=> setShow(false)} id='cancel'>Cancel</button>
          </div>
        </form>
        }
        </div>
      </div>
      

      <div id='status'>
        <div id='filter'><p> <i><CiFilter /></i>Filter by status:</p></div>
        <div>
        <button onClick={() => setStatus("all")}className={status === "all" ? "active-btn-all" : ""} id='all'>All({task.length})</button>
          <button onClick={() => setStatus("not started")}className={status === "not started" ? "active-btn-not" : ""} id='not' >Not started({task.filter(t => t.status === "not started").length})</button>
          <button onClick={() => setStatus("in progress")}className={status === "in progress" ? "active-btn-in" : ""} id='in'>In progress({task.filter(t => t.status === "in progress").length})</button>
          <button onClick={() => setStatus("completed")}className={status === "completed" ? "active-btn-comp" : ""} id='comp'>Completed({task.filter(t => t.status === "completed").length})</button>
          <button onClick={() => setStatus("done")}className={status === "done" ? "active-btn-done" : ""} id='done'>Done({task.filter(t => t.status === "done").length})</button>
        </div>
      </div>
      {filterTask.map((t)=>(
        
        <div id='task-show'>
          <div>
          <h3>{t.title}</h3>
          <p className='tDesc'>{t.desc}</p>
          <div id='box-end'>
            <button onClick={()=> handleStatus(t.id)} id='bStatus' className={`status-btn ${t.status.replace(/ /g, "-")}`} disabled={t.status === "done"}>{t.status}</button>
            <p id='due'><i><IoCalendarClearOutline /></i>{t.dueDate}</p>
          </div>
          </div>
          <div id='delete'>
          <button onClick={() => HandleDelete(t.id)}className='delete'><i><RiDeleteBin6Line /></i></button>
          </div>
        </div>
      ))}
      {filterTask.length === 0 &&(
        <div id='empty'>
          <i><GoTasklist /></i>
          <h3>No task found</h3>
          <p>No task with the status "{status}"</p>
        </div>
      )}
      <div id='stats'>
        <div className='stat-card'>
          <h3>{task.length}</h3>
          <p>Total task</p>
        </div>
        <div className='stat-card'>
          <h3 id='stat-not-started'>{task.filter(t => t.status === "not started").length}</h3>
          <p>Not started</p>
        </div>
        <div className='stat-card'>
          <h3 id='stat-progress'>{task.filter(t => t.status === "in progress").length}</h3>
          <p>In progress</p>
        </div>
        <div className='stat-card'>
          <h3 id='stat-completed'>{task.filter(t => t.status === "completed").length}</h3>
          <p>Completed</p>
        </div>
        <div className='stat-card'>
          <h3 id='stat-done'>{task.filter(t => t.status === "done").length}</h3>
          <p>Done</p>
        </div>
      </div>
    </div>
  )
}

export default AddTask
