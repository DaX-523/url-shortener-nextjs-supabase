import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const id = pathname.slice(1);

  const { data, error } = await supabase
    .from("urls")
    .select("original_url")
    .eq("id", id)
    .single();

  if (error || !data) {
    return NextResponse.next();
  }

  return NextResponse.redirect(data.original_url);
}

export const config = {
  matcher: "/:path*",
};
