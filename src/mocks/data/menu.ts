import type { Menu, MenuItem, OptionGroup } from '@/features/menu'

type ItemInput = Pick<
  MenuItem,
  'id' | 'categoryId' | 'name' | 'description' | 'basePrice' | 'isVeg'
> &
  Partial<MenuItem>

/** Fills in the boring defaults so each dish below stays short. */
function item(input: ItemInput): MenuItem {
  return {
    isSpicy: false,
    isBestseller: false,
    available: true,
    imageUrl: null,
    allergens: [],
    calories: null,
    optionGroups: [],
    ...input,
  }
}

const spiceLevel: OptionGroup = {
  id: 'spice',
  name: 'Spice level',
  minSelect: 1,
  maxSelect: 1,
  options: [
    { id: 'mild', name: 'Mild', priceDelta: 0 },
    { id: 'medium', name: 'Medium', priceDelta: 0 },
    { id: 'hot', name: 'Hot', priceDelta: 0 },
  ],
}

export const menu: Menu = {
  restaurantId: 'demo-restaurant',
  categories: [
    { id: 'starters', name: 'Starters', sortOrder: 1 },
    { id: 'mains', name: 'Mains', sortOrder: 2 },
    { id: 'breads', name: 'Breads', sortOrder: 3 },
    { id: 'desserts', name: 'Desserts', sortOrder: 4 },
    { id: 'drinks', name: 'Drinks', sortOrder: 5 },
  ],
  items: [
    item({
      id: 'paneer-tikka',
      categoryId: 'starters',
      name: 'Paneer Tikka',
      description: 'Cottage cheese grilled in the tandoor with spiced yogurt.',
      basePrice: 27900,
      isVeg: true,
      isSpicy: true,
      isBestseller: true,
      allergens: ['Dairy'],
      optionGroups: [
        {
          id: 'portion',
          name: 'Portion',
          minSelect: 1,
          maxSelect: 1,
          options: [
            { id: 'half', name: 'Half (4 pieces)', priceDelta: 0 },
            { id: 'full', name: 'Full (8 pieces)', priceDelta: 12000 },
          ],
        },
        {
          id: 'addons',
          name: 'Add-ons',
          minSelect: 0,
          maxSelect: 2,
          options: [
            { id: 'chutney', name: 'Extra mint chutney', priceDelta: 2000 },
            { id: 'cheese-dip', name: 'Cheese dip', priceDelta: 4000 },
          ],
        },
        spiceLevel,
      ],
    }),
    item({
      id: 'crispy-corn',
      categoryId: 'starters',
      name: 'Crispy Corn',
      description: 'Golden fried corn tossed with pepper and spring onion.',
      basePrice: 19900,
      isVeg: true,
    }),
    item({
      id: 'chicken-65',
      categoryId: 'starters',
      name: 'Chicken 65',
      description: 'Spicy fried chicken with curry leaves and chilli.',
      basePrice: 32900,
      isVeg: false,
      isSpicy: true,
      available: false,
    }),
    item({
      id: 'hara-bhara-kebab',
      categoryId: 'starters',
      name: 'Hara Bhara Kebab',
      description: 'Spinach and green pea patties, pan seared.',
      basePrice: 24900,
      isVeg: true,
    }),
    item({
      id: 'butter-chicken',
      categoryId: 'mains',
      name: 'Butter Chicken',
      description: 'Tandoori chicken in a creamy tomato gravy.',
      basePrice: 38900,
      isVeg: false,
      isBestseller: true,
      allergens: ['Dairy'],
      optionGroups: [spiceLevel],
    }),
    item({
      id: 'dal-makhani',
      categoryId: 'mains',
      name: 'Dal Makhani',
      description: 'Slow-cooked black lentils with butter and cream.',
      basePrice: 27900,
      isVeg: true,
      allergens: ['Dairy'],
    }),
    item({
      id: 'paneer-butter-masala',
      categoryId: 'mains',
      name: 'Paneer Butter Masala',
      description: 'Cottage cheese in a rich tomato and cashew gravy.',
      basePrice: 31900,
      isVeg: true,
      allergens: ['Dairy', 'Nuts'],
    }),
    item({
      id: 'butter-naan',
      categoryId: 'breads',
      name: 'Butter Naan',
      description: 'Soft tandoor bread brushed with butter.',
      basePrice: 6500,
      isVeg: true,
      allergens: ['Gluten', 'Dairy'],
    }),
    item({
      id: 'garlic-naan',
      categoryId: 'breads',
      name: 'Garlic Naan',
      description: 'Tandoor bread with garlic and coriander.',
      basePrice: 7500,
      isVeg: true,
      allergens: ['Gluten', 'Dairy'],
    }),
    item({
      id: 'gulab-jamun',
      categoryId: 'desserts',
      name: 'Gulab Jamun',
      description: 'Warm milk dumplings in cardamom syrup.',
      basePrice: 12900,
      isVeg: true,
      allergens: ['Dairy', 'Gluten'],
    }),
    item({
      id: 'masala-chai',
      categoryId: 'drinks',
      name: 'Masala Chai',
      description: 'Spiced milk tea.',
      basePrice: 5000,
      isVeg: true,
      allergens: ['Dairy'],
    }),
    item({
      id: 'fresh-lime-soda',
      categoryId: 'drinks',
      name: 'Fresh Lime Soda',
      description: 'Sweet, salted or mixed.',
      basePrice: 7900,
      isVeg: true,
    }),
  ],
}
