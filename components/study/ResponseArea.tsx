"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Filter, Search, Zap, Table, ListTree, ChevronDown, Loader2 } from "lucide-react"
import EmptyState from "@/components/study/EmptyState"
import GeneralResponse from "@/components/study/responses/GeneralResponse"
import HighYieldResponse from "@/components/study/responses/HighYieldResponse"
import HDTResponse from "@/components/study/responses/HDTResponse"
import DifferentialResponse from "@/components/study/responses/DifferentialResponse"

interface ResponseAreaProps {
  searchQuery: string
  responseMode: string
  setResponseMode: (mode: any) => void
  geminiResponse: string
  isLoading: boolean
  apiError: string | null
}

export default function ResponseArea({ 
  searchQuery, 
  responseMode, 
  setResponseMode, 
  geminiResponse, 
  isLoading, 
  apiError 
}: ResponseAreaProps) {

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
          <Loader2 className="h-12 w-12 animate-spin mb-4" />
          <p className="text-lg">Loading response...</p>
        </div>
      );
    }

    if (apiError) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-red-600 dark:text-red-400 p-4">
          <p className="text-lg font-semibold">Error:</p>
          <p className="text-center">{apiError}</p>
        </div>
      );
    }

    if (geminiResponse) {
      return <GeneralResponse responseData={geminiResponse} />;
    }
    
    if (!searchQuery && !geminiResponse) {
        return <EmptyState />;
    }

    if (searchQuery && !geminiResponse && !isLoading && !apiError) {
        return <EmptyState message="No specific results for your query yet. Try refining your search or asking differently."/>
    }

    return <EmptyState />;
  };

  return (
    <Card className="flex-1 min-h-[600px] border-primary-100 dark:border-primary-900 dark:bg-gray-800 transition-colors duration-200 flex flex-col">
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-medium dark:text-white">Study Results</CardTitle>
            <Badge variant="outline" className="text-xs font-normal dark:border-gray-600 dark:text-gray-300">
              {isLoading ? "Fetching..." : geminiResponse ? "1 source (Gemini)" : "AI Powered"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1 border-accent-200 dark:border-accent-800">
                  <span className="text-xs">Mode: {responseMode}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-accent-100 dark:border-accent-900">
                <DropdownMenuItem onClick={() => setResponseMode("general")}>
                  <Search className="h-3 w-3 mr-2" />
                  General Query
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResponseMode("hy")}>
                  <Zap className="h-3 w-3 mr-2 text-accent-500" />
                  High-Yield Snippets
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResponseMode("hdt")}>
                  <Table className="h-3 w-3 mr-2 text-accent-500" />
                  High Distractors Table
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setResponseMode("diff")}>
                  <ListTree className="h-3 w-3 mr-2 text-accent-500" />
                  Differential Analysis
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-6 dark:bg-gray-600" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Filter by source (Not implemented)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col">
        {renderContent()}
      </CardContent>
    </Card>
  )
}
