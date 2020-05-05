import React from 'react'

import { ContextShape } from '../types'

export default React.createContext<ContextShape>({
  fieldErrors: {},
  formErrors: {},
  isDirty: false,
  isSubmitting: false,
  values: {},
  clearForm: () => {},
  dispatchFieldError: () => {},
  dispatchFormError: () => {},
  dispatchValue: () => {},
})
