import { menu } from './data/menu'

/**
 * Today the menu comes from a local file.
 * When the backend exists, only this hook changes; the screens stay the same.
 */
export function useMenu() {
  return menu
}
