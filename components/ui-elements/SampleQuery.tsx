import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SampleQueryProps {
  query: string
}

export default function SampleQuery({ query }: SampleQueryProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full justify-start text-left h-auto py-2 border-dashed border-gray-300 hover:border-accent-300 hover:bg-accent-50/50 dark:border-gray-600 dark:hover:border-accent-700 dark:hover:bg-accent-900/20"
    >
      <Search className="h-3 w-3 mr-2 text-gray-400" />
      <span className="text-sm dark:text-gray-300">{query}</span>
    </Button>
  )
}
