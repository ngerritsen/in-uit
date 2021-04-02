import firebase from "firebase/app";
import { Item } from "../types";

export async function getAll() {
  const data = [];
  const snapshots = await getItems().get();

  snapshots.forEach((snapshot) => data.push(snapshot.data()));

  return data;
}

export function add(item: Item) {
  return getItems().doc(item.id).set(serializeItem(item));
}

export function remove(id: string) {
  return getItems().doc(id).delete();
}

export function edit(item: Item) {
  return getItems().doc(item.id).update(serializeItem(item));
}

function getItems() {
  return firebase.firestore().collection("items");
}

function serializeItem(item: Item): Item {
  return {
    amount: item.amount,
    category: item.category,
    id: item.id,
    itemType: item.itemType,
    responsible: item.responsible,
    title: item.title,
    checked: Boolean(item.checked),
  };
}
