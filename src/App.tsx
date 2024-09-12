import './App.css'
import { Task, Todolist } from './Todolist'

const App = () => {
  const tasks1 = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ]

  const tasks2: Task[] = [
    { id: 1, title: 'Hello world', isDone: true },
    { id: 2, title: 'I am Happy', isDone: false },
  ]

  return (
    <div className="App">
      <div className="App">
        <Todolist title="What to learn" tasks={tasks1} />
        <Todolist title="Songs" tasks={tasks2} />
      </div>
    </div>
  )
}

export default App
