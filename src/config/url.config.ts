export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	login: () => PUBLIC_URL.root('/login'),
	register: () => PUBLIC_URL.root('/register'),
}

export const PROTECTED_URL = {
	root: (url = '') => `${url ? url : ''}`,

	dashboard: () => PUBLIC_URL.root('/dashboard'),
	product: (id: string) => PUBLIC_URL.root(`/product/${id}`),
	createProduct: () => PUBLIC_URL.root('/product/new'),
	editProduct: (id: string) => PUBLIC_URL.root(`/product/${id}/edit`),
}
