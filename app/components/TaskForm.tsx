'use client'

import { useState } from 'react'

export default function TaskForm({ onTaskAdded }: { onTaskAdded?: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('To Do')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formattedDueDate = dueDate ? new Date(dueDate).toISOString() : null

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, status, dueDate: formattedDueDate }),
    })
    
    if (response.ok) {
      setTitle('')
      setDescription('')
      setStatus('To Do')
      setDueDate('')
      if (onTaskAdded) onTaskAdded()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="apple-input"
          placeholder="Enter task title"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="apple-input min-h-[100px]"
          placeholder="Enter task description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="apple-select"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="apple-input"
          />
        </div>
      </div>
      <button type="submit" className="apple-button w-full">
        Add Task
      </button>
    </form>
  )
}

