import React from 'react'

import FormContext from './FormContext'

import { Action, FormContext as FormContextType, FormError, FormValues } from '../types'

const useFormContext = <T extends FormValues>(): FormContextType<T> => {
  const {
    dispatchFieldError, dispatchFormError, dispatchValue, values, ...ctx
  } = React.useContext(FormContext)

  const addFieldError = (id: string, key: string, value: FormError) => dispatchFieldError({
    type: Action.ADD, id, key, value
  })

  const addFormError = (key: string, value: FormError) => dispatchFormError({
    type: Action.ADD, key, value
  })

  const clearFieldErrors = (id: string) => dispatchFieldError({
    type: Action.CLEAR, id
  })

  const clearFormErrors = () => dispatchFormError({ type: Action.CLEAR })

  const removeFieldError = (id: string, key: string) => dispatchFieldError({
    type: Action.REMOVE, id, key
  })

  const removeFormError = (key: string) => dispatchFormError({
    type: Action.REMOVE, key
  })

  const setValue = (id: string, value: any) => dispatchValue({
    type: Action.ADD, id, value
  })

  return {
    ...ctx,
    values: values as T,
    addFieldError,
    addFormError,
    clearFieldErrors,
    clearFormErrors,
    removeFieldError,
    removeFormError,
    setValue
  }
}

export default useFormContext
