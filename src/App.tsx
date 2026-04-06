import { useState, useEffect, useMemo } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export interface Todo {
  id: number
  text: string
  done: boolean
}

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

  const filters: { label: string; value: FilterType }[] = [
    { label: 'すべて', value: 'all' },
    { label: '未完了', value: 'active' },
    { label: '完了済み', value: 'done' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-blue-50 py-12 px-4">
      <div className="max-w-lg mx-auto">

        {/* タイトル */}
        <h1 className="text-4xl font-bold text-center text-violet-600 mb-8">
          Todo App
        </h1>

        {/* カード */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          {/* 入力欄 */}
          <TodoInput
            input={input}
            onInputChange={setInput}
            onAddTodo={addTodo}
          />

          {/* フィルターボタン */}
          <div className="flex gap-2 mt-6 mb-4">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${filter === f.value
                    ? 'bg-violet-500 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* タスク一覧 */}
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />

          {/* タスク数の表示 */}
          <p className="text-sm text-gray-400 text-right mt-4">
            {todos.filter((t) => !t.done).length} 件の未完了タスク
          </p>
        </div>
      </div>
    </div>
  )
}

export default App