'use client'

import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Plus } from 'lucide-react'
import { useAuth } from '@/components/context/AuthContext'
import { PROTECTED_URL } from '@/config/url.config'
import Link from 'next/link'
import { Loader } from '@/components/ui/Loader'

interface DashboardHeaderProps {
	search: string
	setSearch: (value: string) => void
}

export function DashboardHeader({ search, setSearch }: DashboardHeaderProps) {
	const { user, logout } = useAuth()

	return (
		<div className='mb-8'>
			<div className='bg-card py-4 shadow-lg'>
				<Container className='flex justify-between md:flex-row flex-col'>
					<div className='md:order-1 order-2'>
						<h1 className='text-3xl font-black mb-4'>Product Dashboard</h1>
						<div className='flex gap-4'>
							<Input
								className='w-[360px]'
								type='text'
								placeholder='🔎 Search products...'
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>
					<div className='md:order-2 order-1'>
						{!user ? (
							<Loader />
						) : (
							<div className='flex flex-col gap-4 max-sm:mb-8'>
								<div className='flex items-center gap-4'>
									<div className='size-12 bg-gradient-to-br from-main to-secondary rounded-full flex items-center justify-center text-white text-lg'>
										{user.name.slice(0, 2).toUpperCase()}
									</div>
									<div className='mr-auto'>
										<p className='text-sm font-bold'>{user?.name}</p>
										<p className='text-xs text-muted-foreground'>{user?.email}</p>
									</div>
									<Dialog>
										<DialogTrigger asChild>
											<Button className='bg-red-200 text-red-500 font-medium hover:bg-red-100'>Logout</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>Are you absolutely sure?</DialogTitle>
												<DialogDescription>After logging out, you will have to log in again.</DialogDescription>
											</DialogHeader>
											<DialogFooter>
												<DialogClose asChild>
													<Button variant='outline'>Cancel</Button>
												</DialogClose>
												<Button type='button' variant={'danger'} onClick={logout}>
													Logout
												</Button>
											</DialogFooter>
										</DialogContent>
									</Dialog>
								</div>
								<Link className='self-end' href={PROTECTED_URL.createProduct()}>
									<Button className='bg-gradient-to-br from-green-500 to-green-800 hover:opacity-80'>
										<Plus /> Add New Product
									</Button>
								</Link>
							</div>
						)}
					</div>
				</Container>
			</div>
		</div>
	)
}
