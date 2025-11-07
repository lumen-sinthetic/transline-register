import { z } from "zod";

import { defineCountry, unmask } from "./tools";

export interface ZPhoneNumberOptions {
  invalidMessage?: string;

  requiredMessage?: string;

  /**
   * @param exceptions - array of regex or strings for exceptions in schema refinement
   */
  exceptions?: Array<RegExp | string>;
}

interface ZPhoneNumber {
  /**
   * @description zod schema for phone number validation
   * @returns zod schema
   */
  (): z.ZodString;

  /**
   * @description zod schema for phone number validation
   * @param message - accepts string for error message
   * @returns zod schema
   */
  (message: string): z.ZodString;

  /**
   * @description zod schema for phone number validation
   * @param options - accepts ZPhoneNumberOptions object
   * @returns zod schema
   */
  (options: ZPhoneNumberOptions): z.ZodString;
}

export const zPhoneNumber: ZPhoneNumber = (
  options: ZPhoneNumberOptions | string = {}
) => {
  const {
    exceptions = [],
    invalidMessage = "Invalid phone number",
    requiredMessage = "Phone number required",
  }: ZPhoneNumberOptions = typeof options === "string"
    ? { requiredMessage: options, invalidMessage: options }
    : options;

  return z.string({ error: requiredMessage }).superRefine((value, ctx) => {
    if (typeof value !== "string") return;

    for (let i = 0; i < exceptions.length; i++) {
      const regex = new RegExp(exceptions[i]);
      if (regex.test(value)) return;
    }

    if (!/^\+?\d{11,15}$/.test(value)) {
      return ctx.addIssue({ code: "custom", message: invalidMessage });
    }

    const country = defineCountry(unmask(value));

    if (!country) {
      return ctx.addIssue({ code: "custom", message: invalidMessage });
    }

    // const callingCode = getCountryCallingCode(country);

    // if (!/^(\d)\1+$/.test(value.replace(callingCode, "").replace(/^\+/, ""))) {
    //   return ctx.addIssue({ code: "custom", message: invalidMessage });
    // }
  });
};
