/**
 * Convert a string to camel casing
 * @param string The string to be converted to camel case
 */
export function camelize(string: string) {
  return string
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}
