import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createUser, updateUser, getUserById } from '../services/userService'

const UserForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(isEdit)

  const fetchUser = useCallback(async () => {
    if (!id) return
    
    try {
      setInitialLoading(true)
      const user = await getUserById(Number(id))
      setFormData({
        name: user.name,
        username: user.username,
        email: user.email
      })
    } catch (err) {
      setError('Failed to fetch user')
      console.error('Error fetching user:', err)
    } finally {
      setInitialLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEdit) {
      fetchUser()
    }
  }, [isEdit, fetchUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const userData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim()
      }

      if (isEdit && id) {
        await updateUser(Number(id), userData)
      } else {
        await createUser(userData)
      }

      navigate('/users')
    } catch (err) {
      setError(isEdit ? 'Failed to update user' : 'Failed to create user')
      console.error('Error saving user:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isFormValid = formData.name.trim() && 
                     formData.username.trim() && 
                     formData.email.trim() && 
                     isValidEmail(formData.email)

  if (initialLoading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading user...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? ' Edit User' : '👤 Create New User'}
        </h1>
        <Link 
          to="/users" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-300"
        >
          ← Back to Users
        </Link>
      </header>

      <main className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="Enter full name..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Enter the user's complete name</span>
                <span>{formData.name.length}/100</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username *
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                maxLength={50}
                placeholder="Enter username..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Unique identifier for the user</span>
                <span>{formData.username.length}/50</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={100}
                placeholder="Enter email address..."
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                  formData.email && !isValidEmail(formData.email)
                    ? 'border-red-300 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-indigo-500'
                }`}
              />
              <div className="flex justify-between text-xs mt-1">
                <span className={formData.email && !isValidEmail(formData.email) ? 'text-red-500' : 'text-gray-500'}>
                  {formData.email && !isValidEmail(formData.email) 
                    ? 'Please enter a valid email address'
                    : 'User\'s contact email address'
                  }
                </span>
                <span className="text-gray-500">{formData.email.length}/100</span>
              </div>
            </div>

            {/* Preview Section */}
            {(formData.name || formData.username || formData.email) && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Preview</h4>
                <div className="bg-white rounded-lg p-4 border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {formData.name || 'Full Name'}
                  </h3>
                  <p className="text-indigo-600 font-medium mb-2">
                    @{formData.username || 'username'}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {formData.email || 'email@example.com'}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  isEdit ? 'Update User' : 'Create User'
                )}
              </button>
              <Link
                to="/users"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

       
        
      </main>
    </div>
  )
}

export default UserForm