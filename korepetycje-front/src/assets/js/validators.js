import { validators, createValidator } from 'vue-form-factory'

// Func
const checkRequiredCheckbox = value => {
  return !!value
}

const checkPhone = value => {
  const regexp = new RegExp('\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}')
  return regexp.test(value)
}

// Validators
const validateRequired = validators.validateRequired('To pole jest wymagane')
const validateRequiredCheckbox = createValidator(checkRequiredCheckbox)('Zaakceptuj zgodę, aby przejść dalej')
const validateEmail = validators.validateEmail('Podany adres email jest nieprawidłowy')
const validatePassword = validators.validateLength('Hasło powinno zawierać minimum 6 znaków', { min: 6 })
const validatePhone = createValidator(checkPhone)('Nr telefonu jest niepoprawny')

export {
  validateRequired,
  validateEmail,
  validatePassword,
  validateRequiredCheckbox,
  validatePhone
}
