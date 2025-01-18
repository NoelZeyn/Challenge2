/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Pagination and filtering logic for GET requests
      const { page = 1, limit = 10, admin_id } = req.query;
      const offset = (Number(page) - 1) * Number(limit);

      let query = supabase
        .from("logs")
        .select("id, admin_id, action, target, timestamp", { count: "exact" })
        .range(offset, offset + Number(limit) - 1);

      if (admin_id) {
        query = query.eq("admin_id", admin_id);
      }

      const { data, error, count } = await query;

      if (error) throw new Error(error.message);

      return res.status(200).json({
        success: true,
        data,
        count,
        page: Number(page),
        totalPages: Math.ceil((count || 0) / Number(limit)),
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  }

  if (req.method === "POST") {
    try {
      const { admin_id, action, target } = req.body;

      if (!admin_id || !action) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields: admin_id or action.",
        });
      }

      const { data, error } = await supabase
      .from("logs")
      .insert({
        admin_id,
        action,
        target,
        timestamp: new Date().toISOString() // Menggunakan waktu saat ini dalam format ISO
      });    

      if (error) throw new Error(error.message);

      return res.status(201).json({
        success: true,
        message: "Log entry created successfully.",
        data,
      });
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
