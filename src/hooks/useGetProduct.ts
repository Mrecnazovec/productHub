import { productsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'

export const useGetProduct = () => {
	const param = useParams<{ id: string }>()

	const { data: product, isLoading } = useQuery({
		queryKey: ['get product by id'],
		queryFn: () => productsService.getById(param.id),
	})

	return useMemo(() => ({ product, isLoading }), [product, isLoading])
}
