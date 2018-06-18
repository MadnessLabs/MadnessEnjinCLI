export default function (string) {
  return string.replace(/[^A-Za-z0-9-_@]/g, '');
};