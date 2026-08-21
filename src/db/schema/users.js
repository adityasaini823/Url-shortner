import { uuid, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),

  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),

  email: varchar().notNull().unique().length(255),

  password: text().notNull(),
  salt: text().notNull(),
  
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().notNull().defaultNow()
});
