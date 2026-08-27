import { uuid, pgTable,varchar,timestamp } from "drizzle-orm/pg-core";
import {usersTable} from "./users.js";

export const urlTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => usersTable.id),
  shortCode: varchar("short_code", { length: 155 }).notNull().unique(),
  targetURL: varchar("target_url").notNull(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().$onUpdate(()=>new Date()),
});