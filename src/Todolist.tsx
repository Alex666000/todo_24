import { FilterValues } from './App'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

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

  const changeTodoFilter = (filter: FilterValues) => onChangeFilterClick(filter)

  const addNewTask = () => {
    onAddTaskClick(newTaskTitle)
    setNewTaskTitle('')
  }

  const onAddNewTaskTitleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddTaskClick(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const onTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTaskTitle(e.currentTarget.value)

  return (
    <div {...rest}>
      <h3>{title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onTaskTitleChange}
          onKeyDown={onAddNewTaskTitleEnter}
        />
        <button onClick={addNewTask}>+</button>
      </div>
      <ul>
        {tasks.map((t) => {
          const removeTaskTodo = () => onRemoveTaskClick(t.id)

          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} />
              <span>{t.title}</span>
              <button onClick={removeTaskTodo}>X</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button onClick={() => changeTodoFilter('all')}>All</button>
        <button onClick={() => changeTodoFilter('active')}>Active</button>
        <button onClick={() => changeTodoFilter('completed')}>Completed</button>
      </div>
    </div>
  )
}
