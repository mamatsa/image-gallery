import fetchImages from "@/lib/fetchImages";
import type { PopularImagesResult } from "@/models/Images";
import Image from "next/image";

export default async function Home() {
  const url =
    "https://api.unsplash.com/photos/?per_page=20&order_by=popularity";
  const images: PopularImagesResult | undefined = await fetchImages(url);

  if (!images) return <h2>სურათები ვერ მოიძებნა</h2>;

  return (
    <section className="grid-cols-gallery my-3 grid gap-2 px-2">
      {images.map((image) => (
        <div
          className="relative h-64 overflow-hidden rounded-xl"
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
  );
}
