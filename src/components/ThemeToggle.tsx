import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ThemeToggleProps {
  theme: 'light' | 'dark'
  onThemeChange: (theme: 'light' | 'dark') => void
}

export function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    onThemeChange(newTheme)
  }

  const isLight = theme === 'light'
  const buttonClasses = isLight
    ? 'bg-white/90 hover:bg-white border-gray-200 text-gray-800 shadow-lg hover:shadow-xl'
    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md'

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 transition-all duration-300 hover:scale-110 border ${buttonClasses}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}
