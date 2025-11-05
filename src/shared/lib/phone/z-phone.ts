import { getCountryCallingCode } from "libphonenumber-js";
import { z } from "zod";
import { defineCountry, unmask } from "./tools";

export interface ZPhoneNumberOptions {
  invalidMessage?: string;

  requiredMessage?: string;

  required?: boolean;

  /**
   * @param shouldRefine - should refine the schema
   * @default true
   */
  shouldRefine?: boolean;
  /**
   * @param exceptions - array of regex or strings for exceptions in schema refinement
   */
  exceptions?: Array<RegExp | string>;
}

type PhoneNumberString =
  | z.ZodString
  | z.ZodEffects<z.ZodString, string, string>;

interface ZPhoneNumber {
  /**
   * @description zod schema for phone number validation
   * @returns zod schema
   */
  (): PhoneNumberString;

  /**
   * @description zod schema for phone number validation
   * @param message - accepts string for error message
   * @returns zod schema
   */
  (message: string): PhoneNumberString;

  /**
   * @description zod schema for phone number validation
   * @param options - accepts ZPhoneNumberOptions object
   * @returns zod schema
   */
  (options: ZPhoneNumberOptions): PhoneNumberString;
}

export const zPhoneNumber: ZPhoneNumber = (
  options?: ZPhoneNumberOptions | string
) => {
  const {
    required = true,
    exceptions = [],
    invalidMessage = "Invalid phone number",
    requiredMessage = "Phone number required",
  }: ZPhoneNumberOptions = typeof options === "string"
    ? { requiredMessage: options, invalidMessage: options }
    : options || {};

  const baseSchema = z.string({ required_error: requiredMessage });

  const schema = baseSchema.superRefine((value, ctx) => {
    if (!required && !value) return true;

    if (!value) {
      return ctx.addIssue({ code: "custom", message: invalidMessage });
    }

    let isExcept = false;

    exceptions.forEach(exp => {
      const regex = new RegExp(exp);
      const result = regex.test(value);
      if (!isExcept) isExcept = result;
    });

    if (isExcept) return true;

    if (!/^\+?\d{11,15}$/.test(value)) {
      return ctx.addIssue({ code: "custom", message: invalidMessage });
    }

    const country = defineCountry(unmask(value));

    if (!country) {
      return ctx.addIssue({ code: "custom", message: invalidMessage });
    }

    const callingCode = getCountryCallingCode(country);

    return !/^(\d)\1+$/.test(value.replace(callingCode, "").replace(/^\+/, ""));
  });

  return schema;
};
