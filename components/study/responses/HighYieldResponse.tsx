import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Copy, Download } from "lucide-react"

export default function HighYieldResponse() {
  return (
    <div className="space-y-6">
      {/* Response Header */}
      <div className="bg-accent-50 p-4 rounded-lg border border-accent-200 dark:bg-accent-900/10 dark:border-accent-800">
        <h3 className="font-medium text-accent-800 mb-2 dark:text-accent-300 flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          Cystic Fibrosis High-Yield Facts
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-accent-100 text-accent-800 hover:bg-accent-200 dark:bg-accent-900/30 dark:text-accent-300"
          >
            First Aid 2025
          </Badge>
          <Badge
            variant="secondary"
            className="bg-accent-100 text-accent-800 hover:bg-accent-200 dark:bg-accent-900/30 dark:text-accent-300"
          >
            Pathoma 2023
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing high-yield facts from 2 sources. Click "Want another?" for more facts.
        </p>
      </div>

      {/* High-Yield Facts */}
      <div className="space-y-4">
        <div className="high-yield-item">
          <h4 className="font-medium text-accent-800 dark:text-accent-300 mb-1">Genetic Basis</h4>
          <p className="text-sm dark:text-gray-300">
            Most common mutation is <span className="buzzword">ΔF508</span> (deletion of phenylalanine at position 508)
            in the CFTR gene on chromosome 7. This is an <span className="buzzword">autosomal recessive</span> disorder.
          </p>
        </div>

        <div className="high-yield-item">
          <h4 className="font-medium text-accent-800 dark:text-accent-300 mb-1">Diagnostic Gold Standard</h4>
          <p className="text-sm dark:text-gray-300">
            <span className="buzzword">Sweat chloride test</span> is the gold standard for diagnosis. Chloride
            concentration &gt;60 mEq/L is diagnostic of CF.
          </p>
        </div>

        <div className="high-yield-item">
          <h4 className="font-medium text-accent-800 dark:text-accent-300 mb-1">Pathognomonic Finding</h4>
          <p className="text-sm dark:text-gray-300">
            <span className="buzzword">Meconium ileus</span> in a newborn is virtually pathognomonic for cystic
            fibrosis.
          </p>
        </div>

        <div className="high-yield-item">
          <h4 className="font-medium text-accent-800 dark:text-accent-300 mb-1">Male Infertility</h4>
          <p className="text-sm dark:text-gray-300">
            <span className="buzzword">Congenital bilateral absence of vas deferens</span> (CBAVD) is present in 95% of
            males with CF, causing obstructive azoospermia and infertility.
          </p>
        </div>
      </div>

      {/* Response Actions */}
      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-xs gap-1 dark:border-gray-700 dark:text-gray-300">
            <Copy className="h-3 w-3" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="text-xs gap-1 dark:border-gray-700 dark:text-gray-300">
            <Download className="h-3 w-3" />
            Save to Flashcards
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-accent-600 border-accent-200 hover:bg-accent-50 dark:text-accent-400 dark:border-accent-800 dark:hover:bg-accent-900/20"
          >
            Want another?
          </Button>
        </div>
      </div>
    </div>
  )
}
