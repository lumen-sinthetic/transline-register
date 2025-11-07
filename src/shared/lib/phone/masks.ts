import { maskitoChangeEventPlugin, MaskitoOptions } from "@maskito/core";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js";
import { createCompletePhoneInsertionPreprocessor } from "./preprocessors";
import {
  maskitoAddOnFocusPlugin,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from "@maskito/kit";

export const emptyMask: MaskitoOptions = {
  mask: [
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
};

const countryIsoCode: CountryCode = "KZ";
const code = getCountryCallingCode(countryIsoCode);
const prefix = `+${code} `;

export const phoneMask: MaskitoOptions = {
  mask: [
    "+",
    code,
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
  preprocessors: [createCompletePhoneInsertionPreprocessor()],
  postprocessors: [maskitoPrefixPostprocessorGenerator(prefix)],
  plugins: [
    maskitoAddOnFocusPlugin(prefix),
    maskitoRemoveOnBlurPlugin(prefix),
    maskitoChangeEventPlugin(),
  ],
};
