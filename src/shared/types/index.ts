import { Dispatch, SetStateAction } from "react";

export type StateFn<T> = Dispatch<SetStateAction<T>>;

export interface SchemaInGraph<
  T extends Array<{ "@type": unknown } | undefined>,
> {
  "@context": "https://schema.org";
  "@graph": T;
}
