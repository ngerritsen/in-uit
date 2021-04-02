import { ItemType, Responsible } from "./constants";

export type Item = {
  amount: number;
  calculated?: boolean;
  category: string;
  responsible: Responsible;
  id: string;
  dirty?: boolean;
  itemType: ItemType;
  title: string;
  checked?: boolean;
  _previousVersion?: Item;
};

export type Category = {
  id: string;
  items: Item[];
};

export interface Theme {
  colors: Record<string, string>;
  mobile: string;
  sizes: Record<string, string>;
}

export interface StyledProps {
  theme: Theme;
}

export type Summary = {
  investment: number;
  totalIncome: number;
  totalExpense: number;
  investmentMan: number;
  investmentWoman: number;
  saldo: number;
  toPay: number;
};
