'use client'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'

import { Container } from '@/components/ui/Container'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Loader } from '@/components/ui/Loader'
import { PROTECTED_URL } from '@/config/url.config'
import { useDeleteProduct } from '@/hooks/useDeleteProduct'
import { useGetProduct } from '@/hooks/useGetProduct'
import { ArrowLeftToLine, PenBox, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function Product() {
	const param = useParams<{ id: string }>()

	const { deleteProduct } = useDeleteProduct()
	const { product, isLoading } = useGetProduct()

	return (
		<div className='min-h-screen bg-accent py-30 flex items-center justify-center '>
			<Container className='flex items-center justify-center flex-col'>
				<div className='w-full max-w-4xl'>
					<Breadcrumb className='mb-4'>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink asChild>
									<Link href={PROTECTED_URL.dashboard()}>Dashboard</Link>
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>{product?.name}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className='w-full bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm overflow-hidden'>
						<div className='flex justify-between items-center gap-4 p-6 border-b bg-accent md:flex-row flex-col'>
							<div>
								<h1 className='text-3xl font-bold'>Product Details</h1>
								<p className='text-muted-foreground'>View and manage product information</p>
							</div>
							<div className='flex items-center gap-4 max-sm:justify-between '>
								<Link href={PROTECTED_URL.dashboard()}>
									<Button className='bg-muted-foreground/50 text-black hover:bg-muted-foreground/30'>
										<ArrowLeftToLine /> <span className='max-sm:hidden'>Back to Table</span>
									</Button>
								</Link>
								<Link href={PROTECTED_URL.editProduct(param.id)}>
									<Button className='bg-orange-400 hover:bg-orange-400/80'>
										<PenBox /> <span className='max-sm:hidden'>Edit Product</span>
									</Button>
								</Link>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant={'destructive'}>
											<Trash2 /> <span className='max-sm:hidden'>Delete Product</span>
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Are you absolutely sure?</DialogTitle>
											<DialogDescription>
												{' '}
												This action cannot be undone. This will permanently delete product and remove data from server.
											</DialogDescription>
										</DialogHeader>
										<DialogFooter>
											<DialogClose asChild>
												<Button variant='outline'>Cancel</Button>
											</DialogClose>
											<Button
												type='button'
												variant={'danger'}
												onClick={() => {
													deleteProduct(param.id)
												}}
											>
												Delete
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</div>
						<div className='p-6 flex gap-6 max-sm:flex-col'>
							{isLoading ? (
								<Loader />
							) : (
								<>
									<Image src='/jpg/photo.jpg' alt='telephone' className='rounded-xl' width={300} height={400} />
									<div>
										<h2 className='text-2xl font-bold'>{product?.name}</h2>
										<p className='text-muted-foreground'>Product ID: {product?.id}</p>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
				{product?.data && (
					<div className='mt-6 bg-card text-card-foreground rounded-xl border shadow-sm overflow-hidden w-full max-w-4xl'>
						<div className='p-6 border-b bg-accent'>
							<h2 className='text-xl font-bold'>Product Specifications</h2>
						</div>
						<div className='divide-y'>
							{Object.entries(product.data).map(([key, value]) => (
								<div key={key} className='grid grid-cols-4 gap-4 p-4'>
									<span className='font-medium text-muted-foreground capitalize col-span-1'>{key}</span>
									<span className='col-span-3'>{String(value)}</span>
								</div>
							))}
						</div>
					</div>
				)}
			</Container>
		</div>
	)
}
