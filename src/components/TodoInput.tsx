// 受け取るpropsの型定義
interface TodoInputProps {
  input: string
  onInputChange: (value: string) => void  // 入力欄の変更関数
  onAddTodo: () => void                   // タスク追加関数
}

function TodoInput({ input, onInputChange, onAddTodo }: TodoInputProps) {

  // Enterキーでも追加できるようにする
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAddTodo()
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タスクを入力..."
      />
      <button onClick={onAddTodo}>追加</button>
    </div>
  )
}

export default TodoInput