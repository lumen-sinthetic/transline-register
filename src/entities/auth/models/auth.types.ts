export type UserRole = "customer" | "carrier";

export interface User {
  phone_number: string;
  role: UserRole;
  first_name: string;
  patronymic?: string;
  last_name: string;
  email: string;
  password: string;
  iin?: string;
  bin?: string;
}

export type RegisterData = Partial<User>;
