/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // Get the topic ID from the route.

    if (req.method === "GET") {
        try {
            const { data, error } = await supabase
                .from("topics")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) throw new Error("Topic not found.");

            res.status(200).json({ success: true, data });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ success: false, message: `Method ${req.method} not allowed.` });
    }
}
