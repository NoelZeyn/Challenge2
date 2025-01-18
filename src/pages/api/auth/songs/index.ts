/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("songs").select("*");

      if (error) throw new Error(error.message);

      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, artist, album, genre, url, url_yt } = req.body;

      // Validasi input
      if (!title || !artist || !album || !genre || !url || url_yt) {
        return res.status(400).json({
          success: false,
          message: "All fields (title, artist, album, genre, url) are required.",
        });
      }

      const { data, error } = await supabase.from("songs").insert([{ title, artist, album, genre, url, url_yt }]);

      if (error) throw new Error(error.message);

      return res.status(201).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed.`,
  });
}
