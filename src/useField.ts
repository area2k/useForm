import React from 'react'

import FormContext from './FormContext'

import { Action, FieldCallback, FieldContext, FormError } from '../types'

const useField = <T extends any>(id: string, callback?: FieldCallback<T>): FieldContext<T> => {
  const isMounted = React.useRef(false)
  const context = React.useContext(FormContext)

  const addError = React.useCallback((key: string, error: FormError) => {
    context.dispatchFieldError({
      type: Action.ADD, id, key, value: error
    })
  }, [])

  const removeError = React.useCallback((key: string) => {
    context.dispatchFieldError({
      type: Action.REMOVE, id, key
    })
  }, [])

  const setValue = React.useCallback((value: T) => {
    context.dispatchValue({ type: Action.ADD, id, value })
  }, [])

  const fieldCtx = {
    errors: context.fieldErrors[id] || {},
    value: context.values[id] as T,
    addError,
    removeError,
    setValue
  }

  React.useEffect(() => {
    if (isMounted.current && callback) callback(fieldCtx)
    isMounted.current = true
  }, [fieldCtx.value])

  return fieldCtx
}

export default useField
