/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    try {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, username, email, password_hash, role")
        .eq("email", email)
        .single();

      if (userError || !userData) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Verifikasi password menggunakan bcrypt
      const passwordMatch = await bcrypt.compare(password, userData.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });
      }

      // Login berhasil
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email,
          role: userData.role,
        },
      });
    } catch (error: any) {
      // Tangani error server
      return res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["POST"]);
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed.`,
  });
}
