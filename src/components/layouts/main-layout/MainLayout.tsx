import { PropsWithChildren } from 'react'
import { Header } from './header/Header'
import { ThemeToggle } from '@/components/ui/ThemeToggleButton'

export function MainLayout({ children }: PropsWithChildren) {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-1 relative'>
				{children}
				<div className='fixed right-4 bottom-4'>
					<ThemeToggle />
				</div>
			</main>
		</div>
	)
}
