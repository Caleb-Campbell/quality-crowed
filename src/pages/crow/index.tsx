import { Layout } from '~/Templates/Layout'
import { Button } from '~/components/ui/button'
import StackedList from '~/components/StackedList'
import { DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, Dialog } from '~/components/ui/dialog'
import { FormEvent, useEffect, useState } from 'react'
import { Input } from '~/components/ui/input'
import { signIn, useSession } from 'next-auth/react'
import { api } from '~/utils/api'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Crow() {
  const [titleInput, setTitleInput] = useState<string | undefined>(undefined)
  const [crows, setCrows] = useState<any[] | undefined>([])

  const { data: session } = useSession()

  const createCrow = api.crow.create.useMutation()
  
  const { data } = api.crow.getAllCrows.useQuery({userId: session?.user.id || ''})
  
  useEffect(() => {
    if(data) setCrows(data)
  }, [data])
  
  const createNewCrow = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!titleInput) return console.error('no title')
    if(!session) return console.error('no session')
    
    createCrow.mutate({name: titleInput, userId: session.user.id})
  }
  
  
  if(!session) return (
    <Layout>
      <div className=" h-[80vh] flex overflow-hidden bg-background">
        <Button onClick={()=>signIn()} className='absolute z-50 top-10 left-10 bg-background opacity-70'>
          Sign In
        </Button>
      </div>
    </Layout>
  )

  return (
    <>
    <Button className='absolute z-50 top-10 left-10 bg-background opacity-70'>
      <a href='/'>
        Back
      </a>
    </Button>
    <Layout>
    <Dialog>
      <DialogTrigger asChild>
        <Button className='self-end mb-10 opacity-40 hover:opacity-100 transition-opacity'>
          Add an Issue
        </Button>
      </DialogTrigger>
      <DialogContent className='opacity-70'>
        <DialogHeader>
          <DialogTitle className='text-gray-100'>Create an Issue</DialogTitle>
        </DialogHeader>
          <form onSubmit={createNewCrow}>
            <Input value={titleInput} onChange={(e)=>setTitleInput(e.currentTarget.value)} className='focus:border-none text-lg text-gray-100' />
            <Button type='submit' className='self-end mt-10 opacity-40 hover:opacity-100 transition-opacity'>
              Create
            </Button>
          </form>
      </DialogContent>
    </Dialog>
      <div className=" h-[80vh] flex overflow-hidden bg-background">
        <StackedList crows={crows} />
      </div>
    </Layout>
    </>
  )

}
