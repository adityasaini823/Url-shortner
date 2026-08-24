import { uuid, pgTable,varchar,timestamp } from "drizzle-orm/pg-core";
import {usersTable} from "./users.js";
export const linksTable = pgTable("links", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  link: varchar().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});