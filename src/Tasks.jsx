import React, { useContext, useState } from 'react'
import useLocalStorage from './useLocalStorage';
import TaskContext from './TaskProvider';
import styles from './tasks.module.css'

const Tasks = () => {
    const [taskInput,setTaskInput]=useState('');
    const {tasks,setTasks}=useContext(TaskContext);
    const addTask = () => {
        if (taskInput.trim()) {
          const newTaskObj = {
            id: Date.now(),
            text: taskInput,
            completed: false,
          };
          
          setTasks((prevTasks) => [...prevTasks, newTaskObj]);
          setTaskInput(''); 
          console.log("task added successfully")
        }
      };

  return (
    <div className={styles.main}>
        <input placeholder='Enter Tasks' className={styles.inputbox} value={taskInput}  onChange={(e)=>setTaskInput(e.target.value)} type="text" />
        <button className={styles.button} onClick={addTask}>Add Task</button>


       
    </div>
  )
}

export default Tasks
