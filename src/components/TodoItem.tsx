interface TodoItemProps {
  id: number
  text: string
  done: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TodoItem({ id, text, done, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
      />
      <span
        style={{ textDecoration: done ? 'line-through' : 'none' }}
      >
        {text}
      </span>
      <button onClick={() => onDelete(id)}>削除</button>
    </li>
  )
}

export default TodoItem