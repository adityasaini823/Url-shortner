import db from "../db/index.js";
import usersTable from "../db/schema/users.js";
import { eq } from "drizzle-orm";

const findUserByEmail = async (email) => {
    return await db
        .select({
            id: usersTable.id,
            firstName: usersTable.first_name,
            lastName: usersTable.last_name,
            email: usersTable.email,
            password: usersTable.password,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);
};

const createUser = async ({
    firstName,
    lastName,
    email,
    password
}) => {
    const result = await db
        .insert(usersTable)
        .values({
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })
        .returning({
            id: usersTable.id,
            firstName: usersTable.first_name,
            lastName: usersTable.last_name,
            email: usersTable.email
        });

    return result[0];
};

export {
    findUserByEmail,
    createUser
};