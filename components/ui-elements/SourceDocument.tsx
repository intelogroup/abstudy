import { Button } from "@/components/ui/button"
import { FileText, ChevronDown } from "lucide-react"

interface SourceDocumentProps {
  title: string
  type: string
  active?: boolean
}

export default function SourceDocument({ title, type, active = false }: SourceDocumentProps) {
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md mb-1 ${
        active ? "bg-accent-50 dark:bg-accent-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700"
      } cursor-pointer transition-colors`}
    >
      <div className="flex items-center">
        <div
          className={`w-8 h-8 rounded flex items-center justify-center ${
            active
              ? "bg-accent-100 text-accent-700 dark:bg-accent-900 dark:text-accent-300"
              : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          <FileText className="h-4 w-4" />
        </div>
        <div className="ml-2">
          <p
            className={`text-sm font-medium ${
              active ? "text-accent-700 dark:text-accent-300" : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{type}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <ChevronDown className="h-3 w-3" />
      </Button>
    </div>
  )
}
