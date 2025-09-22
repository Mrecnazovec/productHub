'use client'

import { PROTECTED_URL, PUBLIC_URL } from '@/config/url.config'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import { useAuth } from '@/components/context/AuthContext'

export function Header() {
	const pathname = usePathname()
	const { token } = useAuth()

	const isOnProductDetails = pathname.startsWith('/product/') && !pathname.endsWith('/edit')
	const isOnEditProduct = pathname.includes('/edit')

	return (
		<header className='flex justify-center relative'>
			<ul
				className={cn(
					'sm:flex grid grid-cols-2 sm:py-3 sm:px-2 xs:p-3 p-2 rounded-xl sm:rounded-full border-2 absolute top-4 z-10 xs:gap-4 gap-2',
					`${
						pathname === PUBLIC_URL.login() || pathname === PUBLIC_URL.register()
							? 'border-gray-200/30 bg-gray-200/30'
							: 'border-main/30 bg-gradient-to-br from-main to-secondary'
					}`
				)}
			>
				<Item
					href={pathname === PUBLIC_URL.register() ? PUBLIC_URL.register() : PUBLIC_URL.login()}
					isActive={pathname === PUBLIC_URL.login() || pathname === PUBLIC_URL.register()}
					onClick={() => {
						if (token) toast.error('You are already logged in.')
					}}
				>
					{pathname === PUBLIC_URL.register() ? 'Register' : 'Login'}
				</Item>
				<Item href={PROTECTED_URL.dashboard()} isActive={pathname === PROTECTED_URL.dashboard()}>
					Dashboard
				</Item>
				<Item
					href={isOnProductDetails ? '#' : PROTECTED_URL.dashboard()}
					isActive={isOnProductDetails}
					onClick={() => {
						if (!isOnProductDetails) {
							toast.error('Choose product in dashboard')
						}
					}}
				>
					Product Details
				</Item>
				<Item
					href={pathname.includes('/edit') ? '#' : PROTECTED_URL.dashboard()}
					isActive={pathname.includes('/edit')}
					onClick={() => {
						if (!isOnEditProduct) {
							toast.error('Choose product in dashboard')
						}
					}}
				>
					Edit Products
				</Item>
			</ul>
		</header>
	)
}

interface ItemProps {
	href: string
	isActive: boolean
	onClick?: () => void
}

function Item({ children, isActive, href, onClick }: PropsWithChildren<ItemProps>) {
	return (
		<li>
			<Link
				onClick={onClick}
				className={`xs:px-4 xs:py-2 ${isActive ? 'bg-gray-200/40' : ''} sm:rounded-full px-2 py-1 rounded-lg text-white font-light`}
				href={href}
			>
				{children}
			</Link>
		</li>
	)
}
