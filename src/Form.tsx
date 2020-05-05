import React from 'react'

import FormContext from './FormContext'

import fieldErrorsReducer from './reducers/fieldErrorsReducer'
import formErrorsReducer from './reducers/formErrorsReducer'
import valuesReducer from './reducers/valuesReducer'

import { Action, FormError, FormValues, FormProps, ValuesActions } from '../types'

export const Form = <T extends FormValues>({
  children, disabled = false, initialValues = {} as T,
  keepFormErrorsOnSubmit = false, onSubmit, ...rest
}: FormProps<T>) => {
  const isDirty = React.useRef(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [fieldErrors, dispatchFieldError] = React.useReducer(fieldErrorsReducer, {})
  const [formErrors, dispatchFormError] = React.useReducer(formErrorsReducer, {})
  const [values, dispatchValue] = React.useReducer<React.Reducer<T, ValuesActions<T>>>(valuesReducer, initialValues)

  const clearForm = React.useCallback(() => {
    isDirty.current = false

    dispatchFieldError({ type: Action.RESET })
    dispatchFormError({ type: Action.RESET })
    dispatchValue({ type: Action.RESET, initialValues })
  }, [])

  // OPTIMIZE: possibly more efficient to use isSubmitting to trigger useEffect
  const handleSubmit = React.useCallback((ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (disabled) return

    if (!keepFormErrorsOnSubmit) dispatchFormError({ type: Action.CLEAR })

    const setFormError = (key: string, value: FormError | null) => {
      if (value) {
        dispatchFormError({ type: Action.ADD, key, value })
      } else {
        dispatchFormError({ type: Action.REMOVE, key })
      }
    }

    setIsSubmitting(true)
    onSubmit(values, { clearForm, setFormError })
      .then(() => setIsSubmitting(false))
      .catch(() => setIsSubmitting(false))
  }, [disabled, values, onSubmit])

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
      <form {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export default Form
