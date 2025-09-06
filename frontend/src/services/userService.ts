import { apiGet, apiPost, apiPut, apiDelete } from './api'
import type { User } from '../components/UserList'


export interface CreateUserData {
  name: string
  username: string
  email: string
}

export interface UpdateUserData extends CreateUserData {
  id?: number
}


export const getUsers = async (): Promise<User[]> => {
  try {
    const users = await apiGet<User[]>('/users')
    return users.sort((a, b) => a.id - b.id)
  } catch (error) {
    console.error('Error fetching users:', error)
    throw new Error('Failed to fetch users')
  }
}


export const getUserById = async (id: number): Promise<User> => {
  try {
    const user = await apiGet<User>(`/users/${id}`)
    return user
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error)
    throw new Error(`User with ID ${id} not found`)
  }
}


export const createUser = async (userData: CreateUserData): Promise<User> => {
  try {
    const newUser = await apiPost<CreateUserData, User>('/users', userData)
    return newUser
  } catch (error) {
    console.error('Error creating user:', error)
    throw new Error('Failed to create user')
  }
}


export const updateUser = async (id: number, userData: UpdateUserData): Promise<User> => {
  try {
    const updatedUser = await apiPut<UpdateUserData, User>(`/users/${id}`, {
      id,
      ...userData
    })
    return updatedUser
  } catch (error) {
    console.error(`Error updating user ${id}:`, error)
    throw new Error('Failed to update user')
  }
}


export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    await apiDelete(`/users/${id}`)
    return true
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error)
    throw new Error('Failed to delete user')
  }
}


export const isUsernameAvailable = async (username: string, excludeId?: number): Promise<boolean> => {
  try {
    const allUsers = await getUsers()
    return !allUsers.some(user => 
      user.username.toLowerCase() === username.toLowerCase() && 
      user.id !== excludeId
    )
  } catch (error) {
    console.error('Error checking username availability:', error)
    return false
  }
}


export const isEmailAvailable = async (email: string, excludeId?: number): Promise<boolean> => {
  try {
    const allUsers = await getUsers()
    return !allUsers.some(user => 
      user.email.toLowerCase() === email.toLowerCase() && 
      user.id !== excludeId
    )
  } catch (error) {
    console.error('Error checking email availability:', error)
    return false
  }
}


export const getUserPosts = async (userId: number) => {
  try {
    return await apiGet(`/users/${userId}/posts`)
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
    return []
  }
}