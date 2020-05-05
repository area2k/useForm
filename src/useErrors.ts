import React from 'react'

import FormContext from './FormContext'

import { FormErrorMap } from '../types'

const useErrors = (fieldId?: string): FormErrorMap => {
  const { fieldErrors, formErrors } = React.useContext(FormContext)

  return fieldId
    ? fieldErrors[fieldId]
    : formErrors
}

export default useErrors
