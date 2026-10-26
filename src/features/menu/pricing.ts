import type { MenuItem } from './schemas'

/** Price of ONE unit (base plus chosen options), in paise. */
export function unitPrice(item: MenuItem, optionIds: string[]): number {
  const extras = item.optionGroups
    .flatMap((group) => group.options)
    .filter((option) => optionIds.includes(option.id))
    .reduce((sum, option) => sum + option.priceDelta, 0)

  return item.basePrice + extras
}

/** Required single-choice groups start with their first option picked. */
export function defaultSelection(item: MenuItem): string[] {
  return item.optionGroups.flatMap((group) => {
    const first = group.options[0]
    return group.minSelect >= 1 && group.maxSelect === 1 && first ? [first.id] : []
  })
}

/** True when every group has between minSelect and maxSelect choices. */
export function isSelectionValid(item: MenuItem, optionIds: string[]): boolean {
  return item.optionGroups.every((group) => {
    const chosen = group.options.filter((option) => optionIds.includes(option.id)).length
    return chosen >= group.minSelect && chosen <= group.maxSelect
  })
}

/** Readable names of the chosen options, in menu order. */
export function optionNames(item: MenuItem, optionIds: string[]): string[] {
  return item.optionGroups
    .flatMap((group) => group.options)
    .filter((option) => optionIds.includes(option.id))
    .map((option) => option.name)
}
