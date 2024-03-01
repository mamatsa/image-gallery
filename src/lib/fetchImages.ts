import type { PopularImagesResult } from "@/models/Images";
import { PopularImagesResultSchema } from "@/models/Images";

export default async function fetchImages(
  url: string,
): Promise<PopularImagesResult | undefined> {
  try {
    const res = await fetch(`${url}&client_id=${process.env.UNSPLASH_API_KEY}`);

    if (!res.ok) throw new Error("Error while fetching images!");

    const result: PopularImagesResult = await res.json();

    // Parse data with Zod schema
    const parsedData = PopularImagesResultSchema.parse(result);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
