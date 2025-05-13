"use client"

import { useTheme } from "next-themes"
import { Home, BookOpen, FileQuestion, Mail, Menu, X, Moon, Sun, Bell, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import NavItem from "@/components/ui-elements/NavItem"
import MobileNavItem from "@/components/ui-elements/MobileNavItem"

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <h1 className="text-xl font-bold flex items-center">
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent border-b-2 border-primary-500">
                AnnaBerg
              </span>
              <span className="ml-1 font-extrabold px-2 py-0.5 bg-primary-700 text-white rounded-md dark:bg-primary-800">
                STUDY
              </span>
            </h1>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavItem icon={<Home className="h-5 w-5" />} label="Home" active />
            <NavItem icon={<BookOpen className="h-5 w-5" />} label="Library" />
            <NavItem icon={<FileQuestion className="h-5 w-5" />} label="Questions" />
            <NavItem icon={<Mail className="h-5 w-5" />} label="Message" />

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="rounded-full h-8 w-8"
                    >
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {theme === "dark" ? "light" : "dark"} mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 relative">
                      <Bell className="h-4 w-4" />
                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent-500"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Avatar className="h-8 w-8 border border-primary-100 dark:border-primary-800">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback className="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium dark:text-gray-200">Anna</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-accent-100 dark:border-accent-900">
                  <DropdownMenuItem className="hover:bg-accent-50 dark:hover:bg-accent-900/20">
                    <User className="mr-2 h-4 w-4 text-accent-500" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Study History</DropdownMenuItem>
                  <DropdownMenuItem>Help</DropdownMenuItem>
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 space-y-1">
            <MobileNavItem icon={<Home className="h-5 w-5" />} label="Home" active />
            <MobileNavItem icon={<BookOpen className="h-5 w-5" />} label="Library" />
            <MobileNavItem icon={<FileQuestion className="h-5 w-5" />} label="Questions" />
            <MobileNavItem icon={<Mail className="h-5 w-5" />} label="Message" />
            <MobileNavItem icon={<User className="h-5 w-5" />} label="Profile" />
          </div>
        </div>
      )}
    </header>
  )
}
