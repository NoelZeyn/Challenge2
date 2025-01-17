/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import { checkAdminRole } from "@/middleware/roleMiddleware";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body;

  try {
    const isAdmin = await checkAdminRole(userId);

    if (!isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    res.status(200).json({ success: true, message: "Welcome, Admin!" });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
