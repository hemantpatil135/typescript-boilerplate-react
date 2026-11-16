export interface User {
  id: number;
  name: string;
  email: string;
}

export type NewUser = Omit<User, "id">;

export interface UserState {
  users: User[];
  isEdit: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
