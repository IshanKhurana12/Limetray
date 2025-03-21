import React, { createContext, useContext, useEffect, useState } from 'react'

import useLocalStorage from './useLocalStorage';

const TaskContext=createContext();

export const TaskProvider = ({children}) => {

  const [tasks,setTasks]=useLocalStorage('tasks',[]);
 

  return (
    <TaskContext.Provider value={{tasks,setTasks}}>
      {children}
    </TaskContext.Provider>
  )
}

export default TaskContext
