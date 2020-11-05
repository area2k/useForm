import React from 'react'

export interface FormError {
  message: string
  [key: string]: any
}

export interface FormErrorMap {
  [key: string]: FormError
}

export type FormValues = Record<string, any>

export type FieldErrorMap<T extends FormValues> = Record<keyof T, FormErrorMap>

export const enum Action {
  ADD = 'form.action.add',
  CLEAR = 'form.action.clear',
  REMOVE = 'form.action.remove',
  RESET = 'form.action.reset'
}

export type AddFieldErrorAction<K> = { type: Action.ADD, id: K, key: string, value: FormError }
export type RemoveFieldErrorAction<K> = { type: Action.REMOVE, id: K, key: string }
export type ClearFieldErrorAction = { type: Action.CLEAR, id: string }
export type ResetFieldErrorsAction = { type: Action.RESET }
export type FieldErrorsActions<T> = AddFieldErrorAction<keyof T> | RemoveFieldErrorAction<keyof T> | ClearFieldErrorAction | ResetFieldErrorsAction

export type DispatchFieldError<K> = React.Dispatch<FieldErrorsActions<K>>

export type AddFormErrorAction = { type: Action.ADD, key: string, value: FormError }
export type RemoveFormErrorAction = { type: Action.REMOVE, key: string }
export type ClearFormErrorsAction = { type: Action.CLEAR | Action.RESET }
export type FormErrorsActions = AddFormErrorAction | RemoveFormErrorAction | ClearFormErrorsAction

export type DispatchFormError = React.Dispatch<FormErrorsActions>

export type AddValueAction = { type: Action.ADD, id: string, value: any }
export type ResetValuesAction<T> = { type: Action.RESET, initialValues: T }
export type ValuesActions<T> = AddValueAction | ResetValuesAction<T>

export type DispatchValues<T> = React.Dispatch<ValuesActions<T>>

export interface ContextShape<T extends FormValues = FormValues> {
  fieldErrors: FieldErrorMap<T>
  formErrors: FormErrorMap
  isDirty: boolean
  isSubmitting: boolean
  values: T
  clearForm: () => void
  dispatchFieldError: DispatchFieldError<T>
  dispatchFormError: DispatchFormError
  dispatchValue: DispatchValues<T>
}

export interface FormContext<T extends FormValues> {
  fieldErrors: FieldErrorMap<T>
  formErrors: FormErrorMap
  isDirty: boolean
  isSubmitting: boolean
  values: T
  addFieldError: (fieldId: string, key: string, error: FormError) => void
  addFormError: (key: string, error: FormError) => void
  clearFieldErrors: (fieldId: string) => void
  clearForm: () => void
  clearFormErrors: () => void
  removeFieldError: (fieldId: string, key: string) => void
  removeFormError: (key: string) => void
  setValue: (fieldId: string, value: any) => void
}

export interface FieldContext<T> {
  errors: FormErrorMap
  value: T
  addError: (key: string, error: FormError) => void
  removeError: (key: string) => void
  setValue: (value: T) => void
}

export type FieldCallback<T> = (ctx: FieldContext<T>) => void

export interface SubmitHelpers {
  clearForm: () => void
  setFormError: (key: string, value: FormError | null) => void
}

export interface FormProps<T extends FormValues>
  extends Omit<React.HTMLProps<HTMLFormElement>, 'onSubmit'> {
  disabled?: boolean
  initialValues?: T,
  keepFormErrorsOnSubmit?: boolean
  render?: (props: React.PropsWithChildren<{ onSubmit: () => void }>) => React.ReactElement<any, any> | null
  onSubmit: (values: T, helpers: SubmitHelpers) => Promise<void>
  onSubmitWithErrors: (values: T, errors: FieldErrorMap<T>, helpers: SubmitHelpers) => Promise<void>
}

export const useErrors: (fieldId?: string) => FormErrorMap
export const useField: <T extends any>(id: string, callback?: FieldCallback<T>) => FieldContext<T>
export const useFormContext: <T extends FormValues>() => FormContext<T>

export default function<T extends FormValues> (props: FormProps<T>): JSX.Element
