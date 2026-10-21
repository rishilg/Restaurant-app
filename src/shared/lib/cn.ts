import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Join class names and resolve conflicting Tailwind classes (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
