"use server";

import type { SearchImagesResult, Photo } from "@/models/Images";
import { SearchImagesResultSchema } from "@/models/Images";

export default async function fetchSearchImages(
  query: string,
  page: number = 1,
): Promise<SearchImagesResult | undefined> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=24&client_id=${process.env.UNSPLASH_API_KEY}`,
    );

    if (!res.ok) throw new Error("Error while fetching images!");

    const result: SearchImagesResult = await res.json();

    // Parse data with Zod schema
    const parsedData = SearchImagesResultSchema.parse(result);

    return parsedData;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}
