import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/auth";

export async function GET(/* request: Request */) {
  // const { searchParams } = new URL(request.url);
  // const offset = parseInt(searchParams.get("offset") || "0", 10);
  // const limit = parseInt(searchParams.get("limit") || "6", 10);

  const { data, error } = await supabase
  .from("resumes")
  .select("*")
  .order("id", { ascending: true })

if (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
return NextResponse.json(data);
  // if (limit <= 0) {
  // }

  // const { data, error } = await supabase
  //   .from("resumes")
  //   .select("*")
  //   .order("id", { ascending: true })
  //   // .range(offset, offset + limit - 1);

  // if (error) {
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
  // return NextResponse.json(data);
}