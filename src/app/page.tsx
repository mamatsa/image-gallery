import { fetchPopularImages, fetchSearchImages } from "@/lib";
import type { Photo } from "@/models/Images";
import { Gallery, Search, LoadMore } from "./components";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  let images: Photo[] | undefined;
  // Fetch popular images unless search word is provided
  if (!query) {
    images = await fetchPopularImages();
  } else {
    const res = await fetchSearchImages(query);
    images = res?.results;
  }

  return (
    <>
      <Search />

      <Gallery images={images} />

      {query && images && images.length > 0 && <LoadMore query={query} />}

      {(!images || !images.length) && (
        <div className="mt-48 flex w-full justify-center">
          <h2 className="text-red-500">ფოტოები ვერ მოიძებნა</h2>
        </div>
      )}
    </>
  );
}
