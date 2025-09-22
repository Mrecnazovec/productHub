export interface ICreateProductForm {
	name: string
	description: string
	price: number
	stock: number
	category: string
	status: 'active' | 'out-of-stock'
	specs: { key: string; value: string }[]
}

export interface IBaseProductData {
	description: string
	price: number
	stock: number
	category: string
	status: 'active' | 'out-of-stock'
}

export type ProductSpecs = Record<string, string | number>

export type IProductData = IBaseProductData & ProductSpecs

export interface ICreateProductDto {
	name: string
	data: IProductData
}
