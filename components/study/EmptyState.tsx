import { Lightbulb } from "lucide-react"
import SampleQuery from "@/components/ui-elements/SampleQuery"

interface EmptyStateProps {
  message?: string; // Make message prop optional
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md">
        <div className="rounded-full bg-primary-100 p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center dark:bg-primary-900/30">
          <Lightbulb className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 dark:text-white">
          {message ? "Information" : "Start Your USMLE Study Session"} 
        </h3>
        <p className="text-gray-500 mb-6 dark:text-gray-400">
          {message || 
            "Search for USMLE topics or ask questions using special tags like #hy, #patho, or #HDT to get targeted responses from your source documents."}
        </p>
        {!message && (
          <div className="space-y-2">
            <SampleQuery query="Cystic Fibrosis pathophysiology #hy" />
            <SampleQuery query="Nephrotic syndrome #labs" />
            <SampleQuery query="Diabetes insipidus vs SIADH #HDT" />
            <SampleQuery query="Patient with fever, rash, joint pain #diff" />
          </div>
        )}
      </div>
    </div>
  )
}
