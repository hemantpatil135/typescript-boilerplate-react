import axios from "axios";
import { NewUser, User } from "../models/userModels";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ?? "http://localhost:8080",
});

export const fetchUsers = async (): Promise<User[]> => (await api.get<User[]>("/users")).data;

export const createUser = async (user: NewUser): Promise<User> =>
  (await api.post<User>("/users", user)).data;

export const updateUser = async (user: User): Promise<User> =>
  (await api.put<User>(`/users/${user.id}`, user)).data;

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/users/${userId}`);
};
