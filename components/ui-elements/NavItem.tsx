import type React from "react"
interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

export default function NavItem({ icon, label, active = false }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md cursor-pointer ${
        active ? "bg-primary-50 dark:bg-primary-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
      }`}
    >
      <div
        className={`${
          active
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400"
        } transition-colors`}
      >
        {icon}
      </div>
      <span
        className={`text-sm font-medium ${
          active
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-400"
        } transition-colors`}
      >
        {label}
      </span>
    </div>
  )
}
