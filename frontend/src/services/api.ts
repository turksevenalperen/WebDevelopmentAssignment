

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://webdevelopmentassignment-production.up.railway.app'


export type ApiResponse<T> = {
  data: T
  status: number
  statusText: string
}


export class ApiError extends Error {
  status: number
  statusText: string
  
  constructor(status: number, statusText: string, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
  }
}


export const apiGet = async <T>(endpoint: string): Promise<T> => {
  console.log(`[API] GET ${API_BASE_URL}${endpoint}`)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`)
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to fetch ${endpoint}`
      )
    }
    
    const data = await response.json()
    console.log(`[API] GET Response:`, data)
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network Error', `Network error while fetching ${endpoint}`)
  }
}


export const apiPost = async <T, R = T>(
  endpoint: string, 
  data: T
): Promise<R> => {
  console.log(`[API] POST ${API_BASE_URL}${endpoint}`, data)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to create resource at ${endpoint}`
      )
    }
    
    const responseData = await response.json()
    console.log(`[API] POST Response:`, responseData)
    return responseData
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network Error', `Network error while creating resource at ${endpoint}`)
  }
}


export const apiPut = async <T, R = T>(
  endpoint: string, 
  data: T
): Promise<R> => {
  console.log(`[API] PUT ${API_BASE_URL}${endpoint}`, data)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to update resource at ${endpoint}`
      )
    }
    
    const responseData = await response.json()
    console.log(`[API] PUT Response:`, responseData)
    return responseData
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network Error', `Network error while updating resource at ${endpoint}`)
  }
}


export const apiPatch = async <T, R = T>(
  endpoint: string, 
  data: Partial<T>
): Promise<R> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to update resource at ${endpoint}`
      )
    }
    
    const responseData = await response.json()
    return responseData
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network Error', `Network error while updating resource at ${endpoint}`)
  }
}


export const apiDelete = async (endpoint: string): Promise<boolean> => {
  console.log(`[API] DELETE ${API_BASE_URL}${endpoint}`)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `Failed to delete resource at ${endpoint}`
      )
    }
    
    console.log(`[API] DELETE Success:`, endpoint)
    return true
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(0, 'Network Error', `Network error while deleting resource at ${endpoint}`)
  }
}


export const handleApiError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return `API Error (${error.status}): ${error.message}`
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return 'An unexpected error occurred'
}


export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}