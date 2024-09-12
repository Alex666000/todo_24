import { FilterValues } from './App'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

type Props = {
  title: string
  tasks: Task[]
  onRemoveTaskClick: (taskId: number) => void
  onChangeFilterClick: (value: FilterValues) => void
}

export const Todolist = ({
  title,
  tasks,
  onRemoveTaskClick,
  onChangeFilterClick,
  ...rest
}: Props) => {
  const handleRemoveTask = (taskId: number) => onRemoveTaskClick(taskId)

  const changeTodoFilter = (filter: FilterValues) => onChangeFilterClick(filter)

  return (
    <div {...rest}>
      <h3>{title}</h3>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
            <button onClick={() => handleRemoveTask(t.id)}>X</button>
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
