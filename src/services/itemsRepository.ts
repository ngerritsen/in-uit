import supabase from "../supabase";
import { Item } from "../types";

export async function getAll() {
  const { data, error } = await supabase.from("items").select();

  if (error) {
    throw error;
  }

  return data.map((item) => ({ ...item, itemType: item.type }));
}

export async function add(item: Item) {
  const { error } = await supabase.from("items").insert(serializeItem(item));

  if (error) {
    throw error;
  }
}

export async function remove(id: string) {
  const { error } = await supabase.from("items").delete().match({ id });

  if (error) {
    throw error;
  }
}

export async function edit(item: Item) {
  const { error } = await supabase
    .from("items")
    .update(serializeItem(item))
    .match({ id: item.id });

  if (error) {
    throw error;
  }
}

function serializeItem(item: Item): Record<string, string | number | boolean> {
  return {
    amount: item.amount,
    category: item.category,
    id: item.id,
    type: item.itemType,
    responsible: item.responsible,
    title: item.title,
    checked: Boolean(item.checked),
  };
}
