import { MaskitoOptions } from "@maskito/core";

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
  // plugins: [maskitoAddOnFocusPlugin(prefix), maskitoRemoveOnBlurPlugin(prefix)],
};
