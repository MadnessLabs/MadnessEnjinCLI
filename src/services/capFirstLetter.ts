/**
 * Capitalizes the first letter of a string
 * @param string The string to cap first letter of
 */
export function capFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
