import {db} from "../db/index.js";
import {usersTable} from "../db/schema/users.js";
import { eq } from "drizzle-orm";

const findUserByEmail = async (email) => {
    return await db
        .select({
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            email: usersTable.email,
            password: usersTable.password,
            salt: usersTable.salt
        })
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);
};

const createUser = async ({
    firstName,
    lastName,
    email,
    password,
    salt
}) => {
    const result = await db
        .insert(usersTable)
        .values({
            firstName,
            lastName,
            email,
            password,
            salt
        })
        .returning({
            id: usersTable.id,
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            email: usersTable.email,
            salt: usersTable.salt
        });

    return result[0];
};

export {
    findUserByEmail,
    createUser
};