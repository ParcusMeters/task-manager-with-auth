'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  description: string
  status: string
  dueDate: string | null
}

export default function TaskList({ onTasksChange }: { onTasksChange?: () => void }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: ''
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks')
    if (response.ok) {
      const data = await response.json()
      setTasks(data)
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    if (response.ok) {
      setTasks(tasks.filter(task => task.id !== id))
      if (onTasksChange) onTasksChange()
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (response.ok) {
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
      if (onTasksChange) onTasksChange()
    }
  }

  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setEditForm({
      title: task.title,
      description: task.description || '',
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    })
  }

  const handleEdit = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...editForm,
        dueDate: editForm.dueDate ? new Date(editForm.dueDate).toISOString() : null
      }),
    })
    if (response.ok) {
      const updatedTask = await response.json()
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
      setEditingTask(null)
      if (onTasksChange) onTasksChange()
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="task-card">
          {editingTask === task.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="apple-input"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="apple-input"
              />
              <input
                type="date"
                value={editForm.dueDate}
                onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                className="apple-input"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(task.id)}
                  className="apple-button flex-1"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="apple-button flex-1 !bg-gray-200 !text-black dark:!bg-gray-800 dark:!text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  className="apple-select text-sm w-32"
                >
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                {task.dueDate && (
                  <span className="text-sm text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

