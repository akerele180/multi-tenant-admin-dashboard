import { User } from "../utils/models";

export const getTenantUsers = async (tenantId: number): Promise<User[]> => {
    const res = await fetch("/mockJson/users.json");
    if (!res.ok) {
        throw new Error("Failed to load users data");
    }

    const usersData = await res.json();
    const tenantUsers = usersData.filter((user: User) => user.tenantId === tenantId);

    if (!tenantUsers) {
        throw new Error("Invalid Tenant");
    }

    return tenantUsers;
};
