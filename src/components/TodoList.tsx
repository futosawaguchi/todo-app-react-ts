import type { Todo } from '../App'
import TodoItem from './TodoItem'

// Todoの型定義（App.tsxと同じもの）
// interface Todo {
//   id: number
//   text: string
//   done: boolean
// }

// 受け取るpropsの型定義
interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList