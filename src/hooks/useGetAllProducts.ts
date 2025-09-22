import { productsService } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetProducts = () => {
	const { data: products, isLoading } = useQuery({
		queryKey: ['get all products'],
		queryFn: () => productsService.getAll(),
	})

	return useMemo(() => ({ products, isLoading }), [products, isLoading])
}
