import React, { useContext, useState } from 'react';
import TaskContext from './TaskProvider';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './tasklist.module.css'
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};



  

const TaskList = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [filterName, setFilterName] = useState('All');

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
  };

  const onDragEnd = (result) => {
   
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedItems = reorder(
      tasks,
      result.source.index,
      result.destination.index
    );

    setTasks(reorderedItems);
  };

  const filteredTasks =
    filterName === 'All'
      ? tasks
      : filterName === 'Pending'
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

  return (
    <div className={styles.main}>
      <div>
        <label htmlFor="filterdata">Filter Data:</label>
        <select
          name="filterdata"
          value={filterName}
          onChange={handleFilterChange}
          id="filterdata"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Tasks" type='group'>
          {(provided,snapshot) => (
            <div className={styles.parent}
              ref={provided.innerRef}
              {...provided.droppableProps}
             
            >
              {filteredTasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                     className={styles.child}
                     style={{
                        backgroundColor: task.completed ? '#d4edda' : '#ffcccc',
                      }}
                    >
                      <span>{task.text}</span>
                      <div>
                        <button onClick={() => toggleComplete(task.id)}>
                          {task.completed ? 'Complete' : 'Pending'}
                        </button>
                        <button  onClick={() => deleteTask(task.id)}>Delete</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

      </DragDropContext>
    </div>
  );
};

export default TaskList;
