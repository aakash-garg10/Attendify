//HERE WE ARE ADDING THE STUDENTS USING THE ORM
import { db } from "@/app/db/db";
import { studentsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  const result = await db.insert(studentsTable).values({
    name: body?.name,
    grade: body?.grade,
    address: body?.address,
    contact: body?.contact,
  });

  return NextResponse.json(result);
}

export async function GET(request) {
  const result = await db.select().from(studentsTable);
  return NextResponse.json(result);
}

export async function DELETE(req) {
    const searchParams=req.nextUrl.searchParams
    const id=searchParams.get("id")

    const result = await db.delete(studentsTable).where(eq(studentsTable.id, id))
    return NextResponse.json(result)
}
