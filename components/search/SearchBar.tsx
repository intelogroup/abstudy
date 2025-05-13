"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Bookmark, Send } from "lucide-react"
import React from "react";

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearchSubmit: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, onSearchSubmit }: SearchBarProps) {
  
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearchSubmit();
  };
  
  return (
    <Card className="border-primary-100 dark:border-primary-900 dark:bg-gray-800 transition-colors duration-200">
      <CardContent className="p-4">
        <form onSubmit={handleFormSubmit} className="relative">
          <Input
            placeholder="Search USMLE topics or ask a question..."
            className="pr-24 pl-10 py-6 text-base bg-white focus:ring-2 focus:ring-primary-500 transition-all border-primary-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full text-gray-500 hover:text-accent-500 hover:bg-accent-50 transition-colors dark:hover:bg-accent-900/30 dark:hover:text-accent-400"
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Save this search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button 
              type="submit"
              className="h-9 px-4 rounded-full bg-accent-600 hover:bg-accent-700 transition-colors dark:bg-accent-700 dark:hover:bg-accent-600">
              <Send className="h-4 w-4 text-white mr-1" />
              <span>Search</span>
            </Button>
          </div>
        </form>

        {searchQuery && (
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-1 text-xs flex items-center gap-1 bg-accent-100 text-accent-800 hover:bg-accent-200 cursor-pointer dark:bg-accent-900/20 dark:text-accent-300 dark:hover:bg-accent-900/30"
              onClick={() => setSearchQuery(searchQuery + " #hy")}
            >
              Add #hy
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-1 text-xs flex items-center gap-1 bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
              onClick={() => setSearchQuery(searchQuery + " #patho")}
            >
              Add #patho
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-1 text-xs flex items-center gap-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 cursor-pointer dark:bg-yellow-900/20 dark:text-yellow-300 dark:hover:bg-yellow-900/30"
              onClick={() => setSearchQuery(searchQuery + " #HDT")}
            >
              Add #HDT
            </Badge>
            <Badge
              variant="secondary"
              className="rounded-full px-2 py-1 text-xs flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200 cursor-pointer dark:bg-indigo-900/20 dark:text-indigo-300 dark:hover:bg-indigo-900/30"
              onClick={() => setSearchQuery(searchQuery + " #diff")}
            >
              Add #diff
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
