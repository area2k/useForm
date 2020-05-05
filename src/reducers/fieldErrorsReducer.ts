import { Action, FieldErrorMap, FieldErrorsActions } from '../../types'

const fieldErrorsReducer = (state: FieldErrorMap, action: FieldErrorsActions): FieldErrorMap => {
  switch (action.type) {
    case Action.ADD:
      const otherErrors = state[action.id] || {}
      return { ...state, [action.id]: { ...otherErrors, [action.key]: action.value } }
    case Action.CLEAR:
      return { ...state, [action.id]: {} }
    case Action.REMOVE:
      const { [action.key]: removed, ...remainingErrors } = state[action.id] || {}
      return { ...state, [action.id]: remainingErrors }
    case Action.RESET:
      return {}
  }
}

export default fieldErrorsReducer
