import { PROTECTED_URL } from '@/config/url.config'
import { productsService } from '@/services/products.service'
import { ICreateProductDto } from '@/shared/types/createProduct.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useCreateProduct = () => {
	const queryClient = useQueryClient()

	const router = useRouter()

	const { mutate: createProduct, isPending } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: ICreateProductDto) => productsService.create(data),
		onSuccess(product) {
			queryClient.invalidateQueries({
				queryKey: ['get all products'],
			})
			toast.success('Product created')
			router.push(PROTECTED_URL.dashboard())
		},
		onError() {
			toast.error('Error')
		},
	})

	return useMemo(() => ({ createProduct, isPending }), [createProduct, isPending])
}
