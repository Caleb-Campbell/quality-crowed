import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import { useRouter } from "next/router"
import { Crow } from "@prisma/client"
  
  export default function StackedList({crows}: {crows: Crow[] | undefined}) {

    const router = useRouter()

    if (crows === undefined) return (
      <div className="flex  w-full h-full flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-100">No crows found</h1>
        <Button className="mt-6">
            Create an issue
        </Button>
      </div>
    )

    return (
      <Table>
      <TableCaption className="absolute mx-auto text-center bottom-5">A list of your recent crows.</TableCaption>
      <TableHeader>
        <TableRow className="text-gray-100">
          <TableHead className="w-[100px] text-gray-100">Invoice</TableHead>
          <TableHead className="text-gray-100">Status</TableHead>
          <TableHead className="text-gray-100">Name</TableHead>
          <TableHead className="text-right text-gray-100">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crows.map((crow: Crow) => (
          <TableRow onClick={()=>router.push(`/crow/${crow.id}`)} className="cursor-pointer hover:opacity-80" key={crow.id}>
            <TableCell  className="font-medium text-gray-100 truncate w-12">{crow.id}</TableCell>
            <TableCell className="text-gray-100 truncate">OPEN</TableCell>
            <TableCell className="text-gray-100 truncate">{crow.name}</TableCell>
            <TableCell className="text-right text-gray-100 truncate">{crow.id}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
  }
  