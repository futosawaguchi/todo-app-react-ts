import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

// Todo型をここで定義してexportする（各コンポーネントから使えるようにする）
export interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState<string>('')

  const addTodo = () => {
    if (input.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      done: false,
    }
    setTodos([...todos, newTodo])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>Todoアプリ</h1>
      <TodoInput
        input={input}
        onInputChange={setInput}
        onAddTodo={addTodo}
      />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
}

export default App