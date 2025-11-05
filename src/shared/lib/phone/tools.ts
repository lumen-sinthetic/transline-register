export function unmask(numbers: string) {
  return numbers.replaceAll(/[()\-\s]/g, "");
}
