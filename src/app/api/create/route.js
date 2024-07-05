import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function POST(req, res) {
  try {
    const { originalUrl } = await req.json();

    const { data, error } = await supabase
      .from("urls")
      .insert([{ id: nanoid(8), original_url: originalUrl }])
      .select();

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const shortUrl = `https://${req.headers.get("host")}/${data[0].id}`;
    return NextResponse.json({ shortUrl }, { status: 201 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
