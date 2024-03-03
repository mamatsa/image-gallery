import HistoryItems from "./component/HistoryItems";
import { fetchSearchImages, fetchImageStatistics } from "@/lib";
import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import { Gallery, LoadMore } from "../components";

type Props = {
  searchParams?: {
    query?: string;
  };
};

export default async function History({ searchParams }: Props) {
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
