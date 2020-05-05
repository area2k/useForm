import { Action, FormValues, ValuesActions } from '../../types'

const valuesReducer = <T extends FormValues>(state: T, action: ValuesActions<T>): T => {
  switch (action.type) {
    case Action.ADD:
      return { ...state, [action.id]: action.value }
    case Action.RESET:
      return action.initialValues
  }
}

export default valuesReducer
