export enum Responsible {
  Man = "man",
  Woman = "woman",
  Shared = "shared",
}

export enum ItemType {
  Income = "income",
  Expense = "expense",
  Saldo = "saldo",
}

export const DEFAULT_CATEGORY = "r1PSAfcSf";
export const CATEGORIES = [
  { id: DEFAULT_CATEGORY, name: "Overige" },
  { id: "BJePHCzqSG", name: "Salaris" },
  { id: "Skdr0zqSG", name: "Belasting" },
  { id: "HkgOr0G9HM", name: "Huishoudelijk" },
  { id: "S1Fr0z5Hz", name: "Auto" },
  { id: "S1eFHAfcBG", name: "Huis" },
  { id: "B1-2ZQqBz", name: "Kids" },
  { id: "f3fun3fs", name: "Abbonementen" },
  { id: "g4Dfd-23g", name: "Verzekeringen" },
];
