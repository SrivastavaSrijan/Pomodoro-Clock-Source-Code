import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Task } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = useCallback((text: string) => {
    if (!text.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text: text.trim(), done: false },
    ]);
  }, [setTasks]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, [setTasks]);

  return { tasks, addTask, toggleTask, deleteTask };
}
