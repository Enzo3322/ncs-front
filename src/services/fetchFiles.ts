import { File } from "@/components/structures/FilesList";

export const fetchFiles = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/uploads`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error("Error fetching files");
    }

    return res.json() as Promise<{ files: File[]; count: number }>;
  } catch (e) {
    throw new Error("Error fetching files");
  }
};
