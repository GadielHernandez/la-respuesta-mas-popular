import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes with proper conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for handling Tailwind class conflicts
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * cn('px-4 py-2', 'bg-blue-500', isActive && 'bg-red-500')
 * // Returns: 'px-4 py-2 bg-red-500' (bg-red-500 overrides bg-blue-500)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
