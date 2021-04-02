import { DEFAULT_CATEGORY, ItemType, Responsible } from "../constants";
import { Category, Item } from "../types";

export function getGroupedItems(
  items: Item[],
  itemType: ItemType,
  responsible: Responsible
): Category[] {
  return items
    .filter(
      (item) => item.responsible === responsible && item.itemType === itemType
    )
    .sort((a, b) => b.amount - a.amount)
    .reduce((categories, item) => {
      const id = item.category || DEFAULT_CATEGORY;
      const currentCategory = categories.find((category) => id === category.id);

      if (!currentCategory) {
        return [...categories, { id, items: [item] }];
      }

      return categories
        .map((category) =>
          category.id === id
            ? { id, items: [...category.items, item] }
            : category
        )
        .sort((a, b) => totalCost(b) - totalCost(a));
    }, []);
}

function totalCost(category: Category): number {
  return category.items.reduce(
    (total: number, item: Item): number => item.amount + total,
    0
  );
}
