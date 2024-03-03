import HistoryItems from "./component/HistoryItems";
import { fetchSearchImages, fetchImageStatistics } from "@/lib";
import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import { Gallery, LoadMore } from "../components";

type Props = {
  searchParams?: {
    query?: string;
    openId?: string;
  };
};

export default async function History({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const openId = searchParams?.openId || "";

  // Fetch images based on search param
  let images: Photo[] | undefined;
  if (query) {
    const res = await fetchSearchImages(query);
    images = res?.results;
  }

  // If image is open find it in images array and fetch it's statistics
  let openImageStats: Statistics | undefined;
  let openImage: Photo | undefined;
  if (openId) {
    openImage = images?.find((image) => image.id === openId);
    openImageStats = await fetchImageStatistics(openId);
  }

  return (
    <>
      <HistoryItems />

      <Gallery
        images={images}
        openImage={openImage}
        statistics={openImageStats}
      />

      {query && images && images.length > 0 && (
        <LoadMore
          query={query}
          openImageId={openId}
          statistics={openImageStats}
        />
      )}
    </>
  );
}
