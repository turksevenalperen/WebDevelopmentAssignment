import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost } from '../services/postService'
import { getUsers } from '../services/userService'
import type { User } from './UserList'

export interface Post {
  id: number
  userId: number
  title: string
  body?: string
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getPosts(),
        getUsers()
      ])
      setPosts(fetchedPosts)
      setUsers(fetchedUsers)
      setError(null)
    } catch (err) {
      setError('Failed to fetch data')
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    const post = posts.find(p => p.id === id)
    const postTitle = post ? post.title : 'this post'
    
    if (window.confirm(`🗑️ Delete Post\n\nAre you sure you want to delete "${postTitle}"?\n\n⚠️ This action cannot be undone.`)) {
      try {
        await deletePost(id)
        setPosts(posts.filter(post => post.id !== id))
      } catch (err) {
        setError('Failed to delete post')
        console.error('Error deleting post:', err)
      }
    }
  }

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId)
    return user ? user.name : 'Unknown User'
  }

  const filteredPosts = selectedUserId 
    ? posts.filter(post => post.userId === selectedUserId)
    : posts

  if (loading) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading posts...</p>
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
              onClick={fetchData}
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
        <h1 className="text-3xl font-bold text-gray-900"> Post Management</h1>
        <div className="flex gap-3">
          <Link 
            to="/" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors border border-gray-300"
          >
            ← Back to Home
          </Link>
          <Link 
            to="/posts/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Add New Post
          </Link>
        </div>
      </header>

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="text-sm font-medium text-gray-700">
            Filter by Author:
          </label>
          <select
            value={selectedUserId || ''}
            onChange={(e) => setSelectedUserId(e.target.value ? Number(e.target.value) : null)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Authors</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">
            Showing {filteredPosts.length} of {posts.length} posts
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm border">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedUserId ? 'No posts found for this author' : 'No posts found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedUserId ? 'Try selecting a different author or create a new post.' : 'Start by adding your first post!'}
              </p>
              <Link 
                to="/posts/create" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
              >
                Add First Post
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map(post => (
              <div 
                key={post.id} 
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      ID: {post.id}
                    </span>
                    <span className="text-xs text-gray-500">
                      by {getUserName(post.userId)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  {post.body && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {post.body}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 justify-end pt-4 border-t">
                  <Link 
                    to={`/posts/edit/${post.id}`} 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-sm transition-colors"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(post.id)}
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

export default PostList