import { useState } from 'react'
import { TaskProvider } from './TaskProvider'
import './App.css'
import Tasks from './Tasks'
import TaskList from './TaskList'
import Mode from './Mode'

function App() {
  const [count, setCount] = useState(0)

  return (
   
   <TaskProvider>
    <div className='maincontainer'>
    <Mode />
<Tasks />
<TaskList/>
    </div>

    </TaskProvider>
  )
}

export default App
