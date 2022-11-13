import firebaseApp from "../firebase";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Item } from "../types";

const db = getFirestore(firebaseApp);

export async function getAll() {
  const items = collection(db, "items");
  const snapshot = await getDocs(query(items));
  const result = [];

  snapshot.forEach((item) => {
    result.push(item.data());
  });

  return result;
}

export async function add(item: Item) {
  const data = serializeItem(item);
  await setDoc(doc(db, "items", item.id), data);
}

export async function remove(id: string) {
  await deleteDoc(doc(db, "items", id));
}

export async function edit(item: Item) {
  await add(item);
}

function serializeItem(item: Item): Record<string, string | number | boolean> {
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
