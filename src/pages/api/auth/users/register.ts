/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, username } = req.body;

    // Validasi input
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    try {
      // Periksa apakah email sudah digunakan
      const { data: existingUser, error: existingUserError } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use.",
        });
      }

      // Hash password sebelum menyimpannya
      const hashedPassword = await bcrypt.hash(password, 10);

      // Masukkan pengguna ke tabel `users`
      const { error: userError } = await supabase
        .from("users")
        .insert([
          {
            username,
            email,
            password_hash: hashedPassword,
            role: "general", // Peran default adalah 'general'
          },
        ]);

      if (userError) {
        throw userError;
      }

      // Registrasi berhasil
      res.status(201).json({
        success: true,
        message: "User registered successfully.",
      });
    } catch (error: any) {
      // Tangani error server
      res.status(500).json({
        success: false,
        message: error.message || "An unexpected error occurred.",
      });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed.`,
    });
  }
}
