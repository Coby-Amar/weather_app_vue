const usernameExpression = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
const passwordExpression = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/)

export function requiredValidation(value: string): boolean | string {
    if (value) {
        return true
    }
    return 'Field is required.'
}

export function usernameValidation(value: string): boolean | string {
    if (usernameExpression.test(value)) {
        return true
    }
    return 'Must be a valid email address (eg. example@gmail.com).'
}

export function passwordValidation(value: string): boolean | string {
    if (passwordExpression.test(value)) {
        return true
    }
    return 'Must contain 8 - 20 characters, one digit, one lower, on upper and one special(@.#$!%*?&).'
}

export function confirmPasswordValidation(value: string, confirmValue: string): boolean | string {
    const result = passwordValidation(value)
    if (typeof result === 'string') {
        return result
    }
    if (value === confirmValue) {
        return true
    }
    return 'Passwords don\'t match'
}