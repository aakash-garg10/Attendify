//THIS ROUTE IS USED TO CREATE THE TABLE IN THE DATABASE but we dont have to use this as we can create table using the commands
//see the lib/schema.js file to create table using ORM 
//This method is without using ORM (Drizzle)
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request) {
  try {
    const result =
      await sql`CREATE TABLE grades ( id int, grade varchar(255) );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}