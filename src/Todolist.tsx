import { FilterValues } from './App'
import { useState } from 'react'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  title: string
  tasks: Task[]
  onRemoveTaskClick: (taskId: string) => void
  onAddTaskClick: (newTaskTitle: string) => void
  onChangeFilterClick: (value: FilterValues) => void
}

export const Todolist = ({
  title,
  tasks,
  onRemoveTaskClick,
  onAddTaskClick,
  onChangeFilterClick,
  ...rest
}: Props) => {
  // инпут сделали контролируемым
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const removeTaskFromTodo = (taskId: string) => onRemoveTaskClick(taskId)

  const changeTodoFilter = (filter: FilterValues) => onChangeFilterClick(filter)

  const addNewTaskTitle = () => {
    onAddTaskClick(newTaskTitle)
    setNewTaskTitle('')
  }

  const onAddNewTaskTitleEnter = (e) => {
    if (e.key === 'Enter') {
      onAddTaskClick(newTaskTitle)
      setNewTaskTitle('')
    }
  }

  return (
    <div {...rest}>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.currentTarget.value)}
          onKeyDown={onAddNewTaskTitleEnter}
        />
        <button onClick={addNewTaskTitle}>+</button>
      </div>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={() => removeTaskFromTodo(t.id)}>X</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => changeTodoFilter('all')}>All</button>
        <button onClick={() => changeTodoFilter('active')}>Active</button>
        <button onClick={() => changeTodoFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
