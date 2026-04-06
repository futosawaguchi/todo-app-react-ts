import type { Todo } from '../App'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul>
      {todos.length === 0 ? (
        <p className="text-center text-gray-300 py-8">タスクがありません</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            done={todo.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </ul>
  )
}

export default TodoList