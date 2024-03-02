import { fetchPopularImages, fetchSearchImages } from "@/lib";
import type { Photo } from "@/models/Images";
import Image from "next/image";
import Search from "./components/Search";
import LoadMore from "./components/LoadMore";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  let images: Photo[] | undefined;
  if (!query) {
    images = await fetchPopularImages();
  } else {
    images = await fetchSearchImages(query);
  }

  return (
    <>
      <Search />

      <section className="my-3 grid grid-cols-gallery gap-2 px-2">
        {images?.map((image) => (
          <div
            className="relative h-64 overflow-hidden rounded-xl bg-gray-400"
            style={{ backgroundColor: image.color }}
            key={image.id}
          >
            <Image
              src={image.urls.regular}
              alt={image.alt_description}
              fill={true}
              sizes="(min-width: 1380px) 310px, (min-width: 1040px) calc(18.75vw + 55px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
              className="object-cover"
            />
          </div>
        ))}
      </section>

      {query && images && images.length > 0 && <LoadMore query={query} />}

      {(!images || !images.length) && (
        <div className="mt-48 flex w-full justify-center">
          <h2 className="text-red-500">ფოტოები ვერ მოიძებნა</h2>
        </div>
      )}
    </>
  );
}
