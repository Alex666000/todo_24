export type Task = {
  id: number
  title: string
  isDone: boolean
}

type Props = {
  title: string
  tasks: Task[]
}

export const Todolist = ({ title, tasks }: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <ul>
        {tasks.map((t) => (
          <li>
            <input type="checkbox" checked={t.isDone} />
            <span>{t.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
