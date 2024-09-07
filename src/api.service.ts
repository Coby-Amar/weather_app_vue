import axios from "axios"
import { useGlobalState } from "./global.store"

const getCsrfToken = () => document.cookie.split('=')[1] ?? ''
const instance = axios.create({
    baseURL: import.meta.env.VITE_VUE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
    },
})

instance.interceptors.request.use((req) => {
    req.headers.set('X-CSRF-TOKEN', getCsrfToken())
    return req
})


const { setUser, toggleLoading } = useGlobalState()

/**
 * Auth API calls
 */
export async function register(username: string, password: string) {
    try {
        toggleLoading()
        const { data } = await instance.post('/auth/signup', { username, password })
        setUser(data)
        toggleLoading()
        return true
    } catch (error) {
        toggleLoading()
        console.error('error: ', error)
        return false
    }
}

export async function login(username: string, password: string) {
    try {
        toggleLoading()
        const { data } = await instance.post('/auth/login', { username, password })
        setUser(data)
        toggleLoading()
        return true
    } catch (error) {
        console.error('error: ', error)
        toggleLoading()
        return false
    }
}

export async function logout() {
    try {
        await instance.post('/auth/logout')
        setUser(null)
        return true
    } catch (error) {
        console.error('error: ', error)
        return false
    }
}

/**
 * User API calls
 */
export async function user() {
    try {
        const { data } = await instance.get('/user')
        setUser(data)
        return true
    } catch (error) {
        console.error('error: ', error)
        return false
    }
}

export async function deleteUser() {
    try {
        await instance.delete('/user')
        setUser(null)
        return true
    } catch (error) {
        console.error('error: ', error)
        return false
    }
}

/**
 * Weather API calls
 */