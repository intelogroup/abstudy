import { Badge } from "@/components/ui/badge"

interface StudyTagProps {
  label: string
  count?: number
  type?: string
}

export default function StudyTag({ label, count, type = "" }: StudyTagProps) {
  const getTagClass = () => {
    switch (type) {
      case "hy":
        return "tag-hy"
      case "patho":
        return "tag-patho"
      case "physio":
        return "tag-physio"
      case "labs":
        return "tag-labs"
      case "img":
        return "tag-img"
      case "hdt":
        return "tag-hdt"
      case "diff":
        return "tag-diff"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <Badge
      variant="outline"
      className={`rounded-full px-3 py-1 border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors group dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 ${
        type ? "border-transparent" : ""
      }`}
    >
      <span
        className={`text-gray-700 group-hover:text-accent-700 transition-colors dark:text-gray-300 dark:group-hover:text-accent-400 ${
          type ? getTagClass() : ""
        }`}
      >
        {label}
      </span>
      {count && (
        <span className="ml-1 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full group-hover:bg-accent-100 group-hover:text-accent-600 transition-colors dark:bg-gray-600 dark:text-gray-400 dark:group-hover:bg-accent-900/50 dark:group-hover:text-accent-300">
          {count}
        </span>
      )}
    </Badge>
  )
}
