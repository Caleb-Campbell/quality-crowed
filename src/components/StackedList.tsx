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

const crows = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
  
  export default function StackedList() {

    if (crows.length === 0) return (
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
          <TableHead className="text-gray-100">Method</TableHead>
          <TableHead className="text-right text-gray-100">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crows.map((invoice) => (
          <TableRow className="cursor-pointer" key={invoice.invoice}>
            <TableCell  className="font-medium text-gray-100">{invoice.invoice}</TableCell>
            <TableCell className="text-gray-100">{invoice.paymentStatus}</TableCell>
            <TableCell className="text-gray-100">{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right text-gray-100">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
  }
  