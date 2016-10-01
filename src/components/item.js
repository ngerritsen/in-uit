import React, { PropTypes } from 'react'

import { toCurrency } from '../helpers/formatting'
import ItemInput from './item-input.js'

import '../styles/item.scss'

const Item = ({
  amount, edit, editMode, calculated, title, id, itemType, remove, responsible, saldo, toggleEditMode
}) =>
  <div className={getItemClassName(itemType, calculated, saldo)}>
    <div className="item__content">
      <span className="item__title" onClick={
        calculated ? null : () => toggleEditMode(id)
      }>
        {title}
      </span>
      <span className="item__amount">
        {toCurrency(amount)}
      </span>
      <span className="item__tools">
        <i
          className="item__icon fa fa-times"
          onClick={calculated ? null : () => remove(id)}
        />
      </span>
    </div>
    {
      !calculated && editMode &&
      <div className="item__input">
        <ItemInput
          title={title}
          amount={amount}
          action={edit}
          itemType={itemType}
          responsible={responsible}
          actionText="Sla op"
          id={id}
        />
      </div>
    }
  </div>

function getItemClassName(itemType, calculated, saldo) {
  return 'item' +
  (itemType ? ` item--${itemType}` : '') +
  (calculated ? ' item--calculated' : '') +
  (saldo ? ' item--saldo' : '')
}

Item.propTypes = {
  amount: PropTypes.number.isRequired,
  calculated: PropTypes.bool,
  edit: PropTypes.func,
  editMode: PropTypes.bool,
  id: PropTypes.string,
  itemType: PropTypes.string,
  remove: PropTypes.func,
  responsible: PropTypes.string,
  saldo: PropTypes.bool,
  title: PropTypes.string.isRequired,
  toggleEditMode: PropTypes.func
}

export default Item
