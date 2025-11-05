"use server";

import { Country } from "../models/countries.types";

export async function getCountries(): Promise<Country[]> {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,cca2,cca3,idd",
      { next: { revalidate: 120, tags: ["countries"] } }
    );
    return res.json();
  } catch {
    return [];
  }
}
