import React from 'react'

import FormContext from './FormContext'

import { Action, FormContext as FormContextType, FormError, FormValues } from '../types'

const useFormContext = <T extends FormValues>(): FormContextType<T> => {
  const { dispatchFieldError, dispatchFormError, dispatchValue, values, ...ctx } = React.useContext(FormContext)

  const addFieldError = (id: string, key: string, value: FormError) => dispatchFieldError({
    id, key, value, type: Action.ADD
  })

  const addFormError = (key: string, value: FormError) => dispatchFormError({
    key, value, type: Action.ADD
  })

  const clearFieldErrors = (id: string) => dispatchFieldError({
    id, type: Action.CLEAR
  })

  const clearFormErrors = () => dispatchFormError({ type: Action.CLEAR })

  const removeFieldError = (id: string, key: string) => dispatchFieldError({
    id, key, type: Action.REMOVE
  })

  const removeFormError = (key: string) => dispatchFormError({
    key, type: Action.REMOVE
  })

  const setValue = (id: string, value: any) => dispatchValue({ type: Action.ADD, id, value })

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
