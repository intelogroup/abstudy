"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Layers, Clock } from "lucide-react"
import SearchBar from "@/components/search/SearchBar"
import ResponseArea from "@/components/study/ResponseArea"

interface MainContentProps {
  activeTab: string
  setActiveTab: (tab: any) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  responseMode: string
  setResponseMode: (mode: any) => void
  geminiResponse: string
  isLoading: boolean
  apiError: string | null
  onSearchSubmit: () => Promise<void>
}

export default function MainContent({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  responseMode,
  setResponseMode,
  geminiResponse,
  isLoading,
  apiError,
  onSearchSubmit,
}: MainContentProps) {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Feature Tabs */}
      <Card className="border-primary-100 dark:border-primary-900 dark:bg-gray-800 transition-colors duration-200">
        <CardContent className="p-0">
          <Tabs defaultValue="search" onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="w-full rounded-none h-12">
              <TabsTrigger
                value="search"
                className="flex-1 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/30"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </TabsTrigger>
              <TabsTrigger
                value="flashcards"
                className="flex-1 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/30"
              >
                <Layers className="h-4 w-4 mr-2" />
                Flashcards
              </TabsTrigger>
              <TabsTrigger
                value="timer"
                className="flex-1 data-[state=active]:bg-primary-50 dark:data-[state=active]:bg-primary-900/30"
              >
                <Clock className="h-4 w-4 mr-2" />
                Study Timer
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearchSubmit={onSearchSubmit} />

      {/* Response Area */}
      <ResponseArea searchQuery={searchQuery} responseMode={responseMode} setResponseMode={setResponseMode} geminiResponse={geminiResponse} isLoading={isLoading} apiError={apiError} />
    </div>
  )
}
