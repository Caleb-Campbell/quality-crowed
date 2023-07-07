import { useRouter } from 'next/router'
import { Layout } from '~/Templates/Layout'
import { Button } from '~/components/ui/button'
 
export default function Page() {
  const router = useRouter()
  return (
    <>
    <Button className='absolute z-50 top-10 left-10 bg-background'>
      <a href='/crow'>
        Back
      </a>
    </Button>
    <Layout>
        <div className=" h-[80vh] flex overflow-hidden bg-background"></div>
    </Layout>
    </>
  )
}