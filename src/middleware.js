import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

function getValidUrl(url) {
  try {
    if (url.includes("http://") || url.includes("https://")) {
      return url;
    } else {
      return "https://" + url;
    }
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    let pathname = req.nextUrl.pathname;
    let parts = pathname.split("/");
    let id = parts[parts.length - 1];
    try {
      const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("id", id)
        .single();
      console.log(data);
      if (error) {
        return NextResponse.error(new Error(error.message));
      } else {
        if (data) {
          return NextResponse.redirect(getValidUrl(data.original_url));
        } else {
          return NextResponse.error(new Error("URL not found"));
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
