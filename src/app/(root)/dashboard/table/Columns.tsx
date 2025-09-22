'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IProduct } from '@/shared/types/product.interface'
import { ProductActions } from './TableActions'

export const columns: ColumnDef<IProduct>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Product Name',
		enableGlobalFilter: true,
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ProductActions product={row.original} />,
	},
]
