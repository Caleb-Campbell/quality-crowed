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
            <div key={preflight.id} className="rounded-xl bg-gray-100 p-5 opacity-70 shadow-lg">
                <strong className="my-2 py-2">{preflight.question}</strong>
                <Textarea className="w-full text-white py-2 bg-foreground opacity-40" />
            </div>
        )
}