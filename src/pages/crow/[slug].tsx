import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
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
import PreflightList from '~/components/micro/preflights'
import { Preflight } from '~/components/micro/preflights'
import { SettingsBar } from '~/components/micro/settingsBar'
import { Modal } from '~/components/micro/Modal'
import { X } from 'lucide-react'
 
export default function Page() {
  const [ crowData, setCrowData ] = useState<any | undefined>(undefined)
  const [ issueInput, setIssueInput ] = useState<string>('')
  const [ showTechList, setShowTechList ] = useState<boolean>(false)
  const [ techInput, setTechInput ] = useState<string>('')

  const router = useRouter()
  const context = api.useContext()

  const crow = router.query.slug
  const { data, isLoading } = api.crow.getCrow.useQuery({id: crow as string})

  const createQuestions = api.ai.createQuestions.useMutation()


  const getQuestions = async () => {
    if(issueInput === '') return

    const { data } = await createQuestions.mutateAsync({prompt: issueInput, crowId: crow as string}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
    console.log(data)
  }

  const deleteHandler = api.crow.deleteCrow.useMutation()
  const archiveHandler = api.crow.archiveCrow.useMutation()
  const addTech = api.crow.addTech.useMutation()
  const deleteTech = api.crow.deleteTech.useMutation()
  
  const deleteCrow = () => {
    deleteHandler.mutate({id: crow as string}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
    router.push('/crow')
  }

  const archiveCrow = () => {
    archiveHandler.mutate({id: crow as string}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
  }

  useEffect(() => {
    if(data) {
      setCrowData(data)
    }
  }, [data])

  const submitTech = (e: FormEvent)=>{
    e.preventDefault()
    addTech.mutate({tech: techInput, crowId: data!.id }, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
    setTechInput('')
  }

  return (
    <>
      <Modal open={showTechList} setOpen={setShowTechList}>
        <div className='w-96 mb-10 rounded-xl'>
          <p className='text-gray-100 text-2xl text-center pt-3'>{ isLoading ? 'Loading' : 'List Tech Used'}</p>
          <form onSubmit={submitTech} className='flex justify-around'>
            <Input value={techInput} onChange={(e)=>setTechInput(e.currentTarget.value)} className='w-8/12 mt-5 focus:border-none text-primary-foreground' />
            <Button className='w-3/12 mt-5' variant='secondary' >Add</Button>
          </form>
        </div>
        <div className='flex flex-wrap gap-3 h-80 p-5'>
        {
          data?.tech.map((techString: string) => (
            <Button variant='secondary' className='px-2 flex justify-between'>
             <p className='mr-3'>{techString}</p>
             <X onClick={async ()=>{deleteTech.mutate({tech: techString, crowId: data.id }, {
      onSuccess: () => {
        context.crow.invalidate()
      }
      })}} />
            </Button>
          ))
        }
        </div>
      </Modal>

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
      <TabsContent className='min-h-[65vh]' value="preflight">
      {
        data?.preflightQuestions.length === 0 ? (
          <div className="flex text-center w-4/12 mx-auto flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-100 mb-10">Looks like you haven't generated any questions. Lets fix that for you.</h1>
            <p className='text-gray-100 text-xl sr-only'>Describe your issue:</p>
            <Textarea value={issueInput} onChange={(e) => setIssueInput(e.currentTarget.value)} className='text-gray-100 mb-1' placeholder='describe your issue...' />
            <Button className='w-full mt-0' variant={'secondary'} onClick={getQuestions}>Generate Questions</Button>
          </div>
        ):(
          <>
            {
              data?.preflightQuestions && <PreflightList preflights={data?.preflightQuestions} />
            }
            </>
        )
      }
      </TabsContent>
      <TabsContent className='min-h-[65vh]' value="steps">
       // slide two
      </TabsContent>
      <TabsContent className='min-h-[65vh]' value="pr">
       // slide two
      </TabsContent>
    </Tabs>
    <div className='absolute w-full bottom-5'>
      <SettingsBar openTechList={()=>setShowTechList(true)} deletefunc={deleteCrow} archivefunc={archiveCrow} />
    </div>
    </Layout>
    </>
  )
}