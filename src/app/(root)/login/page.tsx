import { Metadata } from 'next'
import { Login } from './Login'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	...NO_INDEX_PAGE,
}

export default function page() {
	return <Login />
}
