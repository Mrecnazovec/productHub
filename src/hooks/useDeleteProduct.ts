import { PROTECTED_URL } from '@/config/url.config'
import { productsService } from '@/services/products.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { mutate: deleteProduct, isPending } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: string) => productsService.delete(id),
		onSuccess(product) {
			queryClient.invalidateQueries({
				queryKey: ['get all products'],
			})
			toast.success('Product deleted')
			router.push(PROTECTED_URL.dashboard())
		},
		onError() {
			toast.error('Error')
		},
	})

	return useMemo(() => ({ deleteProduct, isPending }), [deleteProduct, isPending])
}
