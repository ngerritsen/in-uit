import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { MAN, WOMAN, SHARED } from '../constants'

import * as actions from '../actions'
import Sheet from './sheet'
import Header from './header'
import Loader from './loader'
import Login from './login'
import { getCalculatedItems } from '../helpers/calculated-items'

const App = ({ add, edit, items, remove, initialized, login, loggedIn, toggleEditMode }) => {
  const sheetProps = { add, edit, items, remove, toggleEditMode }

  return (
    <div>
      <Header/>
      <div className="container">
        {(() => {
          if (!loggedIn) {
            return <Login login={login}/>
          }

          if (!initialized) {
            return <Loader/>
          }

          return (
            <div>
              <Sheet {...sheetProps} responsible={MAN} title="Niels"/>
              <Sheet {...sheetProps} responsible={WOMAN} title="Peggy"/>
              <Sheet {...sheetProps} responsible={SHARED} title="Gezamelijk"/>
            </div>
          )
        })()}
      </div>
    </div>
  )
}

App.propTypes = {
  add: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  initialized: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  toggleEditMode: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const calculatedItems = getCalculatedItems(state.items)
  const sortedItems = state.items
    .slice()
    .sort((a, b) => b.amount - a.amount)

  return {
    ...state,
    items: [...sortedItems, ...calculatedItems]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
