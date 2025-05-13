import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ListTree, Copy, Download, HelpCircle } from "lucide-react"

export default function DifferentialResponse() {
  return (
    <div className="space-y-6">
      {/* Response Header */}
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 dark:bg-indigo-900/10 dark:border-indigo-800">
        <h3 className="font-medium text-indigo-800 mb-2 dark:text-indigo-300 flex items-center">
          <ListTree className="h-4 w-4 mr-2" />
          Differential Diagnosis: Patient with fever, rash, joint pain
        </h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge
            variant="secondary"
            className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            First Aid 2025
          </Badge>
          <Badge
            variant="secondary"
            className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            Pathoma 2023
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing differential diagnoses based on the provided symptoms.
        </p>
      </div>

      {/* Differential Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 medical-table">
          <thead>
            <tr>
              <th>Diagnosis</th>
              <th>Reason for Consideration</th>
              <th>Key Differentiating Clue</th>
              <th>Suggested Next Steps</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-sm dark:bg-gray-800 dark:divide-gray-700">
            <tr>
              <td className="font-medium dark:text-gray-300">
                <span className="buzzword">Systemic Lupus Erythematosus</span>
              </td>
              <td className="dark:text-gray-300">Classic triad of fever, rash (especially malar), and joint pain</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Photosensitivity</span>, malar "butterfly" rash, oral ulcers
              </td>
              <td className="dark:text-gray-300">ANA, anti-dsDNA, CBC, urinalysis</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">
                <span className="buzzword">Rheumatoid Arthritis</span>
              </td>
              <td className="dark:text-gray-300">Joint pain with systemic symptoms</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Symmetric polyarthritis</span>, morning stiffness &gt;1 hour
              </td>
              <td className="dark:text-gray-300">RF, anti-CCP, joint X-rays</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">
                <span className="buzzword">Lyme Disease</span>
              </td>
              <td className="dark:text-gray-300">Fever, migratory joint pain, and rash</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Erythema migrans</span> (bull's-eye rash), tick exposure history
              </td>
              <td className="dark:text-gray-300">Lyme serology (ELISA followed by Western blot)</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">
                <span className="buzzword">Adult Still's Disease</span>
              </td>
              <td className="dark:text-gray-300">High spiking fevers, joint pain, and rash</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Salmon-colored rash</span>, quotidian fever pattern, sore throat
              </td>
              <td className="dark:text-gray-300">Ferritin (markedly elevated), CBC, liver enzymes</td>
            </tr>
            <tr>
              <td className="font-medium dark:text-gray-300">
                <span className="buzzword">Viral Exanthem</span>
              </td>
              <td className="dark:text-gray-300">Fever, rash, and myalgias/arthralgias</td>
              <td className="dark:text-gray-300">
                <span className="buzzword">Self-limited course</span>, upper respiratory symptoms
              </td>
              <td className="dark:text-gray-300">Viral studies if needed, supportive care</td>
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
            <HelpCircle className="h-3 w-3 mr-1 text-accent-500" />
            Add more symptoms
          </Button>
        </div>
      </div>
    </div>
  )
}
