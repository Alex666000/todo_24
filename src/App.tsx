import './App.css'
import { Task, Todolist } from './Todolist'
import { useState } from 'react'
import { v1 } from 'uuid'

export type FilterValues = 'all' | 'completed' | 'active'

const App = () => {
  let [tasks, setTasks] = useState<Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ])

  console.log(tasks)
  const [filter, setFilter] = useState<FilterValues>('all')

  const removeTask = (taskId: string) => {
    let filteredTasks = tasks.filter((t) => t.id !== taskId)
    setTasks(filteredTasks)
  }

  const addTask = (newTaskTitle: string) => {
    const newTask = { id: v1(), title: newTaskTitle, isDone: false }
    setTasks([newTask, ...tasks])
  }

  const changeFilterTodo = (value: FilterValues) => {
    setFilter(value)
  }

  let tasksForTodolist = tasks

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.isDone)
  }
  if (filter === 'active') {
    tasksForTodolist = tasks.filter((t) => !t.isDone)
  }

  return (
    <div className="App">
      <div className="App">
        <Todolist
          title="What to learn"
          tasks={tasksForTodolist}
          onRemoveTaskClick={removeTask}
          onAddTaskClick={addTask}
          onChangeFilterClick={changeFilterTodo}
        />
      </div>
    </div>
  )
}

export default App
