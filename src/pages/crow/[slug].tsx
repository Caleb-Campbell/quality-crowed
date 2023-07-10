import { useRouter } from 'next/router'
import { useState } from 'react'
import { Layout } from '~/Templates/Layout'
import { Button } from '~/components/ui/button'
import { api } from '~/utils/api'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from  "../../components/ui/tabs"
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
 
export default function Page() {
  const [ crowData, setCrowData ] = useState<any | undefined>(undefined)
  const [ issueInput, setIssueInput ] = useState<string>('')
  const router = useRouter()

  const crow = router.query.slug
  const { data } = api.crow.getCrow.useQuery({id: crow as string})


  const getQuestions = async () => {

  }

  return (
    <>
    <Button className='absolute z-50 top-10 left-10 bg-background'>
      <a href='/crow'>
        Back
      </a>
    </Button>
    <Layout>
    <Tabs defaultValue="preflight" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="preflight">Preflight</TabsTrigger>
        <TabsTrigger value="steps">Steps</TabsTrigger>
        <TabsTrigger value="pr">PR</TabsTrigger>
      </TabsList>
      <TabsContent value="preflight">
      {
        data?.preflightQuestions.length === 0 ? (
          <div className="flex text-center py-5 my-5 w-4/12 mx-auto h-full flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-100 mb-10">Looks like you haven't generated any questions. Lets fix that for you.</h1>
            <p className='text-gray-100 text-xl sr-only'>Describe your issue:</p>
            <Textarea value={issueInput} onChange={(e) => setIssueInput(e.currentTarget.value)} className='text-gray-100 mb-1' placeholder='describe your issue...' />
            <Button className='w-full mt-0' variant={'secondary'} onClick={getQuestions}>Generate Questions</Button>
          </div>
        ):(
          <div className="flex  w-full h-full flex-col items-center justify-center">
            {
            data?.preflightQuestions.map((question: any) => (
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold text-gray-100">{JSON.stringify(question)}</h1>
              </div>
            )
            )}
          </div>
        )
      }
      </TabsContent>
      <TabsContent value="steps">
       // slide two
      </TabsContent>
      <TabsContent value="pr">
       // slide two
      </TabsContent>
    </Tabs>
    </Layout>
    </>
  )
}