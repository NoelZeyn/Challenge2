/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { userId } = req.body;

    // Log untuk memeriksa userId
    console.log("Received userId:", userId);

    if (!userId) {
      console.error("Missing userId in request");
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    try {
      // Log query ke database
      // console.log("Querying database for userId:", userId);

      const { data: userData, error } = await supabase
        .from("users")
        .select("username,role")
        .eq("id", userId)
        .single();

      // Log hasil query
      // console.log("Query result:", userData, error);

      if (error || !userData) {
        console.error("User not found or query error:", error);
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }

      res.status(200).json({
        success: true,
        role: userData.role,
      });
      // console.log(res)
    } catch (error: any) {
      // Log error server
      console.error("Unexpected server error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  } else {
    // Log untuk method yang tidak diperbolehkan
    console.error(`Method ${req.method} not allowed`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed.`,
    });
  }
}
