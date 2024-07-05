import { createClient } from "@supabase/supabase-js";
import { nanoid } from "nanoid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { originalUrl } = req.body;
    const { data, error } = await supabase
      .from("urls")
      .insert([{ id: nanoid(8), original_url: originalUrl }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    } else {
      console.log(data);
      const shortUrl = `${req.headers.host}/${data.id}`;
      return res.status(201).json({ shortUrl });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
