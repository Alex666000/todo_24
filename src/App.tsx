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
  // храним значение фильтра тут и его надо в дочке изменять поэтому changeFilterTodo будет принимать: value
  const [filter, setFilter] = useState<FilterValues>('all')

  // функции меняющие данные (useState) создаем там где и данные и прокидываем вниз данные: колбеки и параметры их
  const removeTask = (taskId: number) => {
    // отфильтрованный новый массив tasks
    let filteredTasks = tasks.filter((t) => t.id !== taskId)
    // всё что бы не делали всегда "сетаем" - чтобы данные изменились и разметка подстроилась под данные (произошла автоматически "перерисовка")
    setTasks(filteredTasks)
  }

  // функции меняющие данные (useState) создаем там где и данные
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
          onChangeFilterClick={changeFilterTodo}
        />
      </div>
    </div>
  )
}

export default App
// делаем разметку - делаем данные - делаем разметку зависимоиот этих данных чтобы меняя данные разметка тоже менялась
// меняем данные руками сначала "инишлстеит" видим что разметка реагирует потом меняем не руками
// а при нажатии на кнопки

// Итог видео 2: 1.19.00 мин
