import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  url_yt: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      try {
        const { data, error } = await supabase.from("songs").select("*");

        if (error) throw new Error(error.message);
        if (!data) return res.status(404).json({ success: false, message: "No songs found" });

        return res.status(200).json({ success: true, data });
      } catch (error) {
        return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    case "POST": {
      try {
        const { title, artist, album, url, url_yt } = req.body as Song;

        if (!title || !artist || !album || !url || !url_yt) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { data, error } = await supabase
          .from("songs")
          .insert([{ title, artist, album, url, url_yt }]);

        if (error) throw new Error(error.message);
        if (!data) return res.status(500).json({ success: false, message: "Failed to insert song" });

        return res.status(201).json({ success: true, data });
      } catch (error) {
        return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    default: {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
  }
}
