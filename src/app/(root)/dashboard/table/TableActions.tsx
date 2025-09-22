'use client'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { PROTECTED_URL } from '@/config/url.config'
import { IProduct } from '@/shared/types/product.interface'
import { Trash2 } from 'lucide-react'
import { useDeleteProduct } from '@/hooks/useDeleteProduct'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'

interface ProductActionsProps {
	product: IProduct
}

export function ProductActions({ product }: ProductActionsProps) {
	const { deleteProduct } = useDeleteProduct()

	return (
		<div className='flex gap-2'>
			<Link href={PROTECTED_URL.product(product.id)}>
				<Button size='sm' variant='outline'>
					👁
				</Button>
			</Link>
			<Link href={PROTECTED_URL.editProduct(product.id)}>
				<Button size='sm' variant='outline'>
					✏️
				</Button>
			</Link>
			<Dialog>
				<DialogTrigger asChild>
					<Button className='bg-red-200 text-red-500 font-medium hover:bg-red-100'>
						<Trash2 />
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you absolutely sure?</DialogTitle>
						<DialogDescription> This action cannot be undone. This will permanently delete product and remove data from server.</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant='outline'>Cancel</Button>
						</DialogClose>
						<Button
							type='button'
							variant={'danger'}
							onClick={() => {
								deleteProduct(product.id)
							}}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
