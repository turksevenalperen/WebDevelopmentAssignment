
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createPost, updatePost, getPostById } from '../services/postService'
import { getUsers } from '../services/userService'
import type { User } from './UserList'


const PostForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: 1
  })
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(isEdit)

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await getUsers()
      setUsers(fetchedUsers)
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  const fetchPost = useCallback(async () => {
    if (!id) return
    
    try {
      setInitialLoading(true)
      const post = await getPostById(Number(id))
      setFormData({
        title: post.title,
        body: post.body || '',
        userId: post.userId
      })
    } catch (err) {
      setError('Failed to fetch post')
      console.error('Error fetching post:', err)
    } finally {
      setInitialLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchUsers()
    if (isEdit) {
      fetchPost()
    }
  }, [isEdit, fetchPost])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const postData = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: formData.userId
      }

      if (isEdit && id) {
        await updatePost(Number(id), postData)
      } else {
        await createPost(postData)
      }

      navigate('/posts')
    } catch (err) {
      setError(isEdit ? 'Failed to update post' : 'Failed to create post')
      console.error('Error saving post:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'userId' ? Number(value) : value
    }))
  }

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : 'Unknown User'
  }

  if (initialLoading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Post' : ' Create New Post'}
        </h1>
        <Link 
          to="/posts" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-300"
        >
          ← Back to Posts
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
                Author *
              </label>
              <select
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} (@{user.username})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Selected: {getUserName(formData.userId)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={200}
                placeholder="Enter post title..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>A compelling title for your post</span>
                <span>{formData.title.length}/200</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={8}
                maxLength={250}
                placeholder="Write your post content here..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Optional: Add detailed content for your post</span>
                <span>{formData.body.length}/250</span>
              </div>
            </div>

          
            {(formData.title || formData.body) && (
              <div className="bg-gray-50 rounded-lg p-4 border">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Preview</h4>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      Preview
                    </span>
                    <span className="text-xs text-gray-500">
                      by {getUserName(formData.userId)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {formData.title || 'Untitled Post'}
                  </h3>
                  {formData.body && (
                    <p className="text-gray-600 text-sm">
                      {formData.body}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading || !formData.title.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {isEdit ? 'Updating...' : 'Creating...'}
                  </span>
                ) : (
                  isEdit ? 'Update Post' : 'Create Post'
                )}
              </button>
              <Link
                to="/posts"
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

export default PostForm