import {
  fetchImageStatistics,
  fetchPopularImages,
  fetchSearchImages,
} from "@/lib";
import type { Photo } from "@/models/Images";
import type { Statistics } from "@/models/Statistics";
import { Gallery, Search, LoadMore } from "./components";

type Props = {
  searchParams?: {
    query?: string;
    openId?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const openId = searchParams?.openId || "";

  // Fetch popular images unless search word is provided
  let images: Photo[] | undefined;
  if (!query) {
    images = await fetchPopularImages();
  } else {
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
      <Search />

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

      {(!images || !images.length) && (
        <div className="mt-48 flex w-full justify-center">
          <h2 className="text-red-500">ფოტოები ვერ მოიძებნა</h2>
        </div>
      )}
    </>
  );
}
