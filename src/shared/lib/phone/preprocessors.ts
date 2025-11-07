import { MaskitoPreprocessor } from "@maskito/core";

export function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
  const trimPrefix = (value: string): string =>
    value.replace(/^\+?7?\s?8?\s?/g, "");

  const countDigits = (value: string): number =>
    value.replace(/\D/g, "").length;

  return ({ elementState, data }) => {
    const { value, selection } = elementState;

    return {
      elementState: {
        selection,
        value: countDigits(value) > 11 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 11 ? trimPrefix(data) : data,
    };
  };
}
