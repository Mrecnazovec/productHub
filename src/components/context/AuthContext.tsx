'use client'

import { authService } from '@/services/auth.service'
import { AuthResponse, User } from '@/shared/types/auth.interface'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
	user: User | null
	token: string | null
	login: (email: string, password: string) => Promise<AuthResponse>
	register: (name: string, email: string, password: string) => Promise<AuthResponse>
	logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const currentUser = authService.getCurrentUser()
		const currentToken = authService.getToken()
		setUser(currentUser)
		setToken(currentToken)
	}, [])

	async function login(email: string, password: string) {
		const data = await authService.login(email, password)
		setUser(data.user)
		setToken(data.token)
		router.refresh()
		return data
	}

	async function register(name: string, email: string, password: string) {
		const data = await authService.register(name, email, password)
		setUser(data.user)
		setToken(data.token)
		router.refresh()
		return data
	}

	function logout() {
		authService.logout()
		setUser(null)
		setToken(null)
		router.refresh()
	}

	return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}
