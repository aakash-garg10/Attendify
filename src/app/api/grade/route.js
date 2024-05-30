import { db } from "@/app/db/db";
import { gradeTable } from "@/app/db/schema";

export const runtime = "edge"; // specify the runtime to be edge

//here we are getting the grade list from the database, Maybe we have to insert data using drizzle studio only for the grades bcz not shown in video
export async function GET(request) {
  const grades = await db.select().from(gradeTable);
  return new Response(JSON.stringify({ grades }));
}
