'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { PROTECTED_URL, PUBLIC_URL } from '@/config/url.config'
import Link from 'next/link'
import { PropsWithChildren, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/context/AuthContext'

type LoginForm = {
	email: string
	password: string
}

export function Login() {
	const { login } = useAuth()
	const router = useRouter()
	const { register, handleSubmit } = useForm<LoginForm>()

	const onSubmit = async (data: LoginForm) => {
		await login(data.email, data.password)
		router.push(PROTECTED_URL.dashboard())
	}

	return (
		<div className='bg-linear-to-br from-main to-secondary min-h-screen flex items-center justify-between py-30'>
			<h1 className='sr-only'>Login page</h1>
			<Container className='flex justify-between items-center md:flex-row flex-col'>
				<div>
					<h2 className='lg:text-7xl text-3xl font-black text-white mb-4 max-md:text-center'>ProductHub</h2>
					<p className='lg:text-3xl text-xl font-thin text-white mb-8 max-md:text-center'>CRUD Management Platform</p>
					<ul className='grid md:grid-cols-1 sm:grid-cols-2 gap-4 max-md:mb-8'>
						<Li smile='📊'>Advanced table management</Li>
						<Li smile='✏️'>Full CRUD operations</Li>
						<Li smile='🔎'>Search & filter products</Li>
						<Li smile='📲'>Responsive design</Li>
					</ul>
				</div>

				<Card className='w-full max-w-sm'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold'>Welcome Back</CardTitle>
						<CardDescription className='font-light'>Sign in to access your product dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email Address</Label>
									<Input {...register('email')} id='email' type='email' placeholder='m@example.com' required />
								</div>
								<div className='grid gap-2'>
									<Label htmlFor='password'>Password</Label>
									<Input {...register('password')} id='password' type='password' placeholder='Enter your password' required />
								</div>
							</div>
							<Button type='submit' variant={'main'} className='w-full mb-4 mt-6'>
								Login
							</Button>
							<div className='flex items-center justify-between w-full'>
								<Link href={PUBLIC_URL.register()} className='text-sm underline-offset-4 hover:opacity-80 text-main transition-all'>
									Sign up
								</Link>
								<Link href='#' className='text-sm underline-offset-4 hover:opacity-80 text-main transition-all'>
									Forgot your password?
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</Container>
		</div>
	)
}

interface LiInterface {
	smile: string
}
function Li({ smile, children }: PropsWithChildren<LiInterface>) {
	return (
		<li className='flex items-center text-white font-extralight gap-4 '>
			<div className='p-1.5 bg-gray-200/30 rounded-full text-sm size-8 flex items-center justify-center'>{smile}</div>
			<p className='lg:text-2xl'>{children}</p>
		</li>
	)
}
