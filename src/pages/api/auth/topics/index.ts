/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { data, error } = await supabase
                .from("topics")
                .select("id, title, description, created_at, created_by");

            if (error) throw error;

            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else if (req.method === "POST") {
        const { title, description, userId } = req.body;

        try {
            const { data, error } = await supabase
                .from("topics")
                .insert([{ title, description, created_by: userId }])
                .select();

            if (error) throw error;

            res.status(201).json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
    }
}
