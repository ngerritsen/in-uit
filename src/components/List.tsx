import React from "react";
import { useSelector } from "react-redux";

import Item from "./Item";
import CategoryHeading from "./CategoryHeading";
import { getCategoryName } from "../helpers/category";
import Button from "./Button";
import Section from "./Section";
import { ItemType, Responsible } from "../constants";
import { Category } from "../types";
import { getGroupedItems, getSummmary } from "../selectors";
import { RootState } from "../store";
import ToggleContent from "./ToggleContent";
import ItemForm from "./ItemForm";
import Modal from "./Modal";

type ListProps = {
  groupedItems: Category[];
  itemType: ItemType;
  summary: Record<string, number>;
  responsible: Responsible;
};

const List = ({ itemType, responsible }: ListProps) => {
  const summary = useSelector((state: RootState) =>
    getSummmary(state, itemType, responsible)
  );
  const groupedItems = useSelector((state: RootState) =>
    getGroupedItems(state, itemType, responsible)
  );

  return (
    <div>
      <Section size="sm">
        {groupedItems.reduce(
          (items, category) => [
            ...items,
            <CategoryHeading
              key={category.id}
              title={getCategoryName(category.id)}
            />,
            ...category.items.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                amount={item.amount}
                responsible={item.responsible}
                itemType={item.itemType}
                category={item.category}
                dirty={item.dirty}
                checked={item.checked}
              />
            )),
          ],
          []
        )}
        {summary && (
          <>
            <CategoryHeading title="Samenvatting" />
            <Item
              itemType={ItemType.Income}
              amount={summary.totalIncome}
              title="Inkomen"
              responsible={responsible}
              calculated
            />
            {responsible === Responsible.Shared && (
              <>
                <Item
                  itemType={ItemType.Income}
                  amount={summary.investmentMan}
                  title="Inleg Niels"
                  responsible={responsible}
                  calculated
                />
                <Item
                  itemType={ItemType.Income}
                  amount={summary.investmentWoman}
                  title="Inleg Peggy"
                  responsible={responsible}
                  calculated
                />
              </>
            )}
            <Item
              itemType={ItemType.Expense}
              amount={summary.totalExpense}
              title="Uitgaven"
              responsible={responsible}
              calculated
            />
            {summary.toPay && summary.toPay !== summary.totalExpense && (
              <Item
                itemType={ItemType.Expense}
                amount={summary.toPay}
                title="- &nbsp; Nog te betalen"
                responsible={responsible}
                calculated
                additional
              />
            )}
            {responsible !== Responsible.Shared && (
              <Item
                itemType={ItemType.Expense}
                amount={summary.investment}
                title="Inleg gezamelijk"
                responsible={responsible}
                calculated
              />
            )}
            <Item
              itemType={ItemType.Saldo}
              title="Saldo"
              amount={summary.saldo}
              responsible={responsible}
            />
          </>
        )}
      </Section>
      <Section size="xs">
        <ToggleContent
          toggle={({ open }) => (
            <Button small onClick={open}>
              Toevoegen
            </Button>
          )}
          content={({ close }) => (
            <Modal close={close}>
              <ItemForm
                responsible={responsible}
                itemType={itemType}
                onExit={close}
              />
            </Modal>
          )}
        />
      </Section>
    </div>
  );
};

export default List;
