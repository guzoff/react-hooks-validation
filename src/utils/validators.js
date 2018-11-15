export function getValidationErrors(value, validators) {
  return validators.map(validator => validator(value))
    .filter(result => result && typeof result === 'string');
}

export function containsNumber(value) {
  return value.match(/\d/) ? true : 'This field must contain at least one number.';
}

export function doesNotContain(matchString) {
  matchString = matchString.trim();
  return value => (!matchString || !value.includes(matchString)) ? true : `This field cannot contain the value: ${matchString}`
}

export function requiredInput(value) {
  return value.trim() ? true : 'This field is required.';
}

export function requiredLength(minLength) {
  return value => value.trim().length >= minLength ? true : `This field must meet the minimum number of characters: ${minLength}`;
}
