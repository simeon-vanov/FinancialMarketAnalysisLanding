import axios from 'axios'
import { generateMessageFromObjectValues } from 'utils/obj-from-array'
import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export interface BackendError {
  status: number
  title: string
  detail: string
  errors?: { [key: string]: string }
}

export const UNAUTHORIZED_CODE = '401'
export const UNAUTHORIZED_MESSAGE = 'Unauthorized'

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

export default axiosInstance

export const useAxiosInterceptor = () => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
              scope: 'profile email read:screener read:insights',
              responseType: 'token id_token'
            }
          })

          if (config.headers) {
            config.headers.Authorization = `Bearer ${token}`
          }
        } catch (error) {
          console.error('Failed to get access token', error)
        }
        return config
      },
      (error) => {
        console.log(error)
        return Promise.reject(error)
      }
    )

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config
        if (error.response?.status === 401) {
          if (!config._retry) {
            config._retry = true
          }

          toast.error('Unauthorized, please login again')
          return Promise.reject(error.response?.data || { code: UNAUTHORIZED_CODE, message: UNAUTHORIZED_MESSAGE })
        } else {
          const apiError = error.response?.data as BackendError
          if (!apiError) {
            console.error('Unexpected error', error)
            return Promise.reject('Unexpected error')
          }

          const errorMessage = !!apiError.errors ? generateMessageFromObjectValues(apiError.errors) : apiError.detail
          return Promise.reject(errorMessage)
        }
      }
    )

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor)
      axiosInstance.interceptors.response.eject(responseInterceptor)
    }
  }, [getAccessTokenSilently])
}
