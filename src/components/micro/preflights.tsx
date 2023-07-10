import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"


type Preflight = {
    id: string
    question: string
    answer?: string
}

const PreflightList = ( { preflights} : {preflights: Preflight[]} ) => {


    return (
        <div className="grid grid-cols-2 gap-5 pt-20 mt-auto w-2/3 mx-auto">
            {
                preflights.map((preflight: Preflight) => (
                    <Preflight preflight={preflight} />
                ))
            }
        </div>
    )
}

export default PreflightList

const Preflight = ({preflight} : { preflight: Preflight}) => {
    
        return (
            <div key={preflight.id} className="rounded-xl bg-foreground p-5 opacity-80 shadow-lg">
                <p className="text-gray-100">{preflight.id}</p>
                <strong className="text-gray-100">{preflight.question}</strong>
                <Textarea className="w-full text-gray-100" />
            </div>
        )
}