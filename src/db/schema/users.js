import { uuid, pgTable, timestamp, varchar,text } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstName: varchar("firstName").notNull(),
  lastName: varchar("lastName").notNull(),

  email: varchar().notNull().unique(),

  password: text().notNull(),
  salt: text().notNull(),
  
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow()
});
