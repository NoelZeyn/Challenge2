/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase.from("users").select("id, username, email");

      if (error) throw new Error(error.message);

      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed.`,
  });
  
}
