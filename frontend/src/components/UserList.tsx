import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getUsers, deleteUser } from '../services/userService'

export interface User {
  id: number
  name: string
  username: string
  email: string
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
      setError(null)
    } catch (err) {
      setError('Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const user = users.find(u => u.id === id)
    const userName = user ? user.name : 'this user'
    
    if (window.confirm(` Delete User\n\nAre you sure you want to delete "${userName}"?\n\n This action cannot be undone.`)) {
      try {
        await deleteUser(id)
        setUsers(users.filter(user => user.id !== id))
      } catch (err) {
        setError('Failed to delete user')
        console.error('Error deleting user:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading users...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-lg text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-gray-800"> User Management</h1>
        <div className="flex gap-3">
          <Link 
            to="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-300"
          >
            ← Back to Home
          </Link>
          <Link 
            to="/users/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Add New User
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {users.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600 mb-6">Start by adding your first user!</p>
              <Link 
                to="/users/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Add First User
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map(user => (
              <div 
                key={user.id} 
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900">
                    {user.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    @{user.username}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {user.email}
                  </p>
                </div>
                <div className="flex gap-2 justify-end">
                  <Link 
                    to={`/users/edit/${user.id}`} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default UserList