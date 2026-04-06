import { useState, useEffect } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  // localStorageから初期値を読み込む
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  })
  const [input, setInput] = useState<string>('')


  // todosが変わるたびにlocalStorageに保存する
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

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