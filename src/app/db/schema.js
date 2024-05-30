// run command npm run db:push to create table in vercel
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";

//create a pgtable that maps to your table in the databsae
export const gradeTable = pgTable("grades", {
  id: integer("id").primaryKey(),
  grade: text("grade", { length: 10 }).notNull(),
});

//creating a another table for students
export const studentsTable = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name", { length: 30 }).notNull(),
  grade: text("grade", { length: 10 }).notNull(),
  address: text("address", { length: 50 }),
  contact: text("contact", { length: 10 }),
});

//creating table to store the attendance of the students
export const attendanceTable = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("studentId").notNull(),
  present: boolean("present").notNull().default(false),
  days: integer("days").notNull(), //22
  date: text("date", { length: 10 }), // 05/2024
});
