import { LoaderCircle } from 'lucide-react'

export function Loader() {
	return (
		<div className='animate-spin w-fit'>
			<LoaderCircle className='size-8' />
		</div>
	)
}
