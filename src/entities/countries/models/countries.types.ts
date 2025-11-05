export interface Country {
  flags: Flags;
  cca2: string;
  cca3: string;
  idd: Idd;
}

export interface Flags {
  png: string;
  svg: string;
  alt: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}
