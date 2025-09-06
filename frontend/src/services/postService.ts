import { apiGet, apiPost, apiPut, apiDelete } from './api'
import { getUserById } from './userService'
import type { Post } from '../components/PostList'

export interface CreatePostData {
  title: string
  body?: string
  userId: number
}

export interface UpdatePostData extends CreatePostData {
  id?: number
}


export const getPosts = async (): Promise<Post[]> => {
  try {
    const posts = await apiGet<Post[]>('/posts')
    return posts.sort((a, b) => b.id - a.id) 
  } catch (error) {
    console.error('Error fetching posts:', error)
    throw new Error('Failed to fetch posts')
  }
}


export const getPostsByUserId = async (userId: number): Promise<Post[]> => {
  try {
    const posts = await apiGet<Post[]>(`/users/${userId}/posts`)
    return posts.sort((a, b) => b.id - a.id)
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
    throw new Error(`Failed to fetch posts for user ${userId}`)
  }
}


export const getPostById = async (id: number): Promise<Post> => {
  try {
    const post = await apiGet<Post>(`/posts/${id}`)
    return post
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error)
    throw new Error(`Post with ID ${id} not found`)
  }
}


export const createPost = async (postData: CreatePostData): Promise<Post> => {
  try {
    const newPost = await apiPost<CreatePostData, Post>('/posts', postData)
    return newPost
  } catch (error) {
    console.error('Error creating post:', error)
    throw new Error('Failed to create post')
  }
}


export const updatePost = async (id: number, postData: UpdatePostData): Promise<Post> => {
  try {
    const updatedPost = await apiPut<UpdatePostData, Post>(`/posts/${id}`, {
      id,
      ...postData
    })
    return updatedPost
  } catch (error) {
    console.error(`Error updating post ${id}:`, error)
    throw new Error('Failed to update post')
  }
}

export const deletePost = async (id: number): Promise<boolean> => {
  try {
    await apiDelete(`/posts/${id}`)
    return true
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error)
    throw new Error('Failed to delete post')
  }
}


export const getUserName = async (userId: number): Promise<string> => {
  try {
    const user = await getUserById(userId)
    return user.name
  } catch (error) {
    console.error(`Error fetching user name for ID ${userId}:`, error)
    return `Unknown User (${userId})`
  }
}


export const searchPosts = async (query: string): Promise<Post[]> => {
  try {
    const allPosts = await getPosts()
    const searchTerm = query.toLowerCase().trim()
    
    if (!searchTerm) {
      return allPosts
    }
    
    return allPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      (post.body && post.body.toLowerCase().includes(searchTerm))
    )
  } catch (error) {
    console.error('Error searching posts:', error)
    return []
  }
}


export const getPostStats = async () => {
  try {
    const allPosts = await getPosts()
    
    
    const postsByUser = allPosts.reduce((acc, post) => {
      acc[post.userId] = (acc[post.userId] || 0) + 1
      return acc
    }, {} as Record<number, number>)
    
    return {
      totalPosts: allPosts.length,
      postsByUser,
      averagePostsPerUser: Object.keys(postsByUser).length > 0 
        ? Math.round(allPosts.length / Object.keys(postsByUser).length * 10) / 10 
        : 0
    }
  } catch (error) {
    console.error('Error calculating post stats:', error)
    return {
      totalPosts: 0,
      postsByUser: {},
      averagePostsPerUser: 0
    }
  }
}