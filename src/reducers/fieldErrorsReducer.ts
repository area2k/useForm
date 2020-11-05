import { Action, FieldErrorMap, FieldErrorsActions, FormValues } from '../../types'

const fieldErrorsReducer = <T extends FormValues>(state: FieldErrorMap<T>, action: FieldErrorsActions<T>): FieldErrorMap<T> => {
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
      return {} as FieldErrorMap<T>
  }
}

export default fieldErrorsReducer
