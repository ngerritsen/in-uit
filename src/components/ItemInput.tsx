import React from "react";
import PropTypes from "prop-types";

const ItemInput = ({
  action,
  id,
  itemType,
  responsible,
  actionText,
  title,
  amount,
}) => {
  let amountInput, titleInput;

  return (
    <form
      className="item-input"
      onSubmit={(e) => {
        e.preventDefault();
        submitItem(action, amountInput, titleInput, itemType, responsible, id);
      }}
    >
      <input
        ref={(c) => {
          titleInput = c;
        }}
        name="title"
        className="item-input__input-title input"
        placeholder="Naam"
        type="text"
        defaultValue={title}
      />
      <input
        ref={(c) => {
          amountInput = c;
        }}
        name="amount"
        className="item-input__input-amount input"
        placeholder="Bedrag"
        type="number"
        step="any"
        defaultValue={amount}
      />
      <button type="submit" className="submit item-input__submit">
        {actionText}
      </button>
    </form>
  );
};

function submitItem(
  action,
  amountInput,
  titleInput,
  itemType,
  responsible,
  id
) {
  const amount = amountInput.value;
  const title = titleInput.value;
  const item = {
    amount: Number(amount),
    title,
    itemType,
    responsible,
  };

  if (isValidInput(amount, title)) {
    fireAction(action, id, item);
    resetIntputs(amountInput, titleInput);
  }
}

function fireAction(action, id, item) {
  if (id) {
    action(id, item);
    return;
  }

  action(item);
}

function isValidInput(amount, title) {
  return amount.trim() !== "" && title.trim() !== "";
}

function resetIntputs(amountInput, titleInput) {
  amountInput.value = "";
  titleInput.value = "";
  titleInput.focus();
}

ItemInput.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  amount: PropTypes.number,
  id: PropTypes.string,
  itemType: PropTypes.string.isRequired,
  responsible: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ItemInput;
