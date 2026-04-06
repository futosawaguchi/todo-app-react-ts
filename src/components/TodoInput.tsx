interface TodoInputProps {
  input: string
  onInputChange: (value: string) => void
  onAddTodo: () => void
}

function TodoInput({ input, onInputChange, onAddTodo }: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAddTodo()
  }

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="タスクを入力..."
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all placeholder-gray-300"
      />
      <button
        onClick={onAddTodo}
        className="px-5 py-3 bg-violet-500 text-white rounded-xl font-medium hover:bg-violet-600 transition-colors cursor-pointer"
      >
        追加
      </button>
    </div>
  )
}

export default TodoInput