import { Integer } from './extensions'

export const capitalized = (text: string): string => text.charAt(Integer.ZERO).toUpperCase() + text.slice(Integer.ONE)
