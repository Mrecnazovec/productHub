'use client'

import { PUBLIC_URL } from '@/config/url.config'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function HomePage() {
	const router = useRouter()

	useEffect(() => {
		router.push(PUBLIC_URL.login())
	}, [])
	return <div></div>
}
