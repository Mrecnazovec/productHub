'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Plus, Trash2, X } from 'lucide-react'
import { useParams } from 'next/navigation'

import { useUpdateProduct } from '@/hooks/useUpdateProduct'
import { useGetProduct } from '@/hooks/useGetProduct'
import { ICreateProductDto, ICreateProductForm, ProductSpecs } from '@/shared/types/createProduct.interface'
import { useEffect } from 'react'
import { Loader } from '@/components/ui/Loader'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { useDeleteProduct } from '@/hooks/useDeleteProduct'

export function EditProduct() {
	const param = useParams<{ id: string }>()
	const { product, isLoading } = useGetProduct()
	const { deleteProduct } = useDeleteProduct()

	const { updateProduct, isPending } = useUpdateProduct()

	const { register, handleSubmit, control, reset } = useForm<ICreateProductForm>({
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			stock: 0,
			category: '',
			status: 'active',
			specs: [{ key: '', value: '' }],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'specs',
	})

	useEffect(() => {
		if (product) {
			const baseSpecs = Object.entries(product.data || {})
				.filter(([key]) => !['description', 'price', 'stock', 'category', 'status'].includes(key))
				.map(([key, value]) => ({ key, value: String(value) }))

			reset({
				name: product.name || '',
				description: String(product.data?.description || ''),
				price: Number(product.data?.price) || 0,
				stock: Number(product.data?.stock) || 0,
				category: String(product.data?.category || ''),
				status: (product.data?.status as 'active' | 'out-of-stock') || 'active',
				specs: baseSpecs.length ? baseSpecs : [{ key: '', value: '' }],
			})
		}
	}, [product, reset])

	const onSubmit = (data: ICreateProductForm) => {
		const specs: ProductSpecs = Object.fromEntries(data.specs.map((s) => [s.key, s.value]))

		const formattedData: ICreateProductDto = {
			name: data.name,
			data: {
				description: data.description,
				price: data.price,
				stock: data.stock,
				category: data.category,
				status: data.status,
				...specs,
			},
		}

		updateProduct({ id: param.id, data: formattedData })
	}

	if (isLoading)
		return (
			<div className='h-screen flex items-center justify-center'>
				<Loader />
			</div>
		)

	return (
		<Container className='py-30'>
			<Card>
				<CardHeader>
					<CardTitle>Update Product</CardTitle>
					<CardAction>
						{' '}
						<Dialog>
							<DialogTrigger asChild>
								<Button className='bg-red-200 text-red-500 font-medium hover:bg-red-100'>
									<Trash2 />
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
					</CardAction>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
						<div>
							<Label className='mb-2'>Name</Label>
							<Input required {...register('name')} placeholder='Product name' />
						</div>
						<div>
							<Label className='mb-2'>Description</Label>
							<Input required {...register('description')} placeholder='Product description' />
						</div>
						<div>
							<Label className='mb-2'>Price</Label>
							<Input required type='number' {...register('price')} />
						</div>
						<div>
							<Label className='mb-2'>Stock</Label>
							<Input required type='number' {...register('stock')} />
						</div>
						<div>
							<Label className='mb-2'>Category</Label>
							<Input required {...register('category')} placeholder='Electronics, Audio...' />
						</div>
						<div>
							<Label className='mb-2'>Status</Label>
							<Select onValueChange={(val) => (control._formValues.status = val)} defaultValue='active'>
								<SelectTrigger>
									<SelectValue placeholder='Select status' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='active'>Active</SelectItem>
									<SelectItem value='out-of-stock'>Out of Stock</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label className='mb-2'>Product Specifications</Label>
							<div className='flex flex-col gap-3'>
								{fields.map((field, index) => (
									<div key={field.id} className='flex gap-2'>
										<Input {...register(`specs.${index}.key`)} placeholder='Key (e.g. Color)' />
										<Input {...register(`specs.${index}.value`)} placeholder='Value (e.g. Red)' />
										<Button type='button' variant='outline' onClick={() => remove(index)}>
											<X />
										</Button>
									</div>
								))}
								<Button type='button' variant='secondary' className='text-white' onClick={() => append({ key: '', value: '' })}>
									<Plus /> Add specification
								</Button>
							</div>
						</div>

						<Button type='submit' variant='main' disabled={isPending}>
							{isPending ? 'Updating...' : 'Update Product'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	)
}
