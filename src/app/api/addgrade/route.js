//THIS ROUTE IS INSERTING DATA WITHOUT USING THE ORM
//this ROUTE IS USED TO INSERT DATA INTO THE TABLE USING PARAMS RIGHT NOW
//see the grade/route.js file to insert data using ORM
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("userid");
  const grade = searchParams.get("grade");

  try {
    if (!id || !grade) throw new Error("id and grade not provided");
    await sql`INSERT INTO grades (id, grade) VALUES (${id}, ${grade});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const grades = await sql`SELECT * FROM grades;`;
  return NextResponse.json(grades.rows);
}
