import { supabase } from "@/lib/supabase";

export const checkAdminRole = async (userId: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (error || !data) {
    throw new Error("Unable to fetch role");
  }

  return data.role === "admin";
};
