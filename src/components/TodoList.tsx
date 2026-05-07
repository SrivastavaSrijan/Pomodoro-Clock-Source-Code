import { useState, type KeyboardEvent } from 'react';
import { Plus, Check, Circle, Trash2 } from 'lucide-react';
import type { Task, ThemeColors } from '../types';

interface TodoListProps {
  tasks: Task[];
  theme: ThemeColors;
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ tasks, theme, onAdd, onToggle, onDelete }: TodoListProps) {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <div className="todo-list">
      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What plans today?"
          className="todo-input"
          style={{ color: theme.text, borderColor: theme.muted }}
        />
        <button
          className="todo-add-btn"
          onClick={handleAdd}
          style={{ color: theme.text }}
          title="Add task"
        >
          <Plus size={20} />
        </button>
      </div>

      <ul className="todo-items">
        {tasks.map(task => (
          <li key={task.id} className={`todo-item ${task.done ? 'done' : ''}`}>
            <button
              className="todo-check"
              onClick={() => onToggle(task.id)}
              style={{ color: theme.text }}
              title={task.done ? 'Mark incomplete' : 'Mark complete'}
            >
              {task.done ? <Check size={18} /> : <Circle size={18} />}
            </button>
            <span
              className="todo-text"
              style={{
                color: theme.text,
                textDecoration: task.done ? 'line-through' : 'none',
                opacity: task.done ? 0.5 : 1,
              }}
            >
              {task.text}
            </span>
            <button
              className="todo-delete"
              onClick={() => onDelete(task.id)}
              style={{ color: theme.text }}
              title="Delete task"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
