'use client'

import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleTasksChange = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Task Manager</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="task-card">
            <h2 className="text-2xl font-semibold mb-6">Add New Task</h2>
            <TaskForm onTaskAdded={handleTasksChange} />
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Task List</h2>
            <TaskList key={refreshKey} onTasksChange={handleTasksChange} />
          </div>
        </div>
      </div>
    </main>
  )
}

