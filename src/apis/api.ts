import { AxiosResponse } from 'axios'
import axiosInstance from 'configs/axios'

export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
const DEFAULT_REQUEST_TIMEOUT = 10000

axiosInstance.defaults.baseURL = BASE_API_URL
axiosInstance.defaults.timeout = DEFAULT_REQUEST_TIMEOUT
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

export const getUrl = (path: string): string => `${BASE_API_URL}/${path}`

export async function get<T>(path: string, params?: any): Promise<T> {
  let url = getUrl(path)
  if (params) {
    url += '?' + new URLSearchParams(params).toString()
  }

  const response = await axiosInstance(url, {
    params: params
  })

  if (response) {
    const data: T = await response.data
    return data
  } else {
    throw new Error('Error on api request')
  }
}

export async function post<TRequest, TResult>(path: string, request: TRequest): Promise<TResult> {
  const url = getUrl(path)
  const response = await axiosInstance.post<TRequest, AxiosResponse<TResult>>(url, request)

  if (response) {
    const data: TResult = await response.data
    return data
  } else {
    throw new Error('Error on api request')
  }
}

export async function put<TRequest, TResult>(path: string, request: TRequest): Promise<TResult> {
  const url = getUrl(path)
  return await axiosInstance.put<TRequest, TResult>(url, request)
}

export async function patch<TRequest, TResult>(path: string, request: TRequest): Promise<TResult> {
  const url = getUrl(path)
  return await axiosInstance.patch<TRequest, TResult>(url, request, {
    headers: {
      'Content-Type': 'application/json-patch+json'
    }
  })
}

export async function deleteRequest(path: string): Promise<boolean> {
  const url = getUrl(path)
  const response = await axiosInstance.delete(url)

  return response.status === 200 || response.status === 204
}
