'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { PROTECTED_URL, PUBLIC_URL } from '@/config/url.config'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterForm, registerSchema } from '@/shared/registrationValidation'

export function Register() {
	const { register: registerUser } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit = async (data: RegisterForm) => {
		await registerUser(data.name, data.email, data.password)
		router.push(PROTECTED_URL.dashboard())
	}

	return (
		<div className='bg-linear-to-br from-main to-secondary min-h-screen flex items-center justify-between py-30'>
			<h1 className='sr-only'>Register page</h1>
			<Container className='flex items-center justify-center'>
				<Card className='w-full max-w-xl'>
					<CardHeader>
						<CardTitle className='text-2xl font-bold'>Register</CardTitle>
						<CardDescription className='font-light'>Create a new account to use product dashboard</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex flex-col gap-6'>
								<div className='grid gap-2'>
									<Label htmlFor='email'>Email Address</Label>
									<Input {...register('email')} id='email' type='email' placeholder='m@example.com' />
									{errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
								</div>

								<div className='grid gap-2'>
									<Label htmlFor='name'>Full Name</Label>
									<Input {...register('name')} id='name' type='text' placeholder='Enter your name' />
									{errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
								</div>

								<div className='grid gap-2'>
									<Label htmlFor='password'>Password</Label>
									<Input {...register('password')} id='password' type='password' placeholder='Enter your password' />
									{errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
								</div>
							</div>

							<Button type='submit' variant={'main'} className='w-full mb-4 mt-6'>
								Sign up
							</Button>

							<div className='flex items-center justify-between w-full'>
								<Link href={PUBLIC_URL.login()} className='text-sm underline-offset-4 hover:opacity-80 text-main transition-all'>
									Do you have an account?
								</Link>
							</div>
						</form>
					</CardContent>
				</Card>
			</Container>
		</div>
	)
}
