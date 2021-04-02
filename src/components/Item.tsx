import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

import { ItemType, Responsible } from "../constants";
import { toCurrency } from "../helpers/formatting";
import ToggleContent from "./ToggleContent";
import Modal from "./Modal";
import ItemForm from "./ItemForm";

type ItemProps = {
  amount: number;
  itemType: ItemType;
  responsible: Responsible;
  calculated?: boolean;
  category?: string;
  id?: string;
  dirty?: boolean;
  title: string;
};

const Item = ({
  amount,
  calculated,
  dirty,
  title,
  category,
  id,
  itemType,
  responsible,
}: ItemProps) => {
  return (
    <ItemContainer>
      <ItemContent dirty={dirty} calculated={calculated}>
        <ItemTitle itemType={itemType}>{title}</ItemTitle>
        <ItemAmount
          negative={amount < 0}
          itemType={itemType}
          calculated={calculated}
        >
          {toCurrency(amount)}
        </ItemAmount>
        {itemType !== ItemType.Saldo && !calculated && (
          <ToggleContent
            toggle={({ open }) => (
              <ItemEdit onClick={open}>
                <FontAwesomeIcon icon={faEdit} />
              </ItemEdit>
            )}
            content={({ close }) => (
              <Modal isOpen>
                <ItemForm
                  title={title}
                  id={id}
                  amount={amount}
                  responsible={responsible}
                  itemType={itemType}
                  category={category}
                  onExit={close}
                />
              </Modal>
            )}
          />
        )}
        {(itemType === ItemType.Saldo || calculated) && <ItemEdit />}
      </ItemContent>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

type ItemContentProps = {
  dirty?: boolean;
  calculated?: boolean;
};

const ItemContent = styled.div<ItemContentProps>`
  opacity: ${(props) => (props.dirty ? 0.5 : 1)};
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  color: ${(props) => (props.calculated ? props.theme.colors.grey : "inherit")};
`;

const ItemTitle = styled.div`
  flex-grow: 1;
  font-weight: ${(props) =>
    props.itemType === ItemType.Saldo ? "bold" : "regular"};
  margin-right: ${(props) => props.theme.sizes.sm};
  cursor: pointer;
`;

type ItemAmountProps = {
  calculated?: boolean;
  negative?: boolean;
};

const ItemAmount = styled.div<ItemAmountProps>`
  margin-right: ${(props) => props.theme.sizes.sm};
  opacity: ${(props) => (props.calculated ? 0.7 : 1)};
  font-weight: ${(props) =>
    props.itemType === ItemType.Saldo ? "bold" : "regular"};
  color: ${(props) => {
    switch (props.itemType) {
      case ItemType.Expense:
        return props.theme.colors.red;
      case ItemType.Income:
        return props.theme.colors.green;
      case ItemType.Saldo:
        return props.negative
          ? props.theme.colors.red
          : props.theme.colors.foreground;
    }
  }};
`;

const ItemEdit = styled.div`
  color: ${(props) => props.theme.colors.grey};
  position: relative;
  top: 0.15rem;
  width: 2.2rem;

  &:focus,
  &:hover {
    color: ${(props) => props.theme.colors.blue};
    cursor: pointer;
  }
`;

export default Item;
