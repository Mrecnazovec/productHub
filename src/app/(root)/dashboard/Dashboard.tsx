'use client'

import { useGetProducts } from '@/hooks/useGetAllProducts'
import { columns } from './table/Columns'
import { DataTable } from './table/DataTable'

export function Dashboard() {
	const { products, isLoading } = useGetProducts()

	return (
		<div className='min-h-screen bg-accent py-30'>
			<DataTable columns={columns} data={products || []} isLoading={isLoading} />
		</div>
	)
}
