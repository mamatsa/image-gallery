import type { SearchImagesResult, Photo } from "@/models/Images";
import { SearchImagesResultSchema } from "@/models/Images";

export default async function fetchSearchImages(
  query: string,
): Promise<Photo[] | undefined> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=20&client_id=${process.env.UNSPLASH_API_KEY}`,
    );

    if (!res.ok) throw new Error("Error while fetching images!");

    const result: SearchImagesResult = await res.json();

    // Parse data with Zod schema
    const parsedData = SearchImagesResultSchema.parse(result);

    return parsedData.results;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
