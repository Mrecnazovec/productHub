import { Metadata } from 'next'
import { Product } from './Product'
import { IProduct } from '@/shared/types/product.interface'
import { api } from '@/api/api.helper'

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params

	try {
		const { data: product } = await api.get<IProduct>(`/products/${id}`)
		return {
			title: product.name,
			description: `View details and specifications for ${product.name}`,
		}
	} catch {
		return {
			title: 'Product not found',
			description: 'This product does not exist or has been removed.',
		}
	}
}

export default async function Page({ params }: Props) {
	const { id } = await params
	return <Product />
}
