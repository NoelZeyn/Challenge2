import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

type Log = {
  id: string;
  admin_id: string;
  action: string;
  target: string;
  timestamp: string; // Tipe untuk 'timestamptz' dari Supabase
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ success: false, message: "Invalid or missing ID" });
  }

  switch (req.method) {
    case "PUT": {
      try {
        const { admin_id, action, target, timestamp } = req.body as Partial<Log>;

        if (!admin_id || !action || !target || !timestamp ) {
          return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const { data, error } = await supabase
          .from("logs")
          .update({admin_id, action, target, timestamp })
          .eq("id", id)
          .select(); // Menambahkan `.select()` untuk mendapatkan hasil yang terdefinisi

        if (error) throw new Error(error.message);
        if (!data || data.length === 0) {
          return res.status(404).json({ success: false, message: "Song not found" });
        }

        return res.status(200).json({ success: true, data });
      } catch (error) {
        return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    case "DELETE": {
      try {
        const { data, error } = await supabase
          .from("logs")
          .delete()
          .eq("id", id)
          .select(); // Menambahkan `.select()` untuk mendapatkan hasil yang terdefinisi

        if (error) throw new Error(error.message);
        if (!data || data.length === 0) {
          return res.status(404).json({ success: false, message: "Song not found" });
        }

        return res.status(200).json({ success: true, message: "Song deleted successfully" });
      } catch (error) {
        return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Unknown error" });
      }
    }

    default: {
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
    }
  }
}
