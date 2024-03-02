import { z } from "zod";

const ImageSchema = z.object({
  id: z.string(),
  width: z.number(),
  height: z.number(),
  blur_hash: z.string(),
  alt_description: z.string(),
  urls: z.object({
    regular: z.string(),
  }),
});

export const PopularImagesResultSchema = z.array(ImageSchema);

export const SearchImagesResultSchema = z.object({
  total: z.number(),
  total_pages: z.number(),
  results: z.array(ImageSchema),
});

export type Photo = z.infer<typeof ImageSchema>;

export type PopularImagesResult = z.infer<typeof PopularImagesResultSchema>;

export type SearchImagesResult = z.infer<typeof SearchImagesResultSchema>;
