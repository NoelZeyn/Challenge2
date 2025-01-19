/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { topicId } = req.query;

    try {
      const { data, error } = await supabase
        .from("comments")
        .select(
          "id, topic_id, user_id, content, created_at, users(username, role)" // Include users data
        )
        .eq("topic_id", topicId);

      if (error) throw error;

      res.status(200).json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else if (req.method === "POST") {
    const { topicId, userId, content } = req.body;

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ topic_id: topicId, user_id: userId, content }])
        .select("id, topic_id, user_id, content, created_at, users(username, role)"); // Include users data

      if (error) throw error;

      res.status(201).json({ success: true, data: data[0] });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
  }
}
