'use client'

import { PropsWithChildren, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import { AuthProvider } from '@/components/context/AuthContext'
import { ThemeProvider } from '@/components/ThemeProvider'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false,
				},
			},
		})
	)

	return (
		<QueryClientProvider client={client}>
			<AuthProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
					<NextTopLoader showSpinner={false} />
					<Toaster position='top-right' />
					{children}
				</ThemeProvider>
			</AuthProvider>
		</QueryClientProvider>
	)
}
