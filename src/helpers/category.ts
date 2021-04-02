import { CATEGORIES } from "../constants";

export function getCategoryName(id: string): string {
  return CATEGORIES.find((category) => category.id === id).name;
}
