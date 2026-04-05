// 受け取るpropsの型定義
interface TodoItemProps {
  id: number
  text: string
  done: boolean
  onToggle: (id: number) => void  // 完了切り替え関数
  onDelete: (id: number) => void  // 削除関数
}

function TodoItem({ id, text, done, onToggle, onDelete }: TodoItemProps) {
  return (
    <li>
      <span
        onClick={() => onToggle(id)}
        style={{ textDecoration: done ? 'line-through' : 'none' }}
      >
        {text}
      </span>
      <button onClick={() => onDelete(id)}>削除</button>
    </li>
  )
}

export default TodoItem