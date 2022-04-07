import { Role } from "./role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string;
    role: Role;
}