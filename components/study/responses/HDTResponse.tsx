import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, Copy, Download } from "lucide-react"

export default function HDTResponse() {
  return (
    <div className="space-y-6">
      {/* Response Header */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-800">
        <h3 className="font-medium text-yellow-800 mb-2 dark:text-yellow-300 flex items-center">
          <Table className="h-4 w-4 mr-2" />
          High Distractors Table: Diabetes Insipidus vs SIADH
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            First Aid 2025
          </Badge>
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            BRS Physiology
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing key differentiating features between these conditions.
        </p>
      </div>

      {/* HDT Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 medical-table">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Central Diabetes Insipidus</th>
              <th>Nephrogenic Diabetes Insipidus</th>
              <th>SIADH</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm dark:bg-gray-800 dark:divide-gray-700">
            <tr>
              <td className="font-medium dark:text-gray-300">Pathophysiology</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓ ADH production/secretion</span>
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Renal resistance to ADH</span>
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑ ADH secretion</span>
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Serum Osmolality</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑</span> (&gt;295 mOsm/kg)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑</span> (&gt;295 mOsm/kg)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓</span> (&lt;280 mOsm/kg)
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Urine Osmolality</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓</span> (&lt;100 mOsm/kg)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓</span> (&lt;100 mOsm/kg)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑</span> (&gt;100 mOsm/kg, inappropriately concentrated)
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Serum Sodium</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑</span> (Hypernatremia)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑</span> (Hypernatremia)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓</span> (Hyponatremia)
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Urine Volume</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑↑</span> (Polyuria)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑↑</span> (Polyuria)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↓</span> (Oliguria)
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Response to Water Deprivation</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">No concentration</span> of urine
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">No concentration</span> of urine
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Continued concentration</span> of urine
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Response to ADH (Desmopressin)</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">↑ Urine osmolality</span> (positive response)
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">No change</span> in urine osmolality
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Minimal effect</span> (already high ADH)
              </td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">Common Causes</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Pituitary surgery</span>, head trauma, tumors
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Lithium</span>, demeclocycline, hypercalcemia
              </td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Small cell lung cancer</span>, CNS disorders, drugs
              </td>
            </tr>
          </tbody>
        </table>
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
            Save
          </Button>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-accent-600 border-accent-200 hover:bg-accent-50 dark:text-accent-400 dark:border-accent-800 dark:hover:bg-accent-900/20"
          >
            <Table className="h-3 w-3 mr-1 text-accent-500" />
            Compare with other conditions
          </Button>
        </div>
      </div>
    </div>
  )
}
