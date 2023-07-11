import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { Button } from "../ui/button"
import { Collapsible } from "../ui/collapsible"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { api } from "~/utils/api"


export type Preflight = {
    id: string
    question: string
    answer?: string
    setButton?: boolean
}

const PreflightList = ( { preflights} : {preflights: Preflight[]} ) => {
    const [ showSaveButton, setShowSaveButton ] = useState<boolean>(false)

    const updateAnswer = api.preflight.updatePreflight.useMutation()

    const saveResponse = (response: string, id: string) => {
        console.log(response, id)
        updateAnswer.mutate({id, response})
    }

    return (
        <>
        <div className="w-2/3 pb-5 pt-20 mx-auto">
        { showSaveButton && <Button className='w-full mx-auto' variant={'secondary'}>Save Changes</Button>}
        </div>
        <div className="grid grid-cols-2 gap-5 mt-auto w-2/3 mx-auto">
            {
                preflights.map((preflight: Preflight) => (
                    <>
                    <Preflight saveResponse={saveResponse} preflight={preflight} />
                    </>
                ))
            }
        </div>
        </>
    )
}

export default PreflightList

const Preflight = ({preflight, saveResponse} : { preflight: Preflight, saveResponse: (response: string, id: string) => void }) => {
    const [ selectedQuestion, setSelectedQuestion ] = useState<Preflight | undefined>(undefined)

    const submitQuestion = () => {
        if(preflight.answer !== selectedQuestion?.answer){
            saveResponse(selectedQuestion?.answer!, preflight.id)
        }
    }

    
        return (
            <Collapsible key={preflight.id} className="rounded-xl bg-foreground p-5 opacity-80 shadow-lg">
                <CollapsibleTrigger>
                <strong className="text-gray-100">{preflight.question}</strong>
                </CollapsibleTrigger>
                <CollapsibleContent>
                <Textarea onFocus={()=>setSelectedQuestion(preflight)} onChange={(e)=>selectedQuestion && setSelectedQuestion({...selectedQuestion, answer: e.currentTarget.value || selectedQuestion.answer})} onBlur={()=>submitQuestion()} value={selectedQuestion?.answer} className="w-full text-gray-100" />
                </CollapsibleContent>
            </Collapsible>
        )
}