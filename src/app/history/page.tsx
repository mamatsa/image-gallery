import HistoryItems from "./component/HistoryItems";
import { fetchSearchImages } from "@/lib";
import type { Photo } from "@/models/Images";
import { Gallery, LoadMore } from "../components";

export default async function History({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  // Fetch images based on search param
  let images: Photo[] | undefined;
  if (query) {
    const res = await fetchSearchImages(query);
    images = res?.results;
  }

  return (
    <>
      <HistoryItems />

      <Gallery images={images} />

      {query && images && images.length > 0 && <LoadMore query={query} />}
    </>
  );
}
