import { useState } from 'react'

// 1つのTodoタスクの型定義
interface Todo {
  id: number
  text: string
  done: boolean
}

function App() {
  // タスクの一覧（Todo型の配列）
  const [todos, setTodos] = useState<Todo[]>([])
  // 入力欄の文字
  const [input, setInput] = useState<string>('')

  // タスクを追加する関数
  const addTodo = () => {
    // 入力欄が空の場合は何もしない
    if (input.trim() === '') return

    const newTodo: Todo = {
      id: Date.now(),  // 現在時刻をIDとして使う
      text: input,
      done: false,
    }
    setTodos([...todos, newTodo])
    setInput('')  // 追加したら入力欄を空にする
  }

  // タスクの完了・未完了を切り替える関数
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  // タスクを削除する関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      <h1>Todoアプリ</h1>

      {/* 入力欄 */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力..."
      />
      <button onClick={addTodo}>追加</button>

      {/* タスク一覧 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App