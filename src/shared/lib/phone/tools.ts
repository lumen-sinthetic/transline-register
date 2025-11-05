import parsePhoneNumberFromString, {
  CountryCode,
  parsePhoneNumberWithError,
} from "libphonenumber-js";

export function unmask(numbers: string) {
  return numbers.replaceAll(/[()\-\s]/g, "");
}

export function interMask(phone: string): string {
  try {
    const number = parsePhoneNumberWithError(phone);

    if (!number.country) return phone;

    const phoneNumber = parsePhoneNumberFromString(phone, number.country);

    if (!phoneNumber) return phone;

    return phoneNumber.formatInternational();
  } catch {
    return phone;
  }
}

export function defineCountry(value?: string): CountryCode | undefined {
  if (!value) return undefined;

  const parsedValue = interMask(value);

  try {
    const phoneNumber = parsePhoneNumberWithError(parsedValue);

    if (phoneNumber.country) {
      return phoneNumber.country;
    } else {
      return undefined;
    }
  } catch {
    return undefined;
  }
}
