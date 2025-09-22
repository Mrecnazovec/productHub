import { Metadata } from 'next'
import { CreateProduct } from './CreateProduct'

export const metadata: Metadata = {
	title: 'Create Product',
}

export default function page() {
	return <CreateProduct />
}
