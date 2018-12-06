import { validators, createValidator } from 'vue-form-factory'

// Func
const checkRequiredCheckbox = value => {
  return !!value
}

const checkPhone = value => {
  /* eslint-disable-next-line */
  const regexp = /^[0-9\+\s\(\)\.\-]{7,20}$/
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
