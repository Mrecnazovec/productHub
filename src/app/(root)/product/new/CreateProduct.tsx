'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Label } from '@/components/ui/Label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useCreateProduct } from '@/hooks/useCreateProduct'
import { ICreateProductDto, ICreateProductForm, ProductSpecs } from '@/shared/types/createProduct.interface'
import { Plus, X } from 'lucide-react'

export function CreateProduct() {
	const { createProduct, isPending } = useCreateProduct()

	const { register, handleSubmit, control } = useForm<ICreateProductForm>({
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

		createProduct(formattedData)
	}

	return (
		<Container className='py-30'>
			<Card>
				<CardHeader>
					<CardTitle>Create Product</CardTitle>
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
							{isPending ? 'Saving...' : 'Create Product'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	)
}
