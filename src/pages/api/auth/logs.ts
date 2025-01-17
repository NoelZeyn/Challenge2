/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Query logs dari tabel logs
      const { data: logs, error } = await supabase
        .from("logs")
        .select("id, admin_id, action, target, timestamp")
        .order("timestamp", { ascending: false });

      if (error) {
        throw error;
      }

      // Kembalikan hasil log
      res.status(200).json({
        success: true,
        logs,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  } else if (req.method === "POST") {
    const { admin_id, action, target } = req.body;

    if (!admin_id || !action) {
      return res.status(400).json({
        success: false,
        message: "Admin ID and action are required.",
      });
    }

    try {
      // Insert log ke tabel logs
      const { error } = await supabase.from("logs").insert([
        {
          admin_id,
          action,
          target: target || null, // Target opsional
        },
      ]);

      if (error) {
        throw error;
      }

      res.status(201).json({
        success: true,
        message: "Log created successfully.",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed.`,
    });
  }
}
