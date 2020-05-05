import { Action, FormErrorMap, FormErrorsActions } from '../../types'

const formErrorsReducer = (state: FormErrorMap, action: FormErrorsActions): FormErrorMap => {
  switch (action.type) {
    case Action.ADD:
      return { ...state, [action.key]: action.value }
    case Action.REMOVE:
      const { [action.key]: removed, ...remainingErrors } = state
      return remainingErrors
    case Action.RESET:
    case Action.CLEAR:
      return {}
  }
}

export default formErrorsReducer
