import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { blob } from 'drizzle-orm/sqlite-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  blob: blob('blob'),
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type


const db = drizzle(...);

const result: User[] = await db.select().from(users);

export async function insertUser(user: NewUser): Promise<User[]> {
  return db.insert(users).values(user).returning();
}