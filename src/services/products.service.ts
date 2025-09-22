import { api } from '@/api/api.helper'
import { ICreateProductDto } from '@/shared/types/createProduct.interface'
import { IProduct } from '@/shared/types/product.interface'

export const productsService = {
	getAll: async () => {
		const res = await api.get<IProduct[]>('')
		return res.data
	},

	getById: async (id: string) => {
		const res = await api.get<IProduct>(`/${id}`)
		return res.data
	},

	create: async (data: ICreateProductDto) => {
		const res = await api.post('/', data)
		return res.data
	},

	update: async (id: string, data: ICreateProductDto) => {
		const res = await api.put(`/${id}`, data)
		return res.data
	},

	delete: async (id: string) => {
		const res = await api.delete<IProduct>(`/${id}`)
		return res.data
	},
}
