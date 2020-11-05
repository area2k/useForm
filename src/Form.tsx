import React from 'react'

import FormContext from './FormContext'

import fieldErrorsReducer from './reducers/fieldErrorsReducer'
import formErrorsReducer from './reducers/formErrorsReducer'
import valuesReducer from './reducers/valuesReducer'

import { Action, FieldErrorsActions, FieldErrorMap, FormError, FormValues, FormProps, ValuesActions } from '../types'

const hasFieldErrors = <T extends FormValues>(fieldErrors: FieldErrorMap<T>): boolean => (
  Object.keys(fieldErrors).reduce((acc, elem) => (
    acc || Object.keys(fieldErrors[elem]).length > 0
  ), false)
)

export const Form = <T extends FormValues>({
  children, disabled = false, initialValues = {} as T,
  keepFormErrorsOnSubmit = false, render, onSubmit, onSubmitWithErrors, ...rest
}: FormProps<T>) => {
  const isDirty = React.useRef(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [fieldErrors, dispatchFieldError] = React.useReducer<React.Reducer<FieldErrorMap<T>, FieldErrorsActions<T>>>(fieldErrorsReducer, {} as FieldErrorMap<T>)
  const [formErrors, dispatchFormError] = React.useReducer(formErrorsReducer, {})
  const [values, dispatchValue] = React.useReducer<React.Reducer<T, ValuesActions<T>>>(valuesReducer, initialValues)

  const clearForm = React.useCallback(() => {
    isDirty.current = false

    dispatchFieldError({ type: Action.RESET })
    dispatchFormError({ type: Action.RESET })
    dispatchValue({ type: Action.RESET, initialValues })
  }, [])

  const triggerSubmit = React.useCallback((ev?: React.FormEvent<HTMLFormElement>) => {
    if (disabled) return

    if (ev) {
      ev.preventDefault()
      ev.stopPropagation()
    }

    setIsSubmitting(true)
  }, [disabled])

  React.useEffect(() => {
    if (!isSubmitting) return

    if (!keepFormErrorsOnSubmit) dispatchFormError({ type: Action.CLEAR })

    const setFormError = (key: string, value: FormError | null) => {
      if (value) {
        dispatchFormError({ type: Action.ADD, key, value })
      } else {
        dispatchFormError({ type: Action.REMOVE, key })
      }
    }

    const submitResult = hasFieldErrors(fieldErrors)
      ? onSubmitWithErrors(values, fieldErrors, { clearForm, setFormError })
      : onSubmit(values, { clearForm, setFormError })

    submitResult.finally(() => setIsSubmitting(false))
  }, [isSubmitting])

  const value = {
    formErrors,
    fieldErrors,
    isDirty: isDirty.current,
    isSubmitting,
    values,
    clearForm,
    dispatchFieldError,
    dispatchFormError,
    dispatchValue
  }

  return (
    <FormContext.Provider value={value}>
      {render
        ? render({ onSubmit: triggerSubmit })
        : <form {...rest} onSubmit={triggerSubmit}>
            {children}
          </form>
      }
    </FormContext.Provider>
  )
}

export default Form
