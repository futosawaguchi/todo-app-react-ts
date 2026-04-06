import { useState, useEffect, useMemo } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export interface Todo {
  id: number
  text: string
  done: boolean
}

// フィルターの型定義
type FilterType = 'all' | 'active' | 'done'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      return JSON.parse(saved)
    }
    return []
  })
  const [input, setInput] = useState<string>('')
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // フィルタリングされたタスク一覧
  const filteredTodos = useMemo(() => {
    if (filter === 'all') return todos
    if (filter === 'active') return todos.filter((t) => !t.done)
    if (filter === 'done') return todos.filter((t) => t.done)
    return todos
  }, [todos, filter])

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

      {/* フィルターボタン */}
      <div>
        <button
          onClick={() => setFilter('all')}
          style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
        >
          すべて
        </button>
        <button
          onClick={() => setFilter('active')}
          style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
        >
          未完了
        </button>
        <button
          onClick={() => setFilter('done')}
          style={{ fontWeight: filter === 'done' ? 'bold' : 'normal' }}
        >
          完了済み
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
}

export default App