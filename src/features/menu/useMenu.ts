import { menu } from './data/menu'

/**
 * Today the menu comes from a local file.
 * When the backend exists, only these hooks change; the screens stay the same.
 */
export function useMenu() {
  return menu
}

export function useMenuItem(itemId: string | undefined) {
  return menu.items.find((item) => item.id === itemId)
}
