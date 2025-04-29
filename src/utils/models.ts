import { ReactElement } from "react";

export type Roles = "Admin" | "Manager" | "Viewer";
export type UserStatus = "Active" | "Inactive";
export type TenantStatus = "Subscribed" | "Unsubscribed";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Roles;
    status: UserStatus;
    tenantId: number;
}

export interface Tenant {
    id: number;
    name: string;
    theme: string;
    status: TenantStatus;
    users: User[];
    logo: string;
}