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
import { ArrowDownNarrowWide, Trash2, X } from 'lucide-react'
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '~/components/ui/dialog'
import { DialogHeader } from '~/components/ui/dialog'
import { Snippet, Step } from '@prisma/client'
import { Editor } from '@monaco-editor/react'
import { Collapsible, CollapsibleTrigger } from '~/components/ui/collapsible'
import { CollapsibleContent } from '@radix-ui/react-collapsible'
import { set } from 'zod'

type StepWithSnippet = Step & {snippet: Snippet[]}
 
export default function Page() {
  const [ crowData, setCrowData ] = useState<any | undefined>(undefined)
  const [ issueInput, setIssueInput ] = useState<string>('')
  const [ showTechList, setShowTechList ] = useState<boolean>(false)
  const [ techInput, setTechInput ] = useState<string>('')
  const [ stepTitleInput, setStepTitleInput ] = useState<{title: string, content:string}>({
    title: '',
    content: ''
  })
  const [selectedSnippet, setSelectedSnippet] = useState<string | undefined>(undefined)

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
  const createStep = api.step.createStep.useMutation()
  const newSnippet = api.step.createSnippet.useMutation()
  const deleteSnippet = api.step.deleteSnippet.useMutation()
  const updateSnippet = api.step.updateSnippet.useMutation()
  
  const deleteCrow = () => {
    deleteHandler.mutate({id: crow as string}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
    router.push('/crow')
    context.crow.invalidate()
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

  const createNewSnippet = (id: string) => {
    if(!data?.steps[0]?.id) return console.error('no step id')
    newSnippet.mutate({stepId: id}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
  }

  const removeSnippet = (id: string) => {
    deleteSnippet.mutate({snippetId: id}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
  }

  const submitNewStep = (e: FormEvent) => {
    e.preventDefault()
    createStep.mutate({title: stepTitleInput.title, content: stepTitleInput.content, crowId: data!.id}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
    setStepTitleInput({
      title: '',
      content: ''
    })
  }

  const handleUpdateSnippet = (id: string) => {
    const stuff = selectedSnippet!
    setSelectedSnippet(undefined)
    if(!selectedSnippet) return console.error('no snippet')
    updateSnippet.mutate({snippetId: id, content: stuff}, {
      onSuccess: () => {
        context.crow.invalidate()
      }
    })
  }



  return (
    <>
      <Modal open={showTechList} setOpen={setShowTechList}>
        <div className='max-w-sm'>

        <div className='mb-10 rounded-xl'>
          <p className='text-gray-100 text-2xl text-center pt-3'>{ isLoading ? 'Loading' : 'List Tech Used'}</p>
          <form onSubmit={submitTech} className='flex justify-around'>
            <Input value={techInput} onChange={(e)=>setTechInput(e.currentTarget.value)} className='w-8/12 mt-5 focus:border-none text-primary-foreground' />
            <Button className='w-3/12 mt-5' variant='secondary' >Add</Button>
          </form>
        </div>
        <div className='flex flex-wrap items-start justify-start gap-3 h-80 p-5'>
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
      <TabsContent className='min-h-[65vh] overflow-y-scroll' value="steps">
        <div className='h-40 w-6/12 mx-auto'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='w-full'>
              Add a Step
            </Button>
          </DialogTrigger>
          <DialogContent className='opacity-70'>
            <DialogHeader>
              <DialogTitle className='text-gray-100'>Title Your Step</DialogTitle>
            </DialogHeader>
              <form onSubmit={submitNewStep}>
                <Input value={stepTitleInput.title} onChange={(e) => setStepTitleInput({...stepTitleInput, title: e.currentTarget.value})} className='focus:border-none text-lg text-gray-100' />
                <Textarea value={stepTitleInput.content} onChange={(e) => setStepTitleInput({...stepTitleInput, content: e.currentTarget.value})} className='focus:border-none mt-10 text-lg text-gray-100' rows={4} />
                <Button type='submit' className='self-end mt-10 opacity-40 hover:opacity-100 transition-opacity'>
                  Create
                </Button>
              </form>
          </DialogContent>
        </Dialog>
          {
            data?.steps.length === 0 && (
              <div className="flex text-center w-4/12 mx-auto flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-100 mb-10">No Steps</h1>
              </div>
            )
          }
          {
            data?.steps.map((step: any) => (
              <div className='opacity-70 mt-10 p-10 h-fit rounded-xl'>
                <Collapsible title={step.title} className='mb-10'>
                  <CollapsibleTrigger className=' p-1 w-full'>
                <p className='text-primary-foreground text-center text-xl w-full mb-3 underline'>{step.title} <ArrowDownNarrowWide className='inline' color='white' /> </p>
                  </CollapsibleTrigger>
                  <CollapsibleContent className='overflow-auto p-10 rounded-xl'>
                    <Button onClick={()=>createNewSnippet(step.id)} className='w-full mb-10'>
                      Add Code Snippet
                    </Button>
                    <div className='flex flex-col gap-20 pb-10'>
                      {
                        step.snippet && step.snippet.map((snip: Snippet) => {
                          return (
                            <div key={snip.id} className='h-[200px] my-20' >
                              <Editor
                                height={'30vh'}
                                className='w-full rounded-xl p-1'
                                language={"typescript"}
                                value={selectedSnippet}
                                theme={'vs-dark'}
                                defaultValue={snip.content}
                                onChange={(e)=>setSelectedSnippet(e)}
                                />
                              <div className='mb-0 flex justify-end'>
                                <Button onClick={()=>handleUpdateSnippet(snip.id)}>
                                  Save
                                </Button>
                                <Button onClick={()=>removeSnippet(snip.id)} className='w-1/12 p-0 mx-2' variant='ghost'><Trash2 /></Button>
                              </div>
                            </div>
                                )
                          })
                      }
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))
          }
        </div>
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