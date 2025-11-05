"use client";

import { createContext, ReactNode, useContext } from "react";
import { Country } from "../models/countries.types";

const CountriesContext = createContext<Country[]>([]);

export function useCountries() {
  return useContext(CountriesContext);
}

interface CountriesProviderProps {
  children: ReactNode;
  countries: Country[];
}

function CountriesProvider({ children, countries }: CountriesProviderProps) {
  return (
    <CountriesContext.Provider value={countries.slice(0, 50)}>
      {children}
    </CountriesContext.Provider>
  );
}

export default CountriesProvider;
