import { FilterValues } from './App'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  title: string
  filter: FilterValues
  tasks: Task[]
  onRemoveTaskClick: (taskId: string) => void
  onAddTaskClick: (newTaskTitle: string) => void
  onChangeFilterClick: (value: FilterValues) => void
  onTaskStatusChange: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({
  title,
  filter,
  tasks,
  onRemoveTaskClick,
  onAddTaskClick,
  onChangeFilterClick,
  onTaskStatusChange,
  ...rest
}: Props) => {
  // инпут сделали контролируемым
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<null | string>('')

  const changeTodoFilter = (filter: FilterValues) => onChangeFilterClick(filter)

  const addNewTask = () => {
    if (newTaskTitle.trim() !== '') {
      onAddTaskClick(newTaskTitle.trim())
      setNewTaskTitle('')
    }
    // если поле добавления таски пустое
    setError('Заголовок обязателен')
  }

  const onAddNewTaskTitleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
          className={error ? 'error' : ''}
        />
        <button onClick={addNewTask}>+</button>
        {error && <div className={'error-message'}>Поле обязательно</div>}
      </div>
      <ul>
        {tasks.map((t) => {
          const removeTaskTodo = () => onRemoveTaskClick(t.id)

          const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            const checkedNewTaskStatus = e.currentTarget.checked
            onTaskStatusChange(t.id, checkedNewTaskStatus)
          }

          return (
            <li key={t.id}>
              <input
                className={t.isDone ? 'is-done' : ''}
                type="checkbox"
                checked={t.isDone}
                onChange={changeTaskStatus}
              />
              <span>{t.title}</span>
              <button onClick={removeTaskTodo}>X</button>
            </li>
          )
        })}
      </ul>
      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeTodoFilter('all')}>
          All
        </button>
        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeTodoFilter('active')}>
          Active
        </button>
        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeTodoFilter('completed')}>
          Completed
        </button>
      </div>
    </div>
  )
}
