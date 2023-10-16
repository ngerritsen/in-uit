import { Responsible, ItemType } from "../constants";
import { Item, Summary } from "../types";

type Investments = Record<Responsible.Man | Responsible.Woman, number>;

export function calculateSummary(items: Item[], responsible: Responsible): Summary {
  const saldos = calculateInitialSaldos(items);
  const saldo = saldos[responsible];
  const investments = calculateInvestments(saldos);

  return {
    investment: investments[responsible],
    totalIncome: calculateTotal(items, responsible, ItemType.Income),
    totalExpense: calculateTotal(items, responsible, ItemType.Expense),
    investmentMan: investments[Responsible.Man],
    investmentWoman: investments[Responsible.Woman],
    saldo: calculateFinalSaldo(saldo, investments, responsible),
    toPay: calculateToPay(items, responsible),
  };
}

function calculateToPay(items: Item[], responsible: Responsible): number {
  return items
    .filter((item) => item.responsible === responsible && !item.checked && item.itemType === ItemType.Expense)
    .reduce((total, item) => total + item.amount, 0);
}

function calculateTotal(items: Item[], responsible: Responsible, itemType: ItemType): number {
  return items
    .filter((item) => item.itemType === itemType && item.responsible === responsible)
    .reduce((total, item) => item.amount + total, 0);
}

function calculateInitialSaldos(items: Item[]): Record<Responsible, number> {
  return {
    [Responsible.Man]: calculateInitialSaldo(items, Responsible.Man),
    [Responsible.Woman]: calculateInitialSaldo(items, Responsible.Woman),
    [Responsible.Shared]: calculateInitialSaldo(items, Responsible.Shared),
  };
}

function calculateInitialSaldo(items: Item[], responsible: Responsible): number {
  return calculateTotal(items, responsible, ItemType.Income) - calculateTotal(items, responsible, ItemType.Expense);
}

function calculateFinalSaldo(saldo: number, investments: Investments, responsible: Responsible): number {
  if (responsible === Responsible.Shared) {
    return saldo + investments[Responsible.Man] + investments[Responsible.Woman];
  }

  return saldo - investments[responsible];
}

function calculateInvestments(saldos: Record<Responsible, number>): Investments {
  return {
    [Responsible.Man]: calculateInvestment(saldos, Responsible.Man),
    [Responsible.Woman]: 0
  };
}

function calculateInvestment(saldos: Record<Responsible, number>, responsible: Responsible): number {
  const sharedInvestmentNeeded = getNegativeAmount(saldos[Responsible.Shared]);
  const saldo = saldos[responsible];

  if (saldo <= 0) {
    return 0;
  }

  const investments = {
    [Responsible.Man]: sharedInvestmentNeeded,
    [Responsible.Woman]: 0
  };

  const investment = investments[responsible];

  if (investment > saldo) {
    return saldo;
  }

  return investment;
}

function getNegativeAmount(number: number): number {
  return number < 0 ? number * -1 : 0;
}
