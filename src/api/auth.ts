import { User } from "../utils/models";

export const checkWhoLoggedIn = async (email: string, password: string): Promise<User> => {
    const res = await fetch("/mockJson/users.json");
    if (!res.ok) {
        throw new Error("Failed to load users data");
    }

    const usersData = await res.json();
    const matchedUser = usersData.find(
        (user: User) => user.email === email && user.password === password
    );

    if (!matchedUser) {
        throw new Error("Invalid email or password");
    }

    return matchedUser;
};
