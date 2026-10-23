import { z } from 'zod'

export const optionSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** Extra price in paise (0 = included). */
  priceDelta: z.number().int().nonnegative(),
})

export const optionGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  /** 0 = optional, 1 or more = the diner must choose. */
  minSelect: z.number().int().nonnegative(),
  maxSelect: z.number().int().positive(),
  options: z.array(optionSchema),
})

export const menuItemSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  description: z.string(),
  /** Price in paise. */
  basePrice: z.number().int().nonnegative(),
  isVeg: z.boolean(),
  isSpicy: z.boolean(),
  isBestseller: z.boolean(),
  available: z.boolean(),
  imageUrl: z.string().nullable(),
  allergens: z.array(z.string()),
  calories: z.number().int().nonnegative().nullable(),
  optionGroups: z.array(optionGroupSchema),
})

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  sortOrder: z.number().int(),
})

export const menuSchema = z.object({
  restaurantId: z.string(),
  categories: z.array(categorySchema),
  items: z.array(menuItemSchema),
})

export type Option = z.infer<typeof optionSchema>
export type OptionGroup = z.infer<typeof optionGroupSchema>
export type MenuItem = z.infer<typeof menuItemSchema>
export type Category = z.infer<typeof categorySchema>
export type Menu = z.infer<typeof menuSchema>
