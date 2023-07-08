import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '~/Templates/Layout'
import { Button } from '~/components/ui/button'
import { api } from '~/utils/api'
 
export default function Page() {
  const [ crowData, setCrowData ] = useState<any | undefined>(undefined)
  const router = useRouter()

  const crow = router.query.slug
  console.log('slug', crow)
  const { data } = api.crow.getCrow.useQuery({id: crow as string})
  console.log(data)

  return (
    <>
    <Button className='absolute z-50 top-10 left-10 bg-background'>
      <a href='/crow'>
        Back
      </a>
    </Button>
    <Layout>
        <div className=" h-[80vh] flex overflow-hidden bg-background">
          <pre>
            <code>
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
    </Layout>
    </>
  )
}