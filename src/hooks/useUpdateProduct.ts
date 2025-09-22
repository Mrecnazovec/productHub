import { PROTECTED_URL } from '@/config/url.config'
import { productsService } from '@/services/products.service'
import { ICreateProductDto } from '@/shared/types/createProduct.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: updateProduct, isPending } = useMutation({
		mutationKey: ['update product'],
		mutationFn: ({ id, data }: { id: string; data: ICreateProductDto }) => productsService.update(id, data),
		onSuccess(product) {
			queryClient.invalidateQueries({
				queryKey: ['get all products'],
			})
			toast.success('Product updated')
			router.push(PROTECTED_URL.dashboard())
		},
		onError() {
			toast.error('Error')
		},
	})

	return useMemo(() => ({ updateProduct, isPending }), [updateProduct, isPending])
}
