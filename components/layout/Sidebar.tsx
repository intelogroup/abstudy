import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, PlusCircle, ChevronDown, Microscope, Beaker, Brain, Heart } from "lucide-react"
import StudyTag from "@/components/ui-elements/StudyTag"
import SourceDocument from "@/components/ui-elements/SourceDocument"

export default function Sidebar() {
  return (
    <div className="w-80 flex-shrink-0 hidden md:flex flex-col gap-6">
      {/* USMLE Steps */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 border-accent-100 dark:border-accent-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium dark:text-white">USMLE Steps</CardTitle>
          <CardDescription className="text-xs dark:text-gray-400">Select your exam focus</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <Tabs defaultValue="step1">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger
                value="step1"
                className="data-[state=active]:bg-accent-100 data-[state=active]:text-accent-800 dark:data-[state=active]:bg-accent-900/30 dark:data-[state=active]:text-accent-300"
              >
                Step 1
              </TabsTrigger>
              <TabsTrigger value="step2">Step 2</TabsTrigger>
              <TabsTrigger value="step3">Step 3</TabsTrigger>
            </TabsList>
            <TabsContent value="step1" className="pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Focus on basic science concepts and their application to medical practice.
              </p>
            </TabsContent>
            <TabsContent value="step2" className="pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Focus on clinical knowledge and application for patient care.
              </p>
            </TabsContent>
            <TabsContent value="step3" className="pt-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Focus on applying medical knowledge in unsupervised practice.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Source Documents */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium dark:text-white">Source Documents</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-accent-500 hover:text-accent-600 dark:text-accent-400 dark:hover:text-accent-300"
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new source document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <ScrollArea className="h-[140px] pr-4">
            <SourceDocument title="First Aid for USMLE Step 1 2025" type="PDF" active />
            <SourceDocument title="Pathoma 2023" type="PDF" />
            <SourceDocument title="BRS Physiology 7th Edition" type="PDF" />
            <SourceDocument title="2025 FAS1 Review Resources" type="PDF" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Study Tags */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium dark:text-white">Study Tags</CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <span className="text-xs dark:text-gray-300">Filter</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>All Tags</DropdownMenuItem>
                <DropdownMenuItem>Recently Used</DropdownMenuItem>
                <DropdownMenuItem>Most Used</DropdownMenuItem>
                <DropdownMenuItem>Alphabetical</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tags..."
              className="pl-8 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <StudyTag label="#hy" count={12} type="hy" />
            <StudyTag label="#labs" count={8} type="labs" />
            <StudyTag label="#patho" count={15} type="patho" />
            <StudyTag label="#physio" count={7} type="physio" />
            <StudyTag label="#img" count={5} type="img" />
            <StudyTag label="#histo" count={9} />
            <StudyTag label="#gen" count={6} />
            <StudyTag label="#biochem" count={11} />
            <StudyTag label="#HDT" count={4} type="hdt" />
            <StudyTag label="#diff" count={7} type="diff" />
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs justify-start text-gray-500 hover:text-accent-700 dark:text-gray-400 dark:hover:text-accent-400"
          >
            <PlusCircle className="h-3 w-3 mr-1" />
            Create custom tag
          </Button>
        </CardFooter>
      </Card>

      {/* Quick Reference */}
      <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200 border-accent-100 dark:border-accent-900/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium dark:text-white">Quick Reference</CardTitle>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-2 border-accent-200 hover:border-accent-300 hover:bg-accent-50 dark:border-accent-800 dark:hover:border-accent-700 dark:hover:bg-accent-900/20"
            >
              <Microscope className="h-4 w-4 mr-2 text-accent-600 dark:text-accent-400" />
              <span className="text-sm">Pathology Buzzwords</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2">
              <Beaker className="h-4 w-4 mr-2 text-primary-600" />
              <span className="text-sm">Lab Value Reference</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2">
              <Brain className="h-4 w-4 mr-2 text-primary-600" />
              <span className="text-sm">Neuroanatomy Guide</span>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-left h-auto py-2">
              <Heart className="h-4 w-4 mr-2 text-primary-600" />
              <span className="text-sm">Cardiac Pathways</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
