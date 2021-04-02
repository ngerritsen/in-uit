import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";

import { ItemType, Responsible } from "../constants";
import { toCurrency } from "../helpers/formatting";
import ToggleContent from "./ToggleContent";
import Modal from "./Modal";
import ItemForm from "./ItemForm";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { editItem } from "../actions";

const DIRTY_TIMEOUT = 250;

type ItemProps = {
  amount: number;
  itemType: ItemType;
  responsible: Responsible;
  calculated?: boolean;
  category?: string;
  id?: string;
  dirty?: boolean;
  title: string;
  checked?: boolean;
  additional?: boolean;
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
  checked,
  additional,
}: ItemProps) => {
  const dispatch = useDispatch();
  const [showDirty, setShowDirty] = useState<boolean>(false);
  const [dirtyTimeout, setDirtyTimeout] = useState(null);

  useEffect(() => {
    clearTimeout(dirtyTimeout);

    if (dirty && !showDirty) {
      setDirtyTimeout(
        setTimeout(() => {
          setShowDirty(true);
        }, DIRTY_TIMEOUT)
      );
    }

    if (!dirty) {
      setShowDirty(false);
    }
  }, [dirty]);

  return (
    <ItemContainer>
      <ItemContent
        dirty={showDirty}
        calculated={calculated}
        additional={additional}
      >
        {!calculated && itemType === ItemType.Expense && (
          <ItemCheckIcon
            checked={checked}
            onClick={() =>
              dispatch(
                editItem({
                  id,
                  responsible,
                  itemType,
                  title,
                  category,
                  amount,
                  checked: !checked,
                })
              )
            }
          >
            <FontAwesomeIcon icon={checked ? faCheckCircle : faCircle} />
          </ItemCheckIcon>
        )}
        <ItemTitle itemType={itemType}>{title}</ItemTitle>
        <ItemAmount negative={amount < 0} itemType={itemType}>
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
  additional?: boolean;
};

const ItemContent = styled.div<ItemContentProps>`
  opacity: ${(props) => (props.dirty ? 0.6 : 1)};
  transition: opacity 0.2 ease;
  display: flex;
  align-items: center;
  padding: 1.2rem 0;
  color: ${(props) => (props.calculated ? props.theme.colors.grey : "inherit")};
  font-style: ${(props) => (props.additional ? "italic" : "inherit")};
`;

type ItemCheckIconProps = {
  checked?: boolean;
};

const ItemCheckIcon = styled.div<ItemCheckIconProps>`
  color: ${(props) =>
    props.checked ? props.theme.colors.blue : props.theme.colors.grey};
  margin-right: ${(props) => props.theme.sizes.sm};
  font-size: 1.1em;
  cursor: pointer;
  }
`;

const ItemTitle = styled.div`
  flex-grow: 1;
  font-weight: ${(props) =>
    props.itemType === ItemType.Saldo ? "bold" : "regular"};
  margin-right: ${(props) => props.theme.sizes.sm};
`;

type ItemAmountProps = {
  negative?: boolean;
};

const ItemAmount = styled.div<ItemAmountProps>`
  margin-right: ${(props) => props.theme.sizes.sm};
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

  &:focus,
  &:hover {
    color: ${(props) => props.theme.colors.blue};
    cursor: pointer;
  }
`;

export default Item;
