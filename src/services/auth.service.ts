import { AuthResponse, User } from '@/shared/types/auth.interface'
import toast from 'react-hot-toast'

const STORAGE_KEY = 'auth_data'
const USERS_KEY = 'users_data'

type StoredUser = User & { password: string }

function saveAuth(data: AuthResponse) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
	document.cookie = `auth_token=${data.token}; path=/;`
}

function clearAuth() {
	localStorage.removeItem(STORAGE_KEY)
	document.cookie = 'auth_token=; Max-Age=0; path=/;'
}

function getAuth(): AuthResponse | null {
	const raw = localStorage.getItem(STORAGE_KEY)
	return raw ? JSON.parse(raw) : null
}

function getUsers(): StoredUser[] {
	const raw = localStorage.getItem(USERS_KEY)
	return raw ? JSON.parse(raw) : []
}

function saveUsers(users: StoredUser[]) {
	localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export const authService = {
	register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
		const users = getUsers()

		if (users.some((u) => u.email === email)) {
			toast.error('User already exists')
			throw new Error('User already exists')
		}

		const newUser: StoredUser = {
			id: Date.now().toString(),
			name,
			email,
			password,
		}

		users.push(newUser)
		saveUsers(users)

		const auth: AuthResponse = {
			user: { id: newUser.id, name: newUser.name, email: newUser.email },
			token: Math.random().toString(36).substring(2),
		}

		saveAuth(auth)
		toast.success('Registration successful')
		return auth
	},

	login: async (email: string, password: string): Promise<AuthResponse> => {
		const users = getUsers()
		const existingUser = users.find((u) => u.email === email)

		if (!existingUser) {
			toast.error('User not found')
			throw new Error('User not found')
		}

		if (existingUser.password !== password) {
			toast.error('Invalid password')
			throw new Error('Invalid password')
		}

		const auth: AuthResponse = {
			user: { id: existingUser.id, name: existingUser.name, email: existingUser.email },
			token: Math.random().toString(36).substring(2),
		}

		saveAuth(auth)
		toast.success(`Welcome back, ${existingUser.name}!`)
		return auth
	},

	logout: () => {
		clearAuth()
		toast.success('Logged out successfully')
	},

	getCurrentUser: (): User | null => {
		const auth = getAuth()
		return auth?.user || null
	},

	getToken: (): string | null => {
		const auth = getAuth()
		return auth?.token || null
	},
}
