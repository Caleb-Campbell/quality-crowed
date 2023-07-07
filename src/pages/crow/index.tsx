import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Layout } from '~/Templates/Layout'
import { Button } from '~/components/ui/button'
import StackedList from '~/components/StackedList'
import { DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, Dialog } from '~/components/ui/dialog'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Crow() {

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-gray-100'>Create an Issue</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <form>
            
          </form>
        </DialogContent>
      </DialogContent>
    </Dialog>
      <div className=" h-[80vh] flex overflow-hidden bg-background">
        <StackedList />
      </div>
    </Layout>
    </>
  )

}
