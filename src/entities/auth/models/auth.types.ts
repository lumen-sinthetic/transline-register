export type UserRole = "customer" | "carrier";

export interface User {
  phone_number: string;
  role: UserRole;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  password: string;
  iin?: number;
  bin?: number;
}

export type RegisterData = Partial<User>;
