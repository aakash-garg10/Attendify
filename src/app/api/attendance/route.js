import { db } from "@/app/db/db";
import { attendanceTable, studentsTable } from "@/app/db/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("date");
    // console.log(grade, month);

  const result = await db
    .select({
      name: studentsTable.name,
      present: attendanceTable.present,
      day: attendanceTable.days,
      date: attendanceTable.date,
      grade: studentsTable.grade,
      studentId: studentsTable.id,
      attendanceId: attendanceTable.id,
    })
    .from(studentsTable)
    .leftJoin(attendanceTable, eq(studentsTable.id, attendanceTable.studentId))
    .where(
      and(
        eq(studentsTable.grade, grade),
        or(eq(attendanceTable.date, month), isNull(attendanceTable.date))
      )
    );
  //   console.log('Query Result:', result);

  return NextResponse.json(result);
}

export async function POST(req, res) {
  const data = await req.json();
  //   console.log(data);
  const result = await db.insert(attendanceTable).values({
    studentId: data.studentId,
    present: data.present,
    days: data.days,
    date: data.date,
  });
  return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const days = searchParams.get("days");

  const result = await db
    .delete(attendanceTable)
    .where(
      and(
        eq(attendanceTable.studentId, studentId),
        eq(attendanceTable.date, date),
        eq(attendanceTable.days, days)
      )
    );
  return NextResponse.json(result);
}
