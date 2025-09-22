import { Metadata } from 'next'
import { Register } from './Register'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Registration',
	...NO_INDEX_PAGE
}

export default function page() {
	return <Register />
}
