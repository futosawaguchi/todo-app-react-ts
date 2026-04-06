interface TodoItemProps {
  id: number
  text: string
  done: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TodoItem({ id, text, done, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-none">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
        className="w-5 h-5 accent-violet-500 cursor-pointer"
      />
      <span
        className={`flex-1 text-gray-700 transition-all ${done ? 'line-through text-gray-300' : ''}`}
      >
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer text-sm"
      >
        削除
      </button>
    </li>
  )
}

export default TodoItem