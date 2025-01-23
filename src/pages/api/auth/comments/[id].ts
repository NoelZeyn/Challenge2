/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ success: false, message: "Comment ID is required" });
  }

  if (req.method === "GET") {
    try {
      const { data: comment, error } = await supabase
        .from("comments")
        .select("likes")
        .eq("id", id)
        .single();

      if (error || !comment) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }

      res.status(200).json({ success: true, likes: comment.likes || 0 });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
} else if (req.method === "POST") {
    // Handle POST request to increment likes
    try {
      const { data: currentData, error: fetchError } = await supabase
        .from("comments")
        .select("likes")
        .eq("id", id)
        .single();

      if (fetchError) {
        return res.status(404).json({ success: false, message: "Comment not found" });
      }

      const currentLikes = currentData?.likes || 0;

      const { data, error } = await supabase
        .from("comments")
        .update({ likes: currentLikes + 1 })
        .eq("id", id)
        .select();

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
  }
}
